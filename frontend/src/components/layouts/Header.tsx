"use client"

import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onFilterToggle: () => void
}

export default function Header({ 
  searchTerm, 
  onSearchChange, 
  onKeyPress, 
  onFilterToggle
}: HeaderProps) {
  return (
    <>
      {/* Mobile Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800 md:hidden">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search iTunes..." 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
            />
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search through over 70 million podcasts and episodes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 w-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onFilterToggle}
            className="text-gray-400 hover:text-white"
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="text-white mr-[5px] mb-0 block text-[13px] font-medium px-3 py-[7px]"
            style={{ backgroundColor: '#456C91'}}
          >
            Log in
          </Button>
          <Button
            size="sm"
            className="text-white mr-[5px] mb-0 block text-[13px] font-medium px-3 py-[7px]"
            style={{ backgroundColor: '#456C91'}}
          >
            Sign up
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </header>
    </>
  )
} 