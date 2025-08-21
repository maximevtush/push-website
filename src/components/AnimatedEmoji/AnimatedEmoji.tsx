import React from 'react';
import styled, { keyframes } from 'styled-components';
import ConfettiEmoji from './ConfettiEmoji';

// Emoji types
export type EmojiType = 'confetti' | 'love' | 'haha' | 'yay' | 'wow';

// Props interface
interface AnimatedEmojiProps {
  type: EmojiType;
  size?: number;
  className?: string;
}

// Color constants
const colors = {
  base: '#ffda6a',
  like: '#548dff',
  love: '#f55064',
  white: 'var(--ifm-color-white)',
  black: 'var(--ifm-color-black)',
  text: '#8a8a8a',
  angry: '#d5234c',
};

// Keyframe animations
const heartBeat = keyframes`
  25% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.6);
  }
`;

const hahaFace = keyframes`
  10% {
    transform: translateY(25px);
  }
  20% {
    transform: translateY(15px);
  }
  30% {
    transform: translateY(25px);
  }
  40% {
    transform: translateY(15px);
  }
  50% {
    transform: translateY(25px);
  }
  60% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-10px);
  }
`;

const hahaMouth = keyframes`
  10% {
    transform: scale(0.6);
    top: 45%;
  }
  20% {
    transform: scale(0.8);
    top: 45%;
  }
  30% {
    transform: scale(0.6);
    top: 45%;
  }
  40% {
    transform: scale(0.8);
    top: 45%;
  }
  50% {
    transform: scale(0.6);
    top: 45%;
  }
  60% {
    transform: scale(1);
    top: 50%;
  }
  70% {
    transform: scale(1.2);
    top: 50%;
  }
  80% {
    transform: scale(1);
    top: 50%;
  }
  90% {
    transform: scale(1.1);
    top: 50%;
  }
`;

const yayAnimation = keyframes`
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
`;

const wowFace = keyframes`
  15%, 25% {
    transform: rotate(20deg) translateX(-25px);
  }
  45%, 65% {
    transform: rotate(-20deg) translateX(25px);
  }
  75%, 100% {
    transform: rotate(0deg) translateX(0);
  }
`;

const wowBrow = keyframes`
  15%, 65% {
    top: 25px;
  }
  75%, 100%, 0% {
    top: 15px;
  }
`;

const wowMouth = keyframes`
  10%, 30% {
    width: 20px;
    height: 20px;
    left: calc(50% - 10px);
  }
  50%, 70% {
    width: 30px;
    height: 40px;
    left: calc(50% - 15px);
  }
  75%, 100% {
    height: 50px;
  }
`;

// Base emoji container
const EmojiContainer = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${colors.base};
  display: inline-block;
  border-radius: 50%;
  position: relative;
  margin: 15px;
`;

// Common element styles
const EmojiElement = styled.div`
  position: absolute;

  &:before,
  &:after {
    position: absolute;
    content: '';
  }
`;

// Love emoji styles
const LoveEmoji = styled(EmojiContainer)`
  background: ${colors.love};
`;

const LoveHeart = styled(EmojiElement)`
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  animation: ${heartBeat} 1s linear infinite alternate;

  &:before,
  &:after {
    left: calc(50% - 20px);
    top: calc(50% - 32px);
    width: 40px;
    height: 64px;
    background: ${colors.white};
    border-radius: 20px 20px 0 0;
  }

  &:before {
    transform: translate(20px) rotate(-45deg);
    transform-origin: 0 100%;
  }

  &:after {
    transform: translate(-20px) rotate(45deg);
    transform-origin: 100% 100%;
  }
`;

// Haha emoji styles
const HahaEmoji = styled(EmojiContainer)``;

const HahaFace = styled(EmojiElement)`
  width: inherit;
  height: inherit;
  animation: ${hahaFace} 2s linear infinite;
`;

const HahaEyes = styled(EmojiElement)`
  width: 26px;
  height: 6px;
  border-radius: 2px;
  left: calc(50% - 13px);
  top: 35px;
  transform: rotate(20deg);
  background: transparent;
  box-shadow:
    -25px 5px 0 0 ${colors.black},
    25px -5px 0 0 ${colors.black};

  &:after {
    left: 0;
    top: 0;
    width: 26px;
    height: 6px;
    border-radius: 2px;
    transform: rotate(-40deg);
    background: transparent;
    box-shadow:
      -25px -5px 0 0 ${colors.black},
      25px 5px 0 0 ${colors.black};
  }
`;

const HahaMouth = styled(EmojiElement)`
  width: 80px;
  height: 40px;
  left: calc(50% - 40px);
  top: 50%;
  background: ${colors.black};
  border-radius: 0 0 40px 40px;
  overflow: hidden;
  z-index: 1;
  animation: ${hahaMouth} 2s linear infinite;
`;

const HahaTongue = styled(EmojiElement)`
  width: 70px;
  height: 30px;
  background: ${colors.love};
  left: calc(50% - 35px);
  bottom: -10px;
  border-radius: 50%;
`;

// Yay emoji styles
const YayEmoji = styled(EmojiContainer)``;

const YayFace = styled(EmojiElement)`
  width: inherit;
  height: inherit;
  animation: ${yayAnimation} 1s linear infinite alternate;
`;

const YayEyebrows = styled(EmojiElement)`
  left: calc(50% - 3px);
  top: 30px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    -6px 0 0 0 ${colors.black},
    -36px 0 0 0px ${colors.black},
    6px 0 0 0 ${colors.black},
    36px 0 0 0px ${colors.black};

  &:before,
  &:after {
    width: 36px;
    height: 18px;
    border-radius: 60px 60px 0 0;
    background: transparent;
    border: 6px solid ${colors.black};
    box-sizing: border-box;
    border-bottom: 0;
    bottom: 3px;
    left: calc(50% - 18px);
  }

  &:before {
    margin-left: -21px;
  }

  &:after {
    margin-left: 21px;
  }
`;

const YayMouth = styled(EmojiElement)`
  top: 60px;
  background: transparent;
  left: 50%;

  &:after {
    width: 80px;
    height: 80px;
    left: calc(50% - 40px);
    top: -75px;
    border-radius: 50%;
    background: transparent;
    border: 6px solid ${colors.black};
    box-sizing: border-box;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    z-index: 1;
  }

  &:before {
    width: 6px;
    height: 6px;
    background: transparent;
    border-radius: 50%;
    bottom: 5px;
    left: calc(50% - 3px);
    box-shadow:
      -25px 0 0 0 ${colors.black},
      25px 0 0 0 ${colors.black},
      -35px -2px 30px 10px ${colors.angry},
      35px -2px 30px 10px ${colors.angry};
  }
`;

// Wow emoji styles
const WowEmoji = styled(EmojiContainer)``;

const WowFace = styled(EmojiElement)`
  width: inherit;
  height: inherit;
  animation: ${wowFace} 3s linear infinite;
`;

const WowEyebrows = styled(EmojiElement)`
  left: calc(50% - 3px);
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    -18px 0 0 0 ${colors.black},
    -33px 0 0 0 ${colors.black},
    18px 0 0 0 ${colors.black},
    33px 0 0 0 ${colors.black};
  animation: ${wowBrow} 3s linear infinite;

  &:before,
  &:after {
    width: 24px;
    height: 20px;
    border: 6px solid ${colors.black};
    box-sizing: border-box;
    border-radius: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    top: -3px;
    left: calc(50% - 12px);
  }

  &:before {
    margin-left: -25px;
  }

  &:after {
    margin-left: 25px;
  }
`;

const WowEyes = styled(EmojiElement)`
  width: 16px;
  height: 24px;
  left: calc(50% - 8px);
  top: 35px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    25px 0 0 0 ${colors.black},
    -25px 0 0 0 ${colors.black};
`;

const WowMouth = styled(EmojiElement)`
  width: 30px;
  height: 45px;
  left: calc(50% - 15px);
  top: 50%;
  border-radius: 50%;
  background: ${colors.black};
  animation: ${wowMouth} 3s linear infinite;
`;

// Main
interface AnimatedEmojiProps {
  type: EmojiType;
  size?: number;
  className?: string;
  flip?: boolean;
}

const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({
  type,
  size = 120,
  className,
  flip = false,
}) => {
  const renderEmoji = () => {
    switch (type) {
      case 'confetti':
        return <ConfettiEmoji size={size} className={className} flip={flip} />;

      case 'love':
        return (
          <LoveEmoji size={size} className={className}>
            <LoveHeart />
          </LoveEmoji>
        );

      case 'haha':
        return (
          <HahaEmoji size={size} className={className}>
            <HahaFace>
              <HahaEyes />
              <HahaMouth>
                <HahaTongue />
              </HahaMouth>
            </HahaFace>
          </HahaEmoji>
        );

      case 'yay':
        return (
          <YayEmoji size={size} className={className}>
            <YayFace>
              <YayEyebrows />
              <YayMouth />
            </YayFace>
          </YayEmoji>
        );

      case 'wow':
        return (
          <WowEmoji size={size} className={className}>
            <WowFace>
              <WowEyebrows />
              <WowEyes />
              <WowMouth />
            </WowFace>
          </WowEmoji>
        );

      default:
        return null;
    }
  };

  return renderEmoji();
};

export default AnimatedEmoji;
