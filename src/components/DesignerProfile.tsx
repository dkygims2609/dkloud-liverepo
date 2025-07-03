
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from 'lucide-react';

const DesignerProfile = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="designer-profile-section">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Designer Card with Flip Animation */}
          <div 
            className="designer-card-3d"
            onMouseEnter={() => setIsFlipped(!isFlipped)}
          >
            <div className={`designer-card-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* Front - Founder Image */}
              <div className="designer-card-front">
                <img 
                  src="/lovable-uploads/66de12f4-99cb-4b38-95fc-77dddf0ad3c3.png" 
                  alt="DK - Founder & Designer" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Back - dKloud Logo */}
              <div className="designer-card-back flex items-center justify-center">
                <img 
                  src="/lovable-uploads/422cbbb0-c4bc-4187-9a72-3357810c13df.png" 
                  alt="dKloud Tech Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Designer Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Designed by DK
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Passionate creative technologist crafting digital experiences with love for 
              innovation, cloud technology, and community-driven solutions.
            </p>

            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Star className="h-3 w-3 text-yellow-500" />
                Creative Technologist
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Heart className="h-3 w-3 text-red-500" />
                Open Source Advocate
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignerProfile;
