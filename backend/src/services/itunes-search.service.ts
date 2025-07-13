import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { ItunesSearchResult } from '../entities/itunes-search-result.entity';
import { ItunesApiResponse } from '../interfaces/itunes-api-response.interface';
import { SearchItunesDto } from '../dto/search-itunes.dto';
import { ITUNES_DEFAULTS } from '../constants/itunes-search.constants';

@Injectable()
export class ItunesSearchService {
  constructor(
    @InjectRepository(ItunesSearchResult)
    private readonly itunesSearchResultRepository: Repository<ItunesSearchResult>,
    private readonly httpService: HttpService,
  ) {}

  async searchAndStore(
    searchDto: SearchItunesDto,
  ): Promise<ItunesSearchResult[]> {
    const baseUrl = 'https://itunes.apple.com/search';
    const params = new URLSearchParams();

    params.append('term', searchDto.term);

    if (searchDto.media) {
      params.append('media', searchDto.media);
    }

    if (searchDto.entity) {
      params.append('entity', searchDto.entity);
    }

    if (searchDto.attribute) {
      params.append('attribute', searchDto.attribute);
    }

    if (searchDto.limit) {
      params.append('limit', searchDto.limit.toString());
    } else {
      params.append('limit', ITUNES_DEFAULTS.limit.toString());
    }

    if (searchDto.country) {
      params.append('country', searchDto.country);
    } else {
      params.append('country', ITUNES_DEFAULTS.country);
    }

    if (searchDto.lang) {
      params.append('lang', searchDto.lang);
    }

    if (searchDto.version) {
      params.append('version', searchDto.version);
    }

    if (searchDto.explicit) {
      params.append('explicit', searchDto.explicit);
    }

    if (searchDto.callback) {
      params.append('callback', searchDto.callback);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<ItunesApiResponse>(
          `${baseUrl}?${params.toString()}`,
        ),
      );

      const results = response.data.results || [];
      const searchResults: ItunesSearchResult[] = [];

      for (const result of results) {
        const searchResult = this.itunesSearchResultRepository.create({
          wrapperType: result.wrapperType,
          trackId: result.trackId,
          artistId: result.artistId,
          collectionId: result.collectionId,
          artistName: result.artistName,
          trackName: result.trackName,
          collectionName: result.collectionName,
          kind: result.kind,
          country: result.country,
          currency: result.currency,
          trackPrice: result.trackPrice,
          collectionPrice: result.collectionPrice,
          artworkUrl100: result.artworkUrl100,
          previewUrl: result.previewUrl,
          releaseDate: result.releaseDate,
          primaryGenreName: result.primaryGenreName,
          artistViewUrl: result.artistViewUrl,
          collectionViewUrl: result.collectionViewUrl,
          trackViewUrl: result.trackViewUrl,
          trackTimeMillis: result.trackTimeMillis,
          trackNumber: result.trackNumber,
          discNumber: result.discNumber,
          trackCount: result.trackCount,
          discCount: result.discCount,
          isStreamable: result.isStreamable,
          searchTerm: searchDto.term,
        });

        searchResults.push(searchResult);
      }

      // Use PostgreSQL's ON CONFLICT DO NOTHING to ignore duplicates
      if (searchResults.length > 0) {
        await this.itunesSearchResultRepository
          .createQueryBuilder()
          .insert()
          .into(ItunesSearchResult)
          .values(searchResults)
          .orIgnore()
          .execute();
      }

      const savedResults = await this.getSearchResults(searchDto.term);

      return savedResults;
    } catch (error: unknown) {
      throw new Error(
        `Failed to search iTunes API: ${(error as Error).message || 'Unknown error'}`,
      );
    }
  }

  async getSearchResults(term: string): Promise<ItunesSearchResult[]> {
    const existingResults = await this.itunesSearchResultRepository.find({
      where: { searchTerm: term },
      order: { createdAt: 'DESC' },
    });

    return existingResults;
  }
}
