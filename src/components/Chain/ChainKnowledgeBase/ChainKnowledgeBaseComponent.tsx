// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { device } from '../../../config/globals';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useModal from '../hooks/useModal';

import ImageHolder from '../../../../src/components/ImageHolder';
import { H1, H3, ItemH, ItemV, Span } from '../../../css/SharedStyling';
import ChainElevateModal from '../ChainElevateModal';

const ChainKnowledgeBaseComponent = () => {
  const isMobile = useMediaQuery(device.mobileL);
  const { isOpen, open, close } = useModal();

  const config = {
    title: 'Knowledge Base',
    description: () => (
      <>
        <SpanHighlighted>
          Push Chain is a true universal blockchain designed to eliminate
          fragmentation across all chains.
        </SpanHighlighted>
        <p />
        <b>Developers</b> deploy once and instantly become compatible with all
        supported EVM and non-EVM chains.
        <p />
        <b>Users</b> use the same app no matter the chain they come from.
      </>
    ),
    // video: {
    //   src: 'https://www.youtube.com/embed/0J2QdDbelmY',
    //   title: 'title',
    // },
    image: `knowledge-frame`,
  };

  return (
    <>
      <MainContentItemH>
        <ItemV justifyContent='flex-start'>
          <H1>{config.title}</H1>

          <Span>{config?.description()}</Span>
        </ItemV>

        <IFrameItem>
          <IFrameImage
            background={config?.image && '#F2C2FE'}
            borderRadius='32px'
          >
            {config?.video && (
              <iframe
                width={isMobile ? '100%' : '560px'}
                height={isMobile ? '100%' : '325px'}
                src={config.video.src}
                title={config.video.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            )}

            {config?.image && (
              <ImageHolder
                src={
                  require(
                    `@site/static/assets/website/chain/${config?.image}.webp`
                  ).default
                }
                srcSet={`${require(`@site/static/assets/website/chain/${config?.image}@2x.webp`).default} 2x, ${require(`@site/static/assets/website/chain/${config?.image}@3x.webp`).default} 3x`}
                alt={'alt'}
                title={'title'}
              />
            )}
          </IFrameImage>

          <IframeContent>
            <Span
              fontSize={isMobile ? '0.875rem' : '0.938rem'}
              fontWeight='400'
              lineHeight={isMobile ? '100%' : '132%'}
              letterSpacing='-0.64px'
              color='#BBBCD0'
              flex='1'
            >
              Craft seamless, user-friendly experiences for you app on any
              blockchain with Push Chain.
            </Span>
            <ButtonLink to='' onClick={open}>
              Get Notified about Testnet
            </ButtonLink>
          </IframeContent>
        </IFrameItem>
      </MainContentItemH>

      {/* modal */}
      <ChainElevateModal isOpen={isOpen} onClose={close} />
    </>
  );
};

export default ChainKnowledgeBaseComponent;

const MainContentItemH = styled(ItemH)`
  display: flex;
  align-items: center;
  gap: 128px;
  justify-content: space-between;
  flex: 1;

  @media ${device.laptop} {
    gap: 80px;
  }

  @media ${device.tablet} {
    gap: 48px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    gap: 32px;
    justify-content: flex-start;
    align-items: center;
  }
`;

const IFrameImage = styled(ItemH)`
  aspect-ratio: 16/9;
`;

const IFrameItem = styled.div`
  padding: 16px 0px 0px 0px;
  background: #101010;
  display: flex;
  border-radius: 40px;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  min-width: 350px;
  flex: 1;

  iframe {
    border-radius: 24px;
  }

  @media ${device.tablet} {
    min-width: 300px;
    flex-grow: 1;
    align-self: center;
    padding: 0;
  }

  @media ${device.mobileL} {
    min-width: 100%;
  }
`;

const IframeContent = styled.div`
  display: grid;
  margin: 16px 0 0 0;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;

  @media ${device.laptopM} {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const ButtonLink = styled.a`
  text-align: center;
  font-size: 1rem;
  color: #fff;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 16px;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #d548ec;
  line-height: 180.513%;
  width: 100%;

  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;

const SpanHighlighted = styled.span`
  color: color-mix(
    in srgb,
    var(--ifm-color-primary-unified) 25%,
    var(--ifm-color-primary-unified-inverse) 75%
  );

  b {
    color: color-mix(
      in srgb,
      var(--ifm-color-primary-unified) 25%,
      var(--ifm-color-primary-unified-inverse) 75%
    );
  }
`;
