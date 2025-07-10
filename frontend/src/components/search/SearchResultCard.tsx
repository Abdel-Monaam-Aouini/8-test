import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ItunesSearchResult } from '@/lib/types'
import Image from 'next/image'

interface SearchResultCardProps {
  item: ItunesSearchResult
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
  const formatDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
      <CardContent className="p-3 md:p-4">
        {/* Artwork */}
        <div className="aspect-square bg-gray-700 rounded-lg mb-3 overflow-hidden">
          {item.artworkUrl100 ? (
            <Image
              width={100}
              height={100}
              src={item.artworkUrl100}
              alt={item.trackName || item.collectionName || 'Artwork'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-600 rounded"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm line-clamp-2 text-white">
            {item.trackName || item.collectionName || 'Unknown Title'}
          </h3>
          
          <p className="text-xs text-gray-400 line-clamp-1">
            {item.artistName || 'Unknown Artist'}
          </p>

          {item.primaryGenreName && (
            <p className="text-xs text-teal-400">
              {item.primaryGenreName}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{item.kind || item.wrapperType}</span>
            {item.trackTimeMillis && (
              <span>{formatDuration(item.trackTimeMillis)}</span>
            )}
          </div>

          {(item.trackPrice || item.collectionPrice) && (
            <div className="text-xs text-green-400">
              {item.trackPrice && formatPrice(item.trackPrice)}
              {item.collectionPrice && item.trackPrice && ' / '}
              {item.collectionPrice && formatPrice(item.collectionPrice)}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-2 mt-2">
            {item.previewUrl && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-white"
                onClick={() => window.open(item.previewUrl, '_blank')}
              >
                Preview
              </Button>
            )}
            {(item.trackViewUrl || item.collectionViewUrl) && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white"
                onClick={() => window.open(item.trackViewUrl || item.collectionViewUrl, '_blank')}
              >
                View
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 