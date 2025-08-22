// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

// React + Web3 Essentials
import Lottie from 'lottie-react';
import { TbArrowRight } from 'react-icons/tb';
import styled from 'styled-components';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Components
import { device } from '@site/src/config/globals';
import { A, H2, Span } from '@site/src/css/SharedStyling';
import heroAnimation from '@site/static/assets/website/hero/hero-animation.json';

export const WhatIsSection = () => {
  // Internationalization
  const { t, i18n } = useTranslation();

  const UniversalText = () => (
    <div aria-label={t('pages.home.whatis-section.heading-aria-label')}>
      <H2>{t('pages.home.whatis-section.titleFirst')}</H2>
      <H2 className='gradient-bg'>
        {t('pages.home.whatis-section.titleSecondGraditent')}
      </H2>
      <H2>{t('pages.home.whatis-section.titleThird')}</H2>
    </div>
  );

  const BottomSection = () => (
    <>
      <Span>{t('pages.home.whatis-section.bottomTextFirst')}</Span>
      <Span>{t('pages.home.whatis-section.bottomTextSecond')}</Span>

      <LearnMoreLink
        href='/docs'
        title={t('pages.home.whatis-section.bottomLinkTitle')}
        aria-label={t('pages.home.whatis-section.bottom-link-aria-label')}
        target='_self'
        border='none'
        fontSize='1.125rem'
        fontWeight='600'
        letterSpacing='-0.03em'
        lineHeight='140%'
        width='100%'
        color='var(--ifm-color-pink-400)'
      >
        {t('pages.home.whatis-section.bottomLinkText')}
        <TbArrowRight className='start-svg' />
      </LearnMoreLink>
    </>
  );

  return (
    <HeroWrapper>
      <HeroBG>
        <LottieContainer>
          <Lottie
            animationData={heroAnimation}
            loop={true}
            autoplay={true}
            title={t('pages.home.whatis-section.animation-title')}
            aria-label={t('pages.home.whatis-section.animation-alt')}
          />
        </LottieContainer>

        <MobileContent>
          <MobileTopText>
            <UniversalText />
          </MobileTopText>

          <MobileLottieContainer>
            <Lottie
              animationData={heroAnimation}
              loop={true}
              autoplay={true}
              title={t('pages.home.whatis-section.animation-title')}
              aria-label={t('pages.home.whatis-section.animation-alt')}
            />
          </MobileLottieContainer>

          <MobileBottomText>
            <BottomSection />
          </MobileBottomText>
        </MobileContent>

        <TopLeftText>
          <UniversalText />
        </TopLeftText>

        <BottomRightText>
          <BottomSection />
        </BottomRightText>
      </HeroBG>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const HeroBG = styled.div`
  position: relative;
  width: 100%;
  height: 780px;

  @media ${device.laptop} {
    height: 550px;
  }

  @media ${device.tablet} {
    height: auto;
  }
`;

const LottieContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  @media ${device.tablet} {
    display: none;
  }
`;

const MobileLottieContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1rem;
`;

const TopLeftText = styled.div`
  position: absolute;
  top: 1rem;
  left: 0rem;

  h2 {
    color: var(--ifm-color-white);
    font-family:
      DM Sans,
      sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -0.96px;
  }

  .gradient-bg {
    color: var(--ifm-color-custom-pink);
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const BottomRightText = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0rem;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    bottom: 0;
  }

  span {
    color: var(--ifm-color-white);
    font-family: DM Sans;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.4px;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const MobileContent = styled.div`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  // padding: 1rem;

  @media ${device.tablet} {
    display: flex;
  }
`;

const MobileTopText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    color: var(--ifm-color-white);
    font-family:
      DM Sans,
      sans-serif;
    font-size: 2rem;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -0.96px;
    margin: 0;
  }

  .gradient-bg {
    color: var(--ifm-color-custom-pink);
  }
`;

const MobileBottomText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  align-self: flex-end;

  span {
    color: var(--ifm-color-white);
    font-family: DM Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.4px;
  }
`;

const MobileImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 1rem;
`;

const LearnMoreLink = styled(A)`
  padding: 0px;
  font-family:
    DM Sans,
    sans-serif;
  height: auto;
  box-sizing: border-box;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin: 16px 0 0 0;
  background: transparent;

  &:hover {
    text-decoration: underline;
  }

  .start-svg {
    color: var(--ifm-color-pink-400);
    margin: 0;
  }

  @media ${device.laptopM} {
    align-self: stretch;
  }
`;
