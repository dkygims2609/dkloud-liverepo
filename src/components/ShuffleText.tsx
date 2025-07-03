
import React, { useState, useEffect } from 'react';

interface ShuffleTextProps {
  text: string;
  className?: string;
}

const ShuffleText = ({ text, className }: ShuffleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setIsShuffling(true);
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789';
      let iteration = 0;
      
      const shuffleTimer = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(shuffleTimer);
          setIsShuffling(false);
        }
        
        iteration += 1 / 3;
      }, 30);

      setTimeout(() => {
        clearInterval(shuffleTimer);
        setDisplayText(text);
        setIsShuffling(false);
      }, 1500);
    }, 15000);

    return () => clearInterval(shuffleInterval);
  }, [text]);

  return (
    <span 
      className={`${className} ${isShuffling ? 'text-green-400' : ''} transition-colors duration-300 inline-block`}
      style={{ 
        minWidth: isShuffling ? `${text.length * 0.6}em` : 'auto',
        fontFamily: 'monospace'
      }}
    >
      {displayText}
    </span>
  );
};

export default ShuffleText;
