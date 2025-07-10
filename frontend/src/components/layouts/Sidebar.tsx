"use client"

import { Home, Compass, Clock, Headphones, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-gray-900 border-r border-gray-800 p-4 fixed h-full z-10">
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </div>
      </div>
      
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start text-purple-400 bg-purple-400/10 hover:bg-purple-400/20">
          <Home className="w-5 h-5 mr-3" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
          <Compass className="w-5 h-5 mr-3" />
          Discover
        </Button>

        <div className="pt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">YOUR STUFF</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
              <List className="w-5 h-5 mr-3" />
              My Queue
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
              <Headphones className="w-5 h-5 mr-3" />
              My Podcasts
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
              <Clock className="w-5 h-5 mr-3" />
              Recents
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  )
} 