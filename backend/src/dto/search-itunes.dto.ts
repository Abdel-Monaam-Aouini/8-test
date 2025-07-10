import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ITUNES_MEDIA_TYPES,
  ITUNES_ENTITIES,
  ITUNES_ATTRIBUTES,
  ITUNES_LANGUAGES,
  ITUNES_VERSIONS,
  ITUNES_EXPLICIT_VALUES,
  ITUNES_CONSTRAINTS,
} from '../constants/itunes-search.constants';

export class SearchItunesDto {
  @IsString()
  @IsNotEmpty()
  term: string;

  @IsOptional()
  @IsString()
  @IsIn(ITUNES_MEDIA_TYPES)
  media?: string;

  @IsOptional()
  @IsString()
  @IsIn(ITUNES_ENTITIES)
  entity?: string;

  @IsOptional()
  @IsString()
  @IsIn(ITUNES_ATTRIBUTES)
  attribute?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    const num = parseInt(value?.toString() || '');
    return isNaN(num) ? value : num;
  })
  @Type(() => Number)
  @Min(ITUNES_CONSTRAINTS.minLimit, { message: 'Limit must be at least 1' })
  @Max(ITUNES_CONSTRAINTS.maxLimit, { message: 'Limit must not exceed 200' })
  limit?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @Matches(/^[A-Z]{2}$/, {
    message:
      'Country must be a valid ISO 3166-1 alpha-2 country code (e.g., US, GB, CA)',
  })
  country?: string;

  @IsOptional()
  @IsString()
  @IsIn(ITUNES_LANGUAGES)
  lang?: string;

  @IsOptional()
  @IsString()
  @IsIn(ITUNES_VERSIONS)
  version?: string;

  @IsOptional()
  @IsString()
  @IsIn(ITUNES_EXPLICIT_VALUES)
  explicit?: string;

  @IsOptional()
  @IsString()
  callback?: string;
}
