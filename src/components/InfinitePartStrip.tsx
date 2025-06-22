import React, { useState, useEffect } from 'react';
import '../styles/InfinitePartStrip.css';

interface Part {
  id: string;
  basePath: string;
  colors: string[];
}

interface Stack {
  id: string;
  parts: Part[];
}

interface InfinitePartStripProps {
  parts: Part[];
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomStack = (allParts: Part[]): Stack => {
  const stackHeight = getRandomInt(2, 4);
  const stackParts: Part[] = [];
  const availableParts = [...allParts];

  for (let i = 0; i < stackHeight; i++) {
    if (availableParts.length === 0) break;
    const randomIndex = getRandomInt(0, availableParts.length - 1);
    stackParts.push(availableParts[randomIndex]);
    availableParts.splice(randomIndex, 1); 
  }

  return {
    id: `stack-${Date.now()}-${Math.random()}`,
    parts: stackParts,
  };
};

const InfinitePartStrip: React.FC<InfinitePartStripProps> = ({ parts }) => {
  const [randomStacks, setRandomStacks] = useState<Stack[]>([]);

  useEffect(() => {
    const characterParts = parts.filter(p => p.id !== 'base');
    if (characterParts.length === 0) return;

    const generatedStacks = Array.from({ length: 40 }, () => generateRandomStack(characterParts));
    setRandomStacks(generatedStacks);
  }, [parts]);

  if (randomStacks.length === 0) {
    return null;
  }

  const displayStacks = [...randomStacks, ...randomStacks];

  return (
    <div className="infinite-strip-container">
      <div className="infinite-strip-scroller">
        {displayStacks.map((stack, index) => (
          <div key={`${stack.id}-${index}`} className="flex flex-col-reverse items-center mx-4 self-end">
            {stack.parts.map((part, partIndex) => {
              const randomColor = part.colors[getRandomInt(0, part.colors.length - 1)];
              const imgSrc = `${part.basePath}${randomColor}.png`;
              return (
                <img
                  key={`${part.id}-${partIndex}`}
                  src={imgSrc}
                  alt={part.id}
                  className="h-6 object-contain"
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfinitePartStrip; 