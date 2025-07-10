/**
 * iTunes Search API constants
 * Based on official iTunes Search API documentation
 */

export const ITUNES_MEDIA_TYPES = [
  'movie',
  'podcast',
  'music',
  'musicVideo',
  'audiobook',
  'shortFilm',
  'tvShow',
  'software',
  'ebook',
  'all',
] as const;

export const ITUNES_ENTITIES = [
  'movieArtist',
  'movie',
  'podcastAuthor',
  'podcast',
  'musicArtist',
  'musicTrack',
  'album',
  'musicVideo',
  'mix',
  'song',
  'audiobookAuthor',
  'audiobook',
  'shortFilmArtist',
  'shortFilm',
  'tvEpisode',
  'tvSeason',
  'software',
  'iPadSoftware',
  'macSoftware',
  'ebook',
  'allArtist',
  'allTrack',
] as const;

export const ITUNES_ATTRIBUTES = [
  'actorTerm',
  'genreIndex',
  'artistTerm',
  'shortFilmTerm',
  'producerTerm',
  'ratingTerm',
  'directorTerm',
  'releaseYearTerm',
  'featureFilmTerm',
  'movieArtistTerm',
  'movieTerm',
  'ratingIndex',
  'descriptionTerm',
  'titleTerm',
  'languageTerm',
  'authorTerm',
  'keywordsTerm',
  'mixTerm',
  'composerTerm',
  'albumTerm',
  'songTerm',
  'softwareDeveloper',
  'tvEpisodeTerm',
  'showTerm',
  'tvSeasonTerm',
  'allArtistTerm',
  'allTrackTerm',
] as const;

export const ITUNES_LANGUAGES = ['en_us', 'ja_jp'] as const;

export const ITUNES_VERSIONS = ['1', '2'] as const;

export const ITUNES_EXPLICIT_VALUES = ['Yes', 'No'] as const;

export const ITUNES_DEFAULTS = {
  limit: 50,
  country: 'US',
  lang: 'en_us',
  version: '2',
  explicit: 'Yes',
  media: 'all',
} as const;

export const ITUNES_CONSTRAINTS = {
  minLimit: 1,
  maxLimit: 200,
  apiRateLimit: 20, // calls per minute (approximate)
} as const;
