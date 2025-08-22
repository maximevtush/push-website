// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

// React + Web3 Essentials
import { styled } from 'styled-components';

// External Components
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';

// Internal Components
import { device } from '@site/src/config/globals';
import instantInteroperability from '@site/static/assets/website/interoperability/instant-interoperability.json';

// Import Assets
import StatsBg from '../../../static/assets/website/chain/StatsSectionBG.webp';
import {
  H2,
  H3,
  ItemH,
  ItemV,
  MultiContent,
  Span,
} from '../../css/SharedStyling';
import useMediaQuery from '../../hooks/useMediaQuery';

// Internal Configs
import { StatsList } from '../../config/StatsList';

export const StatsSection = () => {
  // Internationalization
  const { t, i18n } = useTranslation();

  const isMobile = useMediaQuery(device.mobileL);
  return (
    <>
      <MultiContent className='large'>
        <TextSection>
          <H2>
            {t('pages.home.stats-section.title')} {isMobile && <br />}{' '}
            <ColoredText>
              {t('pages.home.stats-section.titleGradient')}
            </ColoredText>{' '}
            <br /> {t('pages.home.stats-section.titleThird')}
          </H2>

          <Span className='regular-text'>
            {t('pages.home.stats-section.description')}
          </Span>
        </TextSection>
      </MultiContent>
      {/* <LottieContainer>
        <Lottie animationData={instantInteroperability} loop={true} autoplay={true} />
      </LottieContainer> */}

      <MultiContent className='large'>
        <LottieContainer>
          <Lottie
            animationData={instantInteroperability}
            loop={true}
            autoplay={true}
            title={t('pages.home.stats-section.animation-title')}
            aria-label={t('pages.home.stats-section.animation-alt')}
          />
        </LottieContainer>
        <StatsGrid>
          {StatsList.map((item, index) => (
            <StatsItem key={index}>
              <H3>{t(item.title)}</H3>
              {item.image && (
                <img
                  src={item.image}
                  srcSet={item.srcSet}
                  alt={t(item.imagealt)}
                  title={t(item.imagetitle)}
                />
              )}
              {item.description && <Span>{t(item.description)}</Span>}
            </StatsItem>
          ))}
        </StatsGrid>
      </MultiContent>
    </>
  );
};

const StatsWrapper = styled.div`
  width: 100%;

  @media ${device.tablet} {
    background-size: contain;
    background-position: bottom;
    padding-bottom: 0px;
    margin-top: 0px;
  }

  @media ${device.mobileL} {
    background-size: contain;
    background-position: center 30%;
    padding-bottom: 0px;
  }
`;

const TextSection = styled(ItemH)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  z-index: 99;

  gap: 48px;

  @media ${device.tablet} {
    width: 100%;
    gap: 36px;
  }

  h2 {
    color: var(--ifm-color-white);
    leading-trim: both;
    text-edge: cap;
    font-size: 3rem;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -0.96px;
  }

  .regular-text {
    max-width: 400px;

    color: var(--ifm-color-white);
    leading-trim: both;
    text-edge: cap;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.4px;
  }
`;

const LottieContainer = styled(ItemV)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.3;
  z-index: 0;

  @media ${device.mobileL} {
    bottom: auto;
  }
`;

const StatsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 64px;
  flex-wrap: wrap;

  @media ${device.tablet} {
    gap: 64px;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    align-items: center;
    margin: 0;
    gap: 96px;
  }

  h3 {
    color: var(--ifm-color-white);
    text-align: center;
    text-edge: cap;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  span {
    color: var(--ifm-color-white);
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-size: 52px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -1.04px;
  }
`;

const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  flex-grow: 1;

  @media ${device.mobileL} {
    gap: 32px;
  }
`;

const ColoredText = styled.span`
  color: var(--ifm-color-custom-pink);
  leading-trim: both;
  text-edge: cap;
  font-size: 3rem
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.96px;
`;
