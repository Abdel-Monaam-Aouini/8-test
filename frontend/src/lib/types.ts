export interface ItunesSearchResult {
  wrapperType?: string;
  trackId?: number;
  artistId?: number;
  collectionId?: number;
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  kind?: string;
  country?: string;
  currency?: string;
  trackPrice?: number;
  collectionPrice?: number;
  artworkUrl100?: string;
  previewUrl?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  trackTimeMillis?: number;
  trackNumber?: number;
  discNumber?: number;
  trackCount?: number;
  discCount?: number;
  isStreamable?: boolean;
  searchTerm?: string;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItunesApiResponse {
  success: boolean;
  data: ItunesSearchResult[];
  count: number;
}

export interface SearchItunesParams {
  term: string;
  media?: string;
  entity?: string;
  attribute?: string;
  limit?: number;
  country?: string;
  lang?: string;
  version?: string;
  explicit?: string;
  callback?: string;
}

export const ITUNES_MEDIA_TYPES = [
  { value: 'all', label: 'All Media' },
  { value: 'movie', label: 'Movies' },
  { value: 'podcast', label: 'Podcasts' },
  { value: 'music', label: 'Music' },
  { value: 'musicVideo', label: 'Music Videos' },
  { value: 'audiobook', label: 'Audiobooks' },
  { value: 'shortFilm', label: 'Short Films' },
  { value: 'tvShow', label: 'TV Shows' },
  { value: 'software', label: 'Software' },
  { value: 'ebook', label: 'E-books' },
] as const;

export const ITUNES_ENTITIES = [
  { value: 'movieArtist', label: 'Movie Artist' },
  { value: 'movie', label: 'Movie' },
  { value: 'podcastAuthor', label: 'Podcast Author' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'musicArtist', label: 'Music Artist' },
  { value: 'musicTrack', label: 'Music Track' },
  { value: 'album', label: 'Album' },
  { value: 'musicVideo', label: 'Music Video' },
  { value: 'mix', label: 'Mix' },
  { value: 'song', label: 'Song' },
  { value: 'audiobookAuthor', label: 'Audiobook Author' },
  { value: 'audiobook', label: 'Audiobook' },
  { value: 'shortFilmArtist', label: 'Short Film Artist' },
  { value: 'shortFilm', label: 'Short Film' },
  { value: 'tvEpisode', label: 'TV Episode' },
  { value: 'tvSeason', label: 'TV Season' },
  { value: 'software', label: 'Software' },
  { value: 'iPadSoftware', label: 'iPad Software' },
  { value: 'macSoftware', label: 'Mac Software' },
  { value: 'ebook', label: 'E-book' },
  { value: 'allArtist', label: 'All Artists' },
  { value: 'allTrack', label: 'All Tracks' },
] as const; 