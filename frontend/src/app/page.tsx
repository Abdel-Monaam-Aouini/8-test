"use client"

import { useState, useCallback, useEffect } from 'react'
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { useItunesSearch } from '@/lib/hooks/useItunesSearch'
import { useDebounce } from '@/lib/hooks/useDebounce'

import Header from '@/components/layouts/Header'
import Sidebar from '@/components/layouts/Sidebar'
import Footer from '@/components/layouts/Footer'
import SearchFilters from '@/components/search/SearchFilters'
import SearchResultCard from '@/components/search/SearchResultCard'

export default function PodBayHome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMedia, setSelectedMedia] = useState('all')
  const [selectedEntity, setSelectedEntity] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [limit, setLimit] = useState(20)

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  const { results, loading, error, count, search, clearResults } = useItunesSearch()

  const handleSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      clearResults()
      return
    }

    await search({
      term: term,
      media: selectedMedia === 'all' ? undefined : selectedMedia,
      entity: selectedEntity || undefined,
      limit,
    })
  }, [selectedMedia, selectedEntity, limit, search, clearResults])

  useEffect(() => {
    handleSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, handleSearch])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onKeyPress={handleKeyPress}
          onFilterToggle={() => setShowFilters(!showFilters)}
        />

        <main className="flex-1 p-4 md:p-6">
          {showFilters && (
            <section className="mb-6">
              <SearchFilters
                selectedMedia={selectedMedia}
                selectedEntity={selectedEntity}
                limit={limit}
                onMediaChange={setSelectedMedia}
                onEntityChange={setSelectedEntity}
                onLimitChange={setLimit}
              />
            </section>
          )}

          {error && (
            <section className="mb-6">
              <Card className="bg-red-900/20 border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-red-400">{error}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearResults}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {count > 0 && (
            <div className="text-sm text-gray-400 mb-4">
              Found {count} results for &quot;{searchTerm}&quot;
            </div>
          )}

          {loading ? (
            <section className="mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <LoadingSpinner 
                    size="lg" 
                    text="Searching iTunes..." 
                    className="py-8"
                  />
                </CardContent>
              </Card>
            </section>
          ) : results.length > 0 ? (
            <section className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {results.map((item) => (
                  <SearchResultCard
                    key={`${item.trackId}-${item.collectionId}-${item.artistId}`}
                    item={item}
                  />
                ))}
              </div>
            </section>
          ) : searchTerm && !error ? (
            <section className="mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400 mb-4">No results found for &quot;{searchTerm}&quot;</p>
                  <p className="text-sm text-gray-500">Try adjusting your search terms or filters</p>
                </CardContent>
              </Card>
            </section>
          ) : !searchTerm && (
            <section className="mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Search iTunes</h2>
                  <p className="text-gray-400 mb-4">Discover music, podcasts, movies, TV shows, and more</p>
                  <p className="text-sm text-gray-500">Enter a search term above to get started</p>
                </CardContent>
              </Card>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}
