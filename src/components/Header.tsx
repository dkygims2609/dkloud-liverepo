
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface HeaderProps {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleTabClick: (tabValue: string) => void;
}

const Header = ({ searchOpen, setSearchOpen, searchQuery, setSearchQuery, handleSearch, handleTabClick }: HeaderProps) => {
  return (
    <header className="w-full py-4 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            dK
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-bold text-gray-800 dark:text-white">dKloud Tech</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Knowledge Hub</div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <button onClick={() => handleTabClick('movies')} className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Movies</button>
          <button onClick={() => handleTabClick('youtube')} className="text-sm font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors">YouTube</button>
          <button onClick={() => handleTabClick('ai')} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">AI Tools</button>
          <button onClick={() => handleTabClick('tech')} className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tech</button>
          <button onClick={() => handleTabClick('gadgets')} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Gadgets</button>
          <button onClick={() => handleTabClick('news')} className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">News</button>
          <button onClick={() => handleTabClick('portfolio')} className="text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Portfolio</button>
        </nav>

        {/* Search */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-32 sm:w-48"
                autoFocus
              />
              <Button type="submit" size="sm" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button onClick={() => setSearchOpen(true)} size="sm" variant="ghost" className="hover:bg-purple-100 dark:hover:bg-purple-900/30">
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
