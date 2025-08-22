/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

// React + Web3 Essentials
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import React, { useState } from 'react';
import './styles.css';

// External Components
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';

// Internal Components
import {
  A,
  Button,
  Content,
  H1,
  H2,
  H3,
  Image,
  ItemH,
  ItemV,
  Section,
  Span,
} from '@site/src/css/SharedStyling';
import Footer from '../../segments/Footer';

// Import Assets
import ArrowUp from '@site/static/assets/docs/ArrowUpRight-pink.svg';
import { FiArrowUpRight } from 'react-icons/fi';

// Internal Configs
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Spinner, {
  SPINNER_TYPE,
} from '@site/src/components/reusables/spinners/SpinnerUnit';
import {
  ITechDocItem,
  QuickstartItems,
  SdkItemsList,
  TechDocItems,
} from '@site/src/config/DocsHubList';
import GLOBALS, { device } from '@site/src/config/globals';
import useMediaQuery from '@site/src/hooks/useMediaQuery';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';
import { useCountdown } from '@site/src/hooks/useCountDown';

function QuickstartList({ title, codeblock, Svg }: IQuickstartItem) {
  return (
    <PopularQuickiesCard>
      <PopularQuickiesHeader>
        <PopularQuickiesTitle>{`${title}`}</PopularQuickiesTitle>
      </PopularQuickiesHeader>

      <PopularQuickiesContent>
        <PopularQuickiesCodeBlock language='jsx' showLineNumbers={true}>
          {codeblock}
        </PopularQuickiesCodeBlock>
      </PopularQuickiesContent>
    </PopularQuickiesCard>
  );
}

function TechDocItem({
  title,
  srcref,
  alt,
  description,
  codeblock,
  link,
  target,
  docutheme,
}: ITechDocItem) {
  const [content, setContent] = useState<number>(0);
  const baseUrl = useSiteBaseUrl();

  const handleOpenLink = (e, link: { e: any; link: string }) => {
    if (!link) return;

    // Check if link is an absolute URL (starts with http or https)
    const isAbsoluteUrl = /^https?:\/\//i.test(link);

    // If the link is not an absolute URL and baseUrl is defined, prepend the baseUrl
    const fullLink = isAbsoluteUrl ? link : baseUrl ? baseUrl + link : link;
    console.log(
      fullLink,
      isAbsoluteUrl ? 'absolute link' : 'full link with baseUrl'
    );

    // Navigate to the constructed fullLink or the absolute link
    target === '_self'
      ? (window.location.href = fullLink)
      : window.open(fullLink, target);
  };

  return (
    <TechDocCard>
      {/* <Link to={link} target='_blank'> */}
      <TechDocContent
        onClick={(e) => handleOpenLink(e, link)}
        hoverBackground='transparent'
      >
        <ItemV alignSelf='stretch' margin='0px 8%'>
          <ItemV padding='0px 0px 30px 0px' alignItems='flex-start'>
            <TechDocIcon docutheme={docutheme}>
              <Image
                src={
                  require(`@site/static/assets/docs/docshub/${srcref}.webp`)
                    .default
                }
                srcSet={`${require(`@site/static/assets/docs/docshub/${srcref}@2x.webp`).default} 2x, ${require(`@site/static/assets/docs/docshub/${srcref}@3x.webp`).default} 3x`}
                alt={`${alt}`}
              />
            </TechDocIcon>
            <TechDocTitle>{title}</TechDocTitle>
          </ItemV>

          {codeblock && (
            <TechDocSwitcher gap='10px'>
              <TechDocButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setContent(0);
                }}
                background={
                  content == 0
                    ? 'var(--ifm-color-primary)'
                    : 'var(--ifm-color-background)'
                }
                color={
                  content == 0
                    ? 'var(--ifm-color-primary-inverse)'
                    : 'var(--ifm-color-content)'
                }
              >
                Overview
              </TechDocButton>
              <TechDocButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setContent(1);
                }}
                background={
                  content == 1
                    ? 'var(--ifm-color-primary)'
                    : 'var(--ifm-color-background)'
                }
                color={
                  content == 1
                    ? 'var(--ifm-color-primary-inverse)'
                    : 'var(--ifm-color-content)'
                }
              >
                API
              </TechDocButton>
            </TechDocSwitcher>
          )}

          <ItemV alignItems='stretch'>
            {content == 0 && <TechDocOverview>{description}</TechDocOverview>}
          </ItemV>
        </ItemV>

        {content == 1 && codeblock && (
          <Div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <TechDocCodeBlock language='jsx'>{codeblock}</TechDocCodeBlock>
          </Div>
        )}
      </TechDocContent>
    </TechDocCard>
  );
}

export default function DocsHub(): JSX.Element {
  // Internationalization
  const { t } = useTranslation();
  const isMobile = useMediaQuery(device.mobileL);

  // TODO: add correct testnet launch date
  const targetDate = '2025-09-31T23:59:59';
  const { timeLeft, isExpired } = useCountdown(targetDate);
  const tweetUrl =
    'https://twitter.com/intent/tweet?text=' +
    encodeURIComponent('[ Your shoutout here ] #pushchainsecret');

  const { colorMode, setColorMode } = useColorMode();

  return (
    <Layout
      title={t('pages.docs.seo.title')}
      description={t('pages.docs.seo.description')}
      showNavbar={false}
    >
      <Head>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/docs' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.docs.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.docs.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/docspreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.docs.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.docs.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/docspreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      <DocsWrapper>
        {/* DOCS HERO SECTION */}
        <DocsHeroSection>
          <ItemV
            position='absolute'
            top='-149px'
            left='0'
            right='0'
            height='149px'
            background={'var(--ifm-color-primary-inverse)'}
          ></ItemV>
          <Content padding='0px'>
            <DocsHeader>
              <Image
                src={
                  require(
                    `@site/static/assets/website/docshub/Testnet-Docs-img.webp`
                  ).default
                }
                srcSet={`${require(`@site/static/assets/website/docshub/Testnet-Docs-img@2x.webp`).default} 2x, ${require(`@site/static/assets/website/docshub/Testnet-Docs-img@3x.webp`).default} 3x`}
                alt={`${t('pages.home.trustedby-section.trusted-by-alt')}}`}
              />

              <H3
                fontFamily='DM Sans'
                fontSize={isMobile ? '2rem' : '3rem'}
                fontWeight='600'
                color='var(--ifm-color-white)'
                lineHeight='125%'
                textAlign='center'
              >
                Testnet Docs Launch in
              </H3>

              {!isExpired && (
                <H3
                  fontFamily='DM Sans'
                  fontSize={isMobile ? '3rem' : '4rem'}
                  fontWeight='500'
                  color='var(--ifm-color-white)'
                  lineHeight='110%'
                  textAlign='center'
                >
                  {timeLeft.days}H : {timeLeft.hours}H : {timeLeft.minutes}M :{' '}
                  {timeLeft.seconds}S
                </H3>
              )}

              <TextSpan
                fontFamily='DM Sans'
                fontSize='1.25rem'
                fontWeight='400'
                color='var(--ifm-color-white)'
                lineHeight='140%'
              >
                Psst... want a sneak peek of Testnet Donut? Drop us a shout with
                #pushchainsecret and we’ll send you access to a test build.
              </TextSpan>

              <ExplorePrelaunchBuild
                background='var(--ifm-color-custom-pink)'
                borderRadius='16px'
                border='1px solid var(--ifm-color-overlay-white-30)'
                fontSize='1.125rem'
                fontWeight='600'
                letterSpacing='-0.03em'
                lineHeight='1rem'
                padding='16px 32px'
                href={tweetUrl}
                target='_blank'
                title={t('pages.docs.explore-prelaunch-build.title')}
                aria-label={t('pages.docs.explore-prelaunch-build.ariaLabel')}
              >
                <p>Tweet about Push Chain</p>
              </ExplorePrelaunchBuild>
            </DocsHeader>
          </Content>
        </DocsHeroSection>

        <Footer showPattern={false} />
      </DocsWrapper>
    </Layout>
  );
}

const DocsWrapper = styled.div`
  @media (min-width: 1800px) {
    min-height: 100vh;
    background: var(--ifm-color-primary-inverse);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const TextSpan = styled(Span)`
  max-width: 774px;
`;

const DocsHeroSection = styled(Section)`
  background: var(--ifm-color-primary-inverse);
  // background: ${GLOBALS.COLORS.BG_DARK};

  padding: ${GLOBALS.STRUCTURE.PADDING.DESKTOP};
  padding-top: 0px;
  padding-bottom: 0px;

  @media ${device.laptop} {
    padding: ${GLOBALS.STRUCTURE.PADDING.TABLET};
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media ${device.mobileM} {
    padding: ${GLOBALS.STRUCTURE.PADDING.MOBILE};
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const DocsHeader = styled(ItemV)`
  background: var(--ifm-color-blue);
  border-radius: 24px;
  padding: 64px 24px;
  margin: 24px 0 64px 0;

  img {
    width: 700px;
    height: auto;
    object-fit: cover;
  }

  span {
    text-align: center;
  }
`;

const ExplorePrelaunchBuild = styled(A)`
  margin-top: 24px;

  p {
    margin: 0;
  }
`;

const HeroHeader = styled(ItemV)`
  padding: 2rem 0 5.5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  & ${H1} {
    font-size: var(--ifm-h1-font-size);
    text-align: center;
  }
`;

const HeroButton = styled(Button)`
  cursor: ${(props) => (props.disabled ? 'not-allowed !important' : 'pointer')};
  align-items: center;
  background-color: var(--ifm-color-custom-pink);
  border-radius: 16px;
  color: var(--ifm-color-white);
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  padding: 12px 30px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
    color: var(--ifm-color-white);
  }
`;

const pulseStaticAnim = keyframes`
  100% {
    opacity: 0.25;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
  }
`;

const PulseStatic = styled.div`
  width: 40px;
  height: 40px;
  background: var(--ifm-color-black);
  border-radius: 50%;
  position: absolute;
  animation: ${pulseStaticAnim} 5s ease-out forwards;
  z-index: 2;
`;

const Pulse = styled.div`
  width: 40px;
  height: 40px;
  // background: var(--ifm-color-primary-preferred);
  background: rgba(213, 72, 236, 0.4);
  border-radius: 50%;
  position: relative;
`;

const pulsateAnim = keyframes`
  100% {
    opacity: 0;
    transform: scale(12);
  }
`;

const Pulsate = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  opacity: 0.8;
  animation: ${pulsateAnim} 6s ease-out infinite;
  animation-delay: calc(1s * ${(props) => (props.stagger ? props.stagger : 1)});
`;

const TechDocIcon = styled(ItemV)`
  align-self: flex-start;

  & ${Image} {
    filter: ${(props) => (props.docutheme === 'dark' ? 'invert(100%)' : '')};

    height: 44px;
    width: auto;
    margin: 0 0 1rem 0;
  }
`;

const FluidContent = styled(Content)`
  align-self: center;
  width: 68%;
  max-width: initial;
  padding-top: 0px;
  padding-bottom: 0px;

  @media ${device.laptopL} {
    width: 100%;
    box-sizing: border-box;
  }
`;

const HomepageSection = styled(Section)`
  margin-top: 70px;
  margin-bottom: 30px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const HomepageSubHeader = styled(H2)`
  font-family: var(--ifm-font-family-base);
  font-weight: 600;
  font-size: 36px;
  align-items: start;
  margin-bottom: 30px;
  flex: 1;

  color: var(--ifm-color-primary-text);
`;

const PopularQuickiesList = styled(ItemH)`
  gap: 32px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  position: relative;
`;

const PopularQuickiesCard = styled(ItemV)`
  margin: 0px;
  align-self: flex-start;
  flex: 1;
  overflow: auto;
  width: 100%;

  /* WebKit browsers (Chrome, Safari) */
  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--ifm-color-pink-300);
    border-radius: 6px;
  }

  *::-webkit-scrollbar-track {
    background: var(--ifm-color-neutral-100);
  }

  *::-webkit-scrollbar-button {
    display: none !important;
  }

  /* Firefox */
  * {
    scrollbar-color: var(--ifm-color-pink-300) var(--ifm-color-neutral-100);
    scrollbar-width: thin;
  }

  box-sizing: border-box;

  @media ${device.laptop} {
    flex: 1;
    max-width: initial;
  }
`;

const PopularQuickiesHeader = styled(ItemH)`
  align-items: center;
  font-size: 20px;
  background: #282a36;
  justify-content: flex-start;
  padding: 10px 20px 14px 80px;
  margin-bottom: -6px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  position: relative;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    height: 0.6em;
    width: 0.6em;
    margin: 0.3em;
    left: 0.5em;
    border-radius: 100%;
    background: #4a4a4a;
    box-shadow:
      1em 0em #4a4a4a,
      2em 0em #4a4a4a;
    transition: all 0.3s ease-in-out;
  }

  &:hover:before {
    background: rgba(255, 0, 0, 0.8);
    box-shadow:
      1em 0em rgba(255, 255, 0, 0.8),
      2em 0em rgba(0, 255, 0, 0.8);
  }
`;

const PopularQuickiesTitle = styled(Span)`
  color: var(--ifm-color-docs-title);
  font-size: 16px;
  font-weight: bold;
`;

const PopularQuickiesContent = styled(ItemV)`
  border-top: 1px solid var(--ifm-color-docs-border);
  align-items: stretch;
  width: 100%;
`;

const PopularQuickiesCodeBlock = styled(CodeBlock)`
  margin: 0px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
  width: inherit;
`;

const TechDocCardList = styled(ItemH)`
  gap: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TechDocCard = styled(ItemV)`
  margin: 0px;
  align-self: flex-start;
  flex: 0 0 calc(33.33% - 21.33px);
  min-width: 280px;
  max-width: calc(33.33% - 21.33px);
  box-sizing: border-box;
  justify-content: flex-start;

  @media ${device.laptop} {
    flex: 1;
    max-width: initial;
  }
`;

const TechDocContent = styled.div`
  margin-top: 24px;
  position: relative;
  border-radius: 24px;
  padding: 40px 20px;
  border: 1px solid var(--ifm-color-tech-doc-border);
  background: transparent;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  cursor: pointer;

  & svg path {
    stroke: var(--ifm-color-primary-text);
  }

  &:hover {
    border: 1px solid var(--ifm-color-primary-preferred);

    & ${Image} {
      filter: invert(36%) sepia(21%) saturate(4402%) hue-rotate(291deg)
        brightness(89%) contrast(94%);
    }
  }
`;

const TechDocTitle = styled(Span)`
  font-family: var(--ifm-font-family-base);
  font-size: 26px;
  color: var(--ifm-color-primary-text);
  margin-top: 0px;
  font-weight: bold;
  letter-spacing: -0.03em;
`;

const TechDocSwitcher = styled(ItemH)`
  position: absolute;
  top: 0;
  right: 0;
  padding: inherit;
`;

const TechDocButton = styled(Button)`
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 600;
`;

const TechDocOverview = styled(Span)`
  font-family: var(--ifm-font-family-base);
  font-weight: 400;
  font-size: 16px;
  color: var(--ifm-color-secondary-text);
  margin-top: -10px;
  letter-spacing: -0.02em;
  line-height: 150%;
`;

const TechDocCodeBlock = styled(CodeBlock)`
  font-size: 14px;
  margin: 0px 10px;
  align-self: stretch;
  text-align: initial;
  overflow: auto;
  max-width: 100%;

  /* WebKit browsers (Chrome, Safari) */
  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--ifm-color-pink-300);
    border-radius: 6px;
  }

  *::-webkit-scrollbar-track {
    background: var(--ifm-color-neutral-100);
  }

  *::-webkit-scrollbar-button {
    display: none !important;
  }

  /* Firefox */
  * {
    scrollbar-color: var(--ifm-color-pink-300) var(--ifm-color-neutral-100);
    scrollbar-width: thin;
  }
`;

const PushSdkCardList = styled(ItemH)`
  gap: 32px;
  margin-top: 30px;
  margin-bottom: 70px;
  align-items: center;
`;

const PushSdkCard = styled(ItemH)`
  align-self: flex-start;
  flex: 0 0 calc(33.33% - 21.33px);
  min-width: 250px;
  max-width: calc(33.33% - 21.33px);

  @media ${device.laptop} {
    flex: 1;
    max-width: initial;
  }
`;

const PushSdkContent = styled(A)`
  color: var(--ifm-color-primary-text);
  background: var(--ifm-color-primary-inverse);
  align-items: stretch;
  display: flex;
  justify-content: stretch;
  align-self: stretch;
  border: 1px solid var(--ifm-color-tech-doc-border);
  width: 100%;
  padding: 24px;

  & svg {
    color: var(--ifm-color-tech-doc-border);
  }

  &:after {
    background: transparent;
  }

  &:hover {
    border: 1px solid var(--ifm-color-primary-preferred);

    & svg {
      color: var(--ifm-color-primary-preferred);
    }
  }
`;

const PushSdkContentTitle = styled(Span)`
  font-family: var(--ifm-font-family-base);
  font-size: 26px;
  color: var(--ifm-color-primary-text);
  margin-top: 0px;
  font-weight: bold;
  letter-spacing: -0.03em;
  flex: 1;
`;

const PushSdkContentArrow = styled(Span)`
  display: flex;
  align-items: center;
`;
const Div = styled.div``;
