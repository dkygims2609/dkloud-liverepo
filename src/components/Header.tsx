
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleTabClick: (tabValue: string) => void;
}

const Header = ({ 
  searchOpen, 
  setSearchOpen, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  handleTabClick 
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Movies", value: "movies" },
    { label: "TV Series", value: "tv-series" },
    { label: "AI Tools", value: "ai-tools" },
    { label: "Tech Corner", value: "tech-corner" },
    { label: "YouTube", value: "youtube-channels" },
    { label: "Gadgets", value: "gadgets" },
    { label: "Tech News", value: "tech-news" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/47dfee5e-0dc4-495e-b003-53a83aca36ad.png" 
              alt="dKloud Logo" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                dKloud.in
              </h1>
              <p className="text-xs text-muted-foreground">Decoding Knowledge</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant="ghost"
                size="sm"
                onClick={() => handleTabClick(item.value)}
                className="text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 sm:w-64 pr-10"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  className="p-2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t">
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleTabClick(item.value);
                    setMenuOpen(false);
                  }}
                  className="justify-start text-sm"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
