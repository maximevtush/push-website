import React from 'react';
import ItemStylizingSparkle from './ItemStylizingSparkle';
import ItemStylizingLines from './ItemStylizingLines';

// Sparkle-specific props
interface SparkleProps {
  type: 'sparkle';
  density?: number;
  color?: string;
  animated?: boolean;
  squareSize?: 'small' | 'medium' | 'large' | 'random';
  size?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

// Lines-specific props
interface LinesProps {
  type: 'lines';
  density?: number;
  color?: string;
  animated?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'diagonal' | 'random';
  minLength?: number;
  maxLength?: number;
  thickness?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

type ItemStylizingProps = SparkleProps | LinesProps;

const ItemStylizing: React.FC<ItemStylizingProps> = (props) => {
  const { type, ...rest } = props;

  if (type === 'sparkle') {
    return <ItemStylizingSparkle {...(rest as SparkleProps)} />;
  }

  if (type === 'lines') {
    return <ItemStylizingLines {...(rest as LinesProps)} />;
  }

  // Fallback to sparkle if type is not recognized
  return <ItemStylizingSparkle />;
};

export default ItemStylizing;
