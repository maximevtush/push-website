// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import { FC } from 'react';
import styled from 'styled-components';

// External Components
import { TbArrowUpRight } from 'react-icons/tb';

// Internal Component
import useMediaQuery from '@site/src/hooks/useMediaQuery';
import { useSiteBaseUrl } from '@site/src/hooks/useSiteBaseUrl';

import { H3, Image, ItemH, P, Span } from '@site/src/css/SharedStyling';

import ItemStylizing from './ItemStylizing/ItemStylizing';

// Internal Configs
import { device } from '@site/src/config/globals';

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const ExploreCard: FC = ({ item, index, variant = 'tile' }) => {
  // for navigation
  const isMobile = useMediaQuery(device.mobileL);
  const baseURL = useSiteBaseUrl() || '';

  const getHref = (item: any) => {
    if (!item?.url && !item?.slug) return '#';

    if (item.url?.startsWith('https://') || item.url?.startsWith('http://')) {
      return item.url;
    } else if (item.url?.startsWith('/')) {
      return `${baseURL}${item.url}`;
    } else if (item.parentSlug) {
      return `${baseURL}/knowledge/${item.parentSlug}/${item.slug}`;
    } else {
      return `${baseURL}/knowledge/${item.url || item.slug}`;
    }
  };

  return (
    <Card
      key={index}
      padding='24px'
      alignItems='flex-start'
      borderRadius='32px'
      justifyContent='space-between'
      bgImage={variant === 'tile' ? item.bgImage : ''}
      bgColor={variant === 'tile' ? item.bgColor : '#101010'}
      href={getHref(item)}
      rel='noopener'
      target={item?.target ? item?.target : '_self'}
      variant={variant}
    >
      {variant === 'tile' && item.bgStylizing && (
        <ItemStylizing {...item.bgStylizing} />
      )}

      {variant === 'tile' && (
        <TileImage customWidth={item.customWidth}>
          <Image
            src={item.image}
            srcSet={`${item.image2x} 2x, ${item.image3x} 3x`}
            alt={`Image for ${item.title}`}
            loading='lazy'
            className='pulse-logo'
          />
        </TileImage>
      )}

      {item?.image && variant === 'row' && (
        <KnowledgeImage
          src={
            require(
              `@site/static/assets/website/chain/knowledge/${item?.image}.webp`
            ).default
          }
          alt={item?.title}
          title={item?.title}
          variant={variant}
        />
      )}

      {item?.imageDirectory && variant === 'row' && (
        <KnowledgeImage
          src={item.imageDirectory}
          alt={item?.title}
          title={item?.title}
          variant={variant}
        />
      )}

      {!item?.image && !item?.imageDirectory && variant === 'tile' && (
        <div
          style={{
            height: 'auto',
            width: '100%',
            backgroundColor: '#D9D9D9',
            borderRadius: '24px',
            aspectRatio: '16/9',
          }}
        ></div>
      )}

      <ItemH
        flex={variant === 'row' ? '1' : '0'}
        justifyContent='flex-start'
        alignItems='center'
        margin={variant === 'tile' ? 'auto 0 0 0' : '0'}
      >
        <TitleH3
          variant={variant}
          fontSize='1.8rem'
          fontWeight='500'
          lineHeight={isMobile ? '100%' : '150%'}
          letterSpacing='-0.64px'
          flex='1'
        >
          {item?.title}
        </TitleH3>
      </ItemH>

      {variant === 'row' && (
        <RowLinkArrow flex='0' alignItems='center' justifyContent='center'>
          <TbArrowUpRight color='#D548EC' size={24} />
        </RowLinkArrow>
      )}

      {variant === 'tile' && (
        <>
          <ItemH
            alignItems='flex-start'
            alignSelf='flex-start'
            flex={variant === 'row' ? '1' : '0'}
          >
            <P
              fontSize='1.125rem'
              fontWeight='400'
              lineHeight='133%'
              letterSpacing='-0.64px'
              color={variant === 'tile' ? '#FFF' : '#757D8D'}
              fontFamily='DM Sans'
              margin='0'
            >
              {item?.subtitle}
            </P>
          </ItemH>

          <LinkContainer
            alignItems='center'
            justifyContent='space-between'
            margin='28px 0 0 0'
            cursor='pointer'
            flex='0'
            className='hover-link'
          >
            <Span
              fontSize='1.125rem'
              fontWeight='500'
              lineHeight={isMobile ? '100%' : '140%'}
              letterSpacing='-0.64px'
              color='#fff'
            >
              {item?.ctatitle ? item?.ctatitle : 'Read More'}
            </Span>
            <TbArrowUpRight color='#fff' size={24} />
          </LinkContainer>
        </>
      )}
    </Card>
  );
};

const Card = styled.a`
  cursor: pointer;
  padding: ${(props) => (props.variant === 'row' ? '16px' : '24px')};
  border-radius: ${(props) => (props.variant === 'row' ? '24px' : '32px')};
  background: ${(props) => props.bgColor || props.background};
  display: flex;
  flex-direction: ${(props) => (props.variant === 'row' ? 'row' : 'column')};
  gap: ${(props) => (props.variant === 'row' ? '24px' : '0px')};
  align-items: ${(props) =>
    props.variant === 'row' ? 'center' : 'flex-start'};

  min-height: ${(props) => (props.variant === 'row' ? 'auto' : '420px')};
  background-image: ${({ bgImage }) => (bgImage ? `url(${bgImage})` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  justify-content: ${(props) =>
    props.variant === 'tile' ? 'space-between' : ''};
  overflow: hidden;
  position: relative;

  @media ${device.mobileL} {
    flex-direction: ${(props) =>
      props.variant === 'row' ? 'column' : 'column'};
    gap: ${(props) => (props.variant === 'row' ? '16px' : '0px')};
    align-items: ${(props) =>
      props.variant === 'row' ? 'flex-start' : 'flex-start'};
  }

  &:focus,
  &:active {
    outline: none;
    background: ${(props) =>
      props.variant === 'row' ? '#101010' : props.bgColor || props.background};
    background-image: ${({ bgImage }) =>
      bgImage ? `url(${bgImage})` : 'none'};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: inherit;
  }

  &:hover {
    H3 {
      color: ${(props) =>
        props.variant === 'row'
          ? 'var(--ifm-link-color)'
          : 'var(--ifm-color-primary-unified-text)'};
    }
  }

  user-select: none;
  * {
    user-select: none;
  }
`;

const TileImage = styled.div`
  padding: 16px;
  border-radius: var(--radius-lg, 32px);
  border: 1px solid rgb(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.05);
  background-blend-mode: lighten;
  box-shadow:
    2.788px 2.598px 12px 0px rgba(255, 255, 255, 0.15) inset,
    1.858px 1.732px 6px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(4px);
  width: 148px;
  height: 148px;
  display: flex;
  justify-content: center;
  align-items: center;

  .pulse-logo {
    height: auto;
    width: ${({ customWidth }) => customWidth || '90px'};
    z-index: 99999;
  }
`;

const KnowledgeImage = styled(Image)`
  width: ${(props) => (props.variant === 'row' ? 'auto' : '100%')};
  min-height: ${(props) => (props.variant === 'row' ? '78px' : 'auto')};
  max-height: ${(props) => (props.variant === 'row' ? '78px' : '100%')};
  aspect-ratio: 16/9;
  border-radius: ${(props) => (props.variant === 'row' ? '12px' : '24px')};

  @media ${device.mobileL} {
    width: ${(props) => (props.variant === 'row' ? '100%' : '100%')};
    max-height: ${(props) => (props.variant === 'row' ? 'none' : '100%')};
  }
`;

const TitleH3 = styled(H3)`
  color: ${(props) => (props.variant === 'row' ? '#FFF' : '#FFF')};

  @media ${device.tablet} {
    font-size: 1.5rem;
  }
`;

const RowLinkArrow = styled(ItemH)`
  @media ${device.mobileL} {
    display: none;
  }
`;

const LinkContainer = styled(ItemH)`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  margin-top: 0;

  ${Card}:hover & {
    max-height: 50px;
    opacity: 1;
    transform: translateY(0);
    margin-top: 28px;
  }
`;

export default ExploreCard;
