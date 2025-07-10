import { Card, CardContent } from "@/components/ui/card"
import { ITUNES_MEDIA_TYPES, ITUNES_ENTITIES } from '@/lib/types'

interface SearchFiltersProps {
  selectedMedia: string
  selectedEntity: string
  limit: number
  onMediaChange: (value: string) => void
  onEntityChange: (value: string) => void
  onLimitChange: (value: number) => void
}

export default function SearchFilters({
  selectedMedia,
  selectedEntity,
  limit,
  onMediaChange,
  onEntityChange,
  onLimitChange
}: SearchFiltersProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Media Type
            </label>
            <select
              value={selectedMedia}
              onChange={(e) => onMediaChange(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              {ITUNES_MEDIA_TYPES.map((media) => (
                <option key={media.value} value={media.value}>
                  {media.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Entity Type
            </label>
            <select
              value={selectedEntity}
              onChange={(e) => onEntityChange(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">All Entities</option>
              {ITUNES_ENTITIES.map((entity) => (
                <option key={entity.value} value={entity.value}>
                  {entity.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Result Limit
            </label>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value={10}>10 results</option>
              <option value={20}>20 results</option>
              <option value={50}>50 results</option>
              <option value={100}>100 results</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 