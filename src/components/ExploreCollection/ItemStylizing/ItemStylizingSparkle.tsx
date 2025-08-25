import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for fade out and reappear effect
const sparkle = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  20% {
    opacity: 0.2;
    transform: scale(1);
  }
  80% {
    opacity: 0.2;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

// Container for the entire pattern
const PatternContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

// Individual square element
const Square = styled.div<{
  size: number;
  left: number;
  top: number;
  delay: number;
  opacity: number;
}>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: rgba(255, 255, 255, ${(props) => props.opacity});
  border-radius: 2px;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  opacity: 0; /* Start invisible */
  animation: ${sparkle} 10s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  animation-fill-mode: both; /* Apply animation styles before and after */
`;

interface SquareData {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
  opacity: number;
}

type SizeConfig = 'small' | 'medium' | 'large' | 'random';

interface ItemStylizingSparkleProps {
  density?: number; // Number of squares to generate
  color?: string; // Color of squares (default: white)
  animated?: boolean; // Whether squares should animate
  squareSize?: SizeConfig; // Size configuration: 'small', 'medium', 'large', or 'random'
  size?: number; // Fixed size in pixels - overrides squareSize when provided
  minOpacity?: number; // Minimum opacity for squares (default: 0.05)
  maxOpacity?: number; // Maximum opacity for squares (default: 0.15)
}

const ItemStylizingSparkle: React.FC<ItemStylizingSparkleProps> = ({
  density = 30,
  color = 'white',
  animated = true,
  squareSize = 'random',
  size,
  minOpacity = 0.05,
  maxOpacity = 0.15,
}) => {
  const [squares, setSquares] = useState<SquareData[]>([]);

  // Helper function to get size based on configuration
  const getSquareSize = (config: SizeConfig): number => {
    // If a fixed size is provided, use that instead
    if (size !== undefined) {
      return size;
    }

    switch (config) {
      case 'small':
        return 8 + Math.random() * 6; // 8-14px
      case 'medium':
        return 12 + Math.random() * 8; // 12-20px
      case 'large':
        return 18 + Math.random() * 12; // 18-30px
      case 'random':
      default:
        return 8 + Math.random() * 20; // 8-28px
    }
  };

  // Helper function to check if two squares overlap
  const checkOverlap = (
    square1: { left: number; top: number; size: number },
    square2: { left: number; top: number; size: number },
    containerWidth: number = 100,
    containerHeight: number = 100
  ): boolean => {
    // Convert percentages to actual pixels for calculation (assuming 400px container)
    const scale = 4;
    const x1 = (square1.left / 100) * containerWidth * scale;
    const y1 = (square1.top / 100) * containerHeight * scale;
    const x2 = (square2.left / 100) * containerWidth * scale;
    const y2 = (square2.top / 100) * containerHeight * scale;

    // Add some padding to prevent squares from being too close
    const padding = 5;

    return (
      x1 < x2 + square2.size + padding &&
      x1 + square1.size + padding > x2 &&
      y1 < y2 + square2.size + padding &&
      y1 + square1.size + padding > y2
    );
  };

  useEffect(() => {
    const generateSquares = () => {
      const newSquares: SquareData[] = [];
      const maxAttempts = density * 15; // Increase attempts for clustering
      let attempts = 0;

      // Helper function to calculate clustering probability
      const getClusteringProbability = (x: number, y: number): number => {
        if (newSquares.length === 0) return 1; // First sparkle has 100% probability

        let totalInfluence = 0;
        const maxInfluenceDistance = 25; // Maximum distance for clustering influence

        newSquares.forEach((existingSquare) => {
          const distance = Math.sqrt(
            Math.pow(x - existingSquare.left, 2) +
              Math.pow(y - existingSquare.top, 2)
          );

          if (distance < maxInfluenceDistance) {
            // Closer sparkles have stronger influence
            const influence = Math.max(0, 1 - distance / maxInfluenceDistance);
            totalInfluence += influence;
          }
        });

        // Base probability + clustering bonus
        const baseProbability = 0.1; // Low base chance for isolated sparkles
        const clusteringBonus = Math.min(0.9, totalInfluence * 0.8); // Cap at 90% bonus

        return baseProbability + clusteringBonus;
      };

      // Generate seed sparkles first (2-3 random positions to start clusters)
      const numSeeds = Math.min(Math.ceil(density / 15), 3);
      for (let i = 0; i < numSeeds && newSquares.length < density; i++) {
        const size = getSquareSize(squareSize);
        const left = Math.random() * (95 - size / 10);
        const top = Math.random() * (95 - size / 10);

        newSquares.push({
          id: newSquares.length,
          size,
          left,
          top,
          delay: Math.random() * 8 + 2,
          opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
        });
      }

      // Generate remaining sparkles using clustering algorithm
      while (newSquares.length < density && attempts < maxAttempts) {
        attempts++;

        const size = getSquareSize(squareSize);
        const left = Math.random() * (95 - size / 10);
        const top = Math.random() * (95 - size / 10);

        // Calculate probability based on nearby sparkles
        const probability = getClusteringProbability(left, top);

        // Use probability to decide whether to place sparkle here
        if (Math.random() < probability) {
          const newSquare = {
            id: newSquares.length,
            size,
            left,
            top,
            delay: Math.random() * 8 + 2,
            opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
          };

          // Check for overlaps with existing squares
          const hasOverlap = newSquares.some((existingSquare) =>
            checkOverlap(newSquare, existingSquare)
          );

          if (!hasOverlap) {
            newSquares.push(newSquare);
          }
        }
      }

      setSquares(newSquares);
    };

    generateSquares();
  }, [density, squareSize, size, minOpacity, maxOpacity]);

  return (
    <PatternContainer>
      {squares.map((square) => (
        <Square
          key={square.id}
          size={square.size}
          left={square.left}
          top={square.top}
          delay={animated ? square.delay : 0}
          opacity={square.opacity}
          style={{
            background:
              color === 'white'
                ? `rgba(255, 255, 255, ${square.opacity})`
                : `rgba(0, 0, 0, ${square.opacity})`,
          }}
        />
      ))}
    </PatternContainer>
  );
};

export default ItemStylizingSparkle;
