// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Import components
import { FloatingEmoji } from '@site/src/components/FloatingEmoji';
import { Content, H1, ItemV, Section, Span } from '@site/src/css/SharedStyling';

// Import device breakpoints
import { device } from '@site/src/config/globals';

// Import tweet data
import { LFPushTweetsList } from '@site/src/config/LFPushTweetsList';

function LFPush() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.lfpush.seo.title')}
      description={t('pages.lfpush.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/chain/knowledge' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.lfpush.seo.og-title')} />
        <meta
          name='og:description'
          content={t('pages.lfpush.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/lfpushpreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Update Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.lfpush.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.lfpush.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/lfpushpreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      {/* Floating Emoji Animation */}
      <FloatingEmoji
        interval={12000}
        stayDuration={3000}
        minSize={8}
        maxSize={20}
        enabled={true}
      />

      <SkeletonWrapper>
        {/* Heading + Tweets Section */}
        <Section>
          {/* Heading Content */}
          <Content className='skeletonsmall'>
            {/* Heading Content */}
            <ItemV alignItems='flex-start'>
              <H1>Let's Push</H1>
              <Span color='var(--ifm-color-primary-unified-text)'>
                The LF Push builders community—celebrating what you ship and who
                you help. Share your wins, tag{' '}
                <Span color='var(--ifm-link-color)'>
                  <strong>#LFPush</strong>
                </Span>{' '}
                or{' '}
                <Span color='var(--ifm-link-color)'>
                  <strong>@PushChain</strong>
                </Span>
                , and we’ll amplify.
              </Span>
            </ItemV>
            {/* Tweets Content */}
            <ItemV padding='60px 0px 0px 0px'>
              <TweetsGrid>
                {LFPushTweetsList.map((tweetUrl, index) => (
                  <TweetCard key={index} tweetUrl={tweetUrl} />
                ))}
              </TweetsGrid>
            </ItemV>{' '}
          </Content>
        </Section>
      </SkeletonWrapper>
    </Layout>
  );
}

// Tweet Card Component
interface TweetCardProps {
  tweetUrl: string;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweetUrl }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  // Extract tweet ID and username from URL
  const tweetId = tweetUrl.split('/').pop() || '';
  const username = tweetUrl.split('/')[3] || 'user';

  // Create Twitter embed URL
  const embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&chrome=nofooter,noheader,noborders&dnt=true`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <TweetWrapper $isLoading={isLoading}>
      {isLoading && (
        <SkeletonContent>
          <SkeletonHeader>
            <SkeletonAvatar
              src='/assets/website/brand/logo-512.png'
              alt='Push Protocol'
            />
            <SkeletonInfo>
              <SkeletonName>
                @{username}
                <VerifiedBadge>✓</VerifiedBadge>
              </SkeletonName>
              <SkeletonUsername>Loading tweet...</SkeletonUsername>
            </SkeletonInfo>
            <SkeletonTimestamp></SkeletonTimestamp>
          </SkeletonHeader>

          <SkeletonText>
            <SkeletonLine width='90%' />
            <SkeletonLine width='75%' />
            <SkeletonLine width='60%' />
          </SkeletonText>

          <SkeletonActions>
            <SkeletonAction />
            <SkeletonAction />
            <SkeletonAction />
          </SkeletonActions>
        </SkeletonContent>
      )}

      <TweetEmbed
        src={embedUrl}
        title={`Tweet ${tweetId}`}
        frameBorder='0'
        scrolling='yes'
        allowTransparency={true}
        onLoad={handleIframeLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </TweetWrapper>
  );
};

// Styled Components
const SkeletonWrapper = styled(ItemV)`
  background: #000;
  font-family:
    DM Sans,
    sans-serif;
`;

const TweetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 64px;
  width: 100%;
  align-items: start;

  @media ${device.laptop} {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 48px;
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const TweetWrapper = styled.div<{ $isLoading: boolean }>`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 0;
  transition: all 0.3s ease;
  overflow: hidden;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  /* Conditional height - skeleton shows natural content height, loaded shows auto */
  ${(props) =>
    props.$isLoading
      ? `
      height: auto;
    `
      : `
      height: auto;
    `}

  &:hover {
    border-color: #aa39bc;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(170, 57, 188, 0.15);
  }
`;

const TweetEmbed = styled.iframe`
  width: 100%;
  height: auto;
  min-height: 400px;
  max-height: none;
  border: none;
  background: transparent;
  display: block;
  flex: 1;

  @media ${device.tablet} {
    min-height: 350px;
  }

  @media ${device.mobileL} {
    min-height: 300px;
  }
`;

// Skeleton Loading Components
const SkeletonContent = styled.div`
  padding: 16px;
  background: #1a1a1a;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const SkeletonAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid #aa39bc;
`;

const SkeletonInfo = styled.div`
  flex: 1;
`;

const SkeletonName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #fff;
  font-size: 15px;
`;

const VerifiedBadge = styled.span`
  color: #1da1f2;
  margin-left: 4px;
  font-size: 14px;
`;

const SkeletonUsername = styled.div`
  color: #8b949e;
  font-size: 14px;
  margin-top: 2px;
`;

const SkeletonTimestamp = styled.div`
  width: 60px;
  height: 14px;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
`;

const SkeletonText = styled.div`
  margin-bottom: 16px;
`;

const SkeletonLine = styled.div<{ width: string }>`
  height: 16px;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
  width: ${(props) => props.width};
`;

const SkeletonActions = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  padding-top: 12px;
  border-top: 1px solid #333;
`;

const SkeletonAction = styled.div`
  width: 60px;
  height: 20px;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 10px;
`;

// Shimmer animation
const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Add shimmer styles to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}

export default LFPush;
