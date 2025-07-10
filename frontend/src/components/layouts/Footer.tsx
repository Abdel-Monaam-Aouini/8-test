export default function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-4 px-4 md:px-6 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between text-xs text-gray-500 gap-4">
        <div>
          <p>Podbay v2.0.0 by Fancy Sauce.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            All Podcasts
          </a>
        </div>
      </div>
    </footer>
  )
} 