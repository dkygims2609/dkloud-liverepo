
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MoviesTab from '@/components/MoviesTab';

interface MoviesPageProps {
  onBack: () => void;
}

const MoviesPage = ({ onBack }: MoviesPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Movies Collection
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <MoviesTab />
      </div>
    </div>
  );
};

export default MoviesPage;
