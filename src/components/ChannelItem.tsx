// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

// React + Web3 Essentials
import React, { useEffect, useRef } from 'react';

// External Components
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import VanillaTilt from 'vanilla-tilt';

// Internal Components

// Import Assets
import { Image } from '@site/src/css/SharedStyling';
import Encode from '@site/static/assets/website/frens-list/encode.png';
import Ethglobal from '@site/static/assets/website/frens-list/ethglobal.png';
import Fvm from '@site/static/assets/website/frens-list/fvm.png';
import Learnweb3dao from '@site/static/assets/website/frens-list/learnweb3.png';
import { BsArrowUpRight } from 'react-icons/bs';

const hackathonImage = (hackathon) => {
  switch (hackathon) {
    case 'Encode Next Video Build':
      return Encode;

    case 'ETHIndia2022':
    case 'ETHSF2022':
    case 'ETHBogota2022':
    case 'ETHOnline2022':
    case 'ETHNYC2022':
    case 'ETHAMS2022':
    case 'ETHforAll':
    case 'HackMoney2022':
    case 'ETHGlobal Istanbul':
      return Ethglobal;

    case 'LearnWeb3 challenge':
      return Learnweb3dao;

    case 'FVM2023':
      return Fvm;

    default:
      return null;
  }
};

const ItemDescription = ({ description }) => {
  const croppedDescription = description.split(' ').slice(0, 30).join(' ');
  const showEllipsis = description.split(' ').length > 30;

  return (
    <div className='description'>
      {croppedDescription}
      {showEllipsis && '...'}
    </div>
  );
};

export const Tilt = (props) => {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
};

const ChannelItem = ({ channelProp }, delay) => {
  const [channelObject, setChannelObject] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const imageBaseUrl = 'https://backend.epns.io';

  React.useEffect(() => {
    if (!channelProp) return;
    setChannelObject(channelProp);
    setLoading(false);
  }, [channelProp]);

  return (
    <Container
      href={
        channelObject.channel
          ? `https://app.push.org/channels/${channelObject.channel}`
          : channelObject.url
      }
      target='_blank'
    >
      {channelObject.icon || channelObject.imageFile ? (
        <ChannelTop>
          <ChannelLogo>
            {loading && <Skeleton height={100} width={100} borderRadius={20} />}
            {!loading && channelObject.icon && (
              <ChannelLogoImg
                src={
                  channelObject.icon.startsWith(imageBaseUrl)
                    ? channelObject.icon
                    : `${imageBaseUrl}/apis/v1/channels/icon/${channelObject.channel}`
                }
              />
            )}
            {!loading && channelObject.imageFile && (
              <MemberImage
                width={100}
                height={100}
                src={
                  require(
                    `@site/static/assets/website/frens-hackathon/${channelObject.imageFile}.png`
                  ).default
                }
                srcSet={
                  `${require(`@site/static/assets/website/frens-hackathon/${channelObject.imageFile}@2x.png`).default} 2x, ${require(`@site/static/assets/website/frens-hackathon/${channelObject.imageFile}@3x.png`).default} 3x` ||
                  ''
                }
              />
            )}
          </ChannelLogo>
        </ChannelTop>
      ) : null}

      <ArrowCont className='arrow-body'>
        <BsArrowUpRight size={25} color={'var(--ifm-color-black)'} />
      </ArrowCont>

      <ChannelTitle>
        <b>{channelObject.name}</b>
      </ChannelTitle>

      <ChannelDesc>
        {channelObject.info && (
          <ItemDescription description={channelObject.info} />
        )}
      </ChannelDesc>

      {channelObject?.type === 'Hackathons' ? null : (
        <ChannelType>
          <b>{channelObject?.type}</b>
        </ChannelType>
      )}
      {channelObject?.hackathon ? (
        <ChannelType>
          {/* hackathonImage(channelObject?.hackathon) */}
          <HackathonLogo src={hackathonImage(channelObject?.hackathon)} />
          <b>{channelObject?.hackathon}</b>
        </ChannelType>
      ) : null}
    </Container>
  );
};

const Container = styled.a`
  border: 1px solid #bac4d6;
  border-radius: 38.5px;
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  flex: 1;
  position: relative;
  &:hover {
    cursor: pointer;
    background: var(--ifm-color-overlay-white-70);
    border: 1px solid var(--ifm-color-border-medium);
    backdrop-filter: var(--ifm-color-backdrop-blur-heavy);
    .arrow-body {
      display: block;
    }
  }
  .arrow-body {
    display: none;
  }
`;

const ArrowCont = styled.div`
  // arrow container
  position: absolute;
  top: 12%;
  right: 8%;
`;

const ChannelTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelLogo = styled.div`
  max-width: 100px;
  min-width: 32px;
  margin-bottom: 30px;
`;

const ChannelLogoImg = styled.img`
  object-fit: contain;
  width: 100%;
  border: 1px solid #bac4d6;
  border-radius: 30.25px;
  overflow: hidden;
`;

const ChannelTitle = styled.b`
  font-weight: 500;
  font-size: 22px;
  line-height: 110%;
  letter-spacing: -0.03em;
  color: var(--ifm-color-neutral-1000);
`;

const ChannelDesc = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  color: var(--ifm-color-neutral-900);
  margin: 5px 0 0 0;

  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const ChannelType = styled.div`
  background: #ffdbf0;
  border-radius: 62px;
  font-weight: 500;
  font-size: 15px;
  line-height: 110%;
  letter-spacing: -0.03em;
  color: #333333;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: 7px 14px;
  margin-top: 7px;

  display: flex;
  align-items: center;
`;

const MemberImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  border: 1px solid #bac4d6;
  border-radius: 30.25px;
  overflow: hidden;
`;

const HackathonLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export default ChannelItem;
