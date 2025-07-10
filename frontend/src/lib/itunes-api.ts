import { ItunesApiResponse, SearchItunesParams } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';

export class ItunesApiService {
  private static buildSearchUrl(params: SearchItunesParams): string {
    const searchParams = new URLSearchParams();
    
    searchParams.append('term', params.term);
    
    if (params.media) searchParams.append('media', params.media);
    if (params.entity) searchParams.append('entity', params.entity);
    if (params.attribute) searchParams.append('attribute', params.attribute);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.country) searchParams.append('country', params.country);
    if (params.lang) searchParams.append('lang', params.lang);
    if (params.version) searchParams.append('version', params.version);
    if (params.explicit) searchParams.append('explicit', params.explicit);
    if (params.callback) searchParams.append('callback', params.callback);
    
    return `${API_BASE_URL}/itunes/search?${searchParams.toString()}`;
  }

  static async search(params: SearchItunesParams): Promise<ItunesApiResponse> {
    try {
      const url = this.buildSearchUrl(params);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ItunesApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('iTunes search error:', error);
      throw new Error(
        `Failed to search iTunes: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

export default ItunesApiService; 