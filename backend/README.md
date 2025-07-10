# iTunes Search API

## Project Description

This project is a REST API built with Nest.js and PostgreSQL database. It searches the iTunes Search API and stores results in the database with duplicate prevention.

## Requirements

- Node.js (v16 or newer)
- PostgreSQL
- npm
- Docker and Docker Compose (for Docker deployment)

## Installation and Setup

### Method 1: Using Docker Compose (Recommended)

1. Start the application and database using Docker Compose:
```bash
docker-compose up -d
```

2. The application will be available at: `http://localhost:3500`

3. To stop the application:
```bash
docker-compose down
```

4. To stop the application and remove data:
```bash
docker-compose down -v
```

### Method 2: Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a PostgreSQL database named `itunes_search`

3. Copy environment file and update variables:
```bash
cp .env.example .env
```

4. Update environment variables in `.env` file according to your database settings

5. Start the application:
```bash
npm run start:dev
```

## Usage

### Search iTunes and Store Results

```
GET /itunes/search?term=search_term&media=music&entity=song&limit=10
```

#### Available Parameters:

##### Required Parameters:
- **`term`** (required): Search term
  - Example: `term=adele` or `term=taylor+swift`

##### Optional Parameters:

- **`media`** (optional): Media type to search
  - Available values: `movie`, `podcast`, `music`, `musicVideo`, `audiobook`, `shortFilm`, `tvShow`, `software`, `ebook`, `all`
  - Default: `all`

- **`entity`** (optional): Entity type for results
  - Examples: `song`, `album`, `musicArtist`, `movie`, `podcast`, `software`

- **`limit`** (optional): Number of results
  - Range: 1-200
  - Default: 50

- **`country`** (optional): Two-letter country code
  - Examples: `US`, `GB`, `CA`, `AU`, `DE`, `FR`, `JP`
  - Default: `US`

#### Usage Examples:

```bash
# Basic search
curl "http://localhost:3500/itunes/search?term=adele"

# Search music only
curl "http://localhost:3500/itunes/search?term=adele&media=music&entity=song&limit=5"

# Search movies
curl "http://localhost:3500/itunes/search?term=avengers&media=movie&limit=10"

# Search with different limits (no duplicates will be stored)
curl "http://localhost:3500/itunes/search?term=adele&limit=20"
curl "http://localhost:3500/itunes/search?term=adele&limit=50"
```

## Database Structure

Results are stored in the `itunes_search_results` table with the following fields:
- `id`: Unique identifier
- `trackId`: iTunes track ID (indexed)
- `artistId`: Artist ID (indexed)
- `collectionId`: Collection ID (indexed)
- `artistName`: Artist name
- `trackName`: Track name
- `collectionName`: Album name
- `searchTerm`: Search parameters used
- `createdAt`: Creation date
- ... and other iTunes API fields

## Duplicate Prevention

### Why Indexes Are Added

1. **Performance**: Indexes on `trackId`, `artistId`, and `collectionId` make duplicate checking faster
2. **Unique Constraints**: Database-level constraints prevent duplicate entries
3. **Query Optimization**: Faster lookups when searching existing records

### How Duplicates Are Avoided

The application uses PostgreSQL's `ON CONFLICT DO NOTHING` feature:

1. **Database Constraints**: 
   - `@Unique(['trackId'])` - Prevents duplicate tracks
   - `@Unique(['artistId', 'collectionId'])` - Prevents duplicate artist-collection combinations

2. **Insertion Strategy**:
   ```sql
   INSERT INTO itunes_search_results (...) VALUES (...) ON CONFLICT DO NOTHING
   ```

3. **Benefits**:
   - No errors thrown when duplicates are encountered
   - Automatic duplicate filtering at database level
   - Better performance than application-level checking
   - Handles overlapping search results (e.g., limit 20 then limit 50)

### Example Scenario

When you search:
1. `GET /itunes/search?term=adele&limit=20` - Stores 20 results
2. `GET /itunes/search?term=adele&limit=50` - Only stores 30 new results (ignores the first 20)

The database automatically ignores duplicates without throwing errors.

## Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=itunes_search
```

## Docker Commands

```bash
# Start application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Rebuild application
docker-compose up --build
```

## Important Notes

1. **Rate Limits**: iTunes Search API has approximately 20 calls per minute limit
2. **Performance**: Use appropriate `limit` values to reduce response time
3. **Caching**: Results are cached based on search parameters
4. **URL Encoding**: Ensure proper parameter encoding (spaces become `+`)

## References

- [iTunes Search API Documentation](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html)
- [ISO Country Codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
