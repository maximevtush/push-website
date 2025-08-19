import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Horizontal left-to-right animation
const travelHorizontalLR = keyframes`
  0% {
    opacity: 0;
    left: -20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
  10% {
    opacity: 1;
    left: 0%;
  }
  90% {
    opacity: 1;
    left: 100%;
  }
  100% {
    opacity: 0;
    left: calc(100% + 20px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
`;

// Horizontal right-to-left animation
const travelHorizontalRL = keyframes`
  0% {
    opacity: 0;
    left: calc(100% + 20px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
  10% {
    opacity: 1;
    left: 100%;
  }
  90% {
    opacity: 1;
    left: 0%;
  }
  100% {
    opacity: 0;
    left: -20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
`;

// Vertical top-to-bottom animation
const travelVerticalTB = keyframes`
  0% {
    opacity: 0;
    top: -20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
  10% {
    opacity: 1;
    top: 0%;
  }
  90% {
    opacity: 1;
    top: 100%;
  }
  100% {
    opacity: 0;
    top: calc(100% + 20px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
`;

// Vertical bottom-to-top animation
const travelVerticalBT = keyframes`
  0% {
    opacity: 0;
    top: calc(100% + 20px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
  }
  10% {
    opacity: 1;
    top: 100%;
  }
  90% {
    opacity: 1;
    top: 0%;
  }
  100% {
    opacity: 0;
    top: -20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.6);
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

// Individual grid line element
const GridLine = styled.div<{
  direction: 'horizontal' | 'vertical';
  position: number;
  gridSize: number;
  color: 'white' | 'black';
  opacity: number;
  isAnimated: boolean;
  animationDirection: boolean;
  delay: number;
}>`
  position: absolute;
  pointer-events: none;
  z-index: 1;

  ${(props) =>
    props.direction === 'horizontal'
      ? css`
          width: 100%;
          height: 1px;
          left: 0;
          top: ${props.position}%;
        `
      : css`
          width: 1px;
          height: 100%;
          left: ${props.position}%;
          top: 0;
        `}

  background: ${(props) => props.color};
  opacity: ${(props) => props.opacity};

  /* Apply subtle blur for softer appearance */
  filter: blur(0.3px);

  /* Radial fade overlay using ::before */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 30%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.5) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  /* Traveling light using ::after pseudo-element */
  &::after {
    content: '';
    position: absolute;
    opacity: 0;
    pointer-events: none;
    z-index: 2;

    ${(props) =>
      props.direction === 'horizontal'
        ? css`
            width: 8px;
            height: 3px;
            top: 50%;
            transform: translateY(-50%);
            left: -10px;
          `
        : css`
            width: 3px;
            height: 8px;
            left: 50%;
            transform: translateX(-50%);
            top: -10px;
          `}

    background: rgba(255, 255, 255, 1);

    border-radius: 50%;
    box-shadow:
      0 0 8px rgba(255, 255, 255, 1),
      0 0 16px rgba(255, 255, 255, 0.8),
      0 0 24px rgba(255, 255, 255, 0.4);

    filter: blur(0.5px);
  }

  ${(props) =>
    props.isAnimated &&
    css`
      &::after {
        animation: ${props.direction === 'horizontal'
            ? props.animationDirection
              ? travelHorizontalLR
              : travelHorizontalRL
            : props.animationDirection
              ? travelVerticalTB
              : travelVerticalBT}
          2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        animation-delay: ${props.delay}s;
      }
    `}
`;

interface ItemStylizingLinesProps {
  gridSize?: number; // Size of grid cells in pixels (default: 40)
  color?: 'white' | 'black'; // Color of grid lines (default: white)
  opacity?: number; // Overall opacity of the grid (default: 0.3)
  lightningEnabled?: boolean; // Whether to show lightning effects (default: true)
  lightningCount?: number; // Number of lines to animate (1-4, default: random)
}

const ItemStylizingLines: React.FC<ItemStylizingLinesProps> = ({
  gridSize = 40,
  color = 'white',
  opacity = 0.3,
  lightningEnabled = true,
  lightningCount,
}) => {
  const gridColor =
    color === 'white' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

  // Generate all grid lines (both horizontal and vertical)
  const generateAllGridLines = () => {
    const lines = [];
    const spacing = (gridSize / 300) * 100; // Convert gridSize to percentage

    // Generate horizontal lines
    for (let i = 0; i * spacing <= 100; i++) {
      const position = i * spacing;
      if (position <= 95) {
        lines.push({
          id: `h-${i}`,
          direction: 'horizontal' as const,
          position,
        });
      }
    }

    // Generate vertical lines
    for (let i = 0; i * spacing <= 100; i++) {
      const position = i * spacing;
      if (position <= 95) {
        lines.push({
          id: `v-${i}`,
          direction: 'vertical' as const,
          position,
        });
      }
    }

    return lines;
  };

  const allLines = generateAllGridLines();

  // State to manage which lines are animated with their directions
  const [animatedLines, setAnimatedLines] = useState<Map<string, boolean>>(
    new Map()
  );

  // Generate lightning animation on random lines
  useEffect(() => {
    if (!lightningEnabled) return;

    const interval = setInterval(() => {
      const numToAnimate = lightningCount || Math.floor(Math.random() * 8) + 4; // 4-12 lines for testing
      const selectedLines = new Map<string, boolean>();

      // Randomly select lines to animate with random directions
      while (
        selectedLines.size < numToAnimate &&
        selectedLines.size < allLines.length
      ) {
        const randomIndex = Math.floor(Math.random() * allLines.length);
        const randomDirection = Math.random() > 0.5; // true = forward, false = reverse
        selectedLines.set(allLines[randomIndex].id, randomDirection);
      }

      setAnimatedLines(selectedLines);

      // Clear animation after 2 seconds (animation duration)
      setTimeout(() => {
        setAnimatedLines(new Map());
      }, 2000);
    }, 2000); // New lightning every 2 seconds for testing

    return () => clearInterval(interval);
  }, [lightningEnabled, lightningCount, allLines]);

  return (
    <PatternContainer>
      {allLines.map((line, index) => {
        const isAnimated = animatedLines.has(line.id);
        const animationDirection = animatedLines.get(line.id) || true; // true = forward, false = reverse

        return (
          <GridLine
            key={line.id}
            direction={line.direction}
            position={line.position}
            gridSize={gridSize}
            color={gridColor}
            opacity={opacity}
            isAnimated={isAnimated}
            animationDirection={animationDirection}
            delay={index * 0.1} // Slight stagger for animated lines
          />
        );
      })}
    </PatternContainer>
  );
};

export default ItemStylizingLines;
