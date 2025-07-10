export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 font-medium">Loading...</p>
        <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your content</p>
      </div>
    </div>
  )
}
