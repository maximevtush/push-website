/* eslint-disable */
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';
import { BiTime } from 'react-icons/bi';
import styled from 'styled-components';

// Internal Components
import { ItemH } from '@site/src/css/SharedStyling';

// Internal Configs
import { device } from '@site/src/config/globals';

interface TutorialTimerProps {
  /** Estimated completion time in minutes */
  estimatedMinutes: number;
  /** Optional className for additional styling */
  className?: string;
}

export const TutorialTimer: React.FC<TutorialTimerProps> = ({
  estimatedMinutes,
  label,
  className,
}) => {
  const { t } = useTranslation();

  // Format time display
  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min${minutes !== 1 ? 's' : ''}`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }

    return `${hours}h ${remainingMinutes}m`;
  };

  const timeDisplay = formatTime(estimatedMinutes);

  return (
    <TimerContainer className={className}>
      <TimerIcon>
        <BiTime size='16px' aria-hidden='true' />
      </TimerIcon>
      <TimerContent>
        <TimerValue>{timeDisplay}</TimerValue>
      </TimerContent>
    </TimerContainer>
  );
};

// Styled Components
const TimerContainer = styled(ItemH)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px 8px 0px;
  width: fit-content;
  margin: -30px 0 28px 0 !important;

  @media ${device.tablet} {
    padding: 6px 10px;
    gap: 6px;
  }
`;

const TimerIcon = styled.div`
  align-items: center;
  color: var(--ifm-color-primary-unified);
  flex-shrink: 0;
  display: flex;
`;

const TimerContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const TimerLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;

  @media ${device.tablet} {
    font-size: 11px;
  }
`;

const TimerValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--ifm-color-secondary-text);
  line-height: 1.2;

  @media ${device.tablet} {
    font-size: 12px;
  }
`;
