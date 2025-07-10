import { useState, useCallback } from 'react';
import { ItunesApiService } from '../itunes-api';
import { ItunesSearchResult, SearchItunesParams } from '../types';

interface UseItunesSearchState {
  results: ItunesSearchResult[];
  loading: boolean;
  error: string | null;
  count: number;
}

interface UseItunesSearchReturn extends UseItunesSearchState {
  search: (params: SearchItunesParams) => Promise<void>;
  clearResults: () => void;
}

export const useItunesSearch = (): UseItunesSearchReturn => {
  const [state, setState] = useState<UseItunesSearchState>({
    results: [],
    loading: false,
    error: null,
    count: 0,
  });

  const search = useCallback(async (params: SearchItunesParams) => {
    if (!params.term.trim()) {
      setState(prev => ({ ...prev, error: 'Search term is required' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await ItunesApiService.search(params);
      setState({
        results: response.data,
        loading: false,
        error: null,
        count: response.count,
      });
    } catch (error) {
      setState({
        results: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Search failed',
        count: 0,
      });
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({
      results: [],
      loading: false,
      error: null,
      count: 0,
    });
  }, []);

  return {
    ...state,
    search,
    clearResults,
  };
}; 