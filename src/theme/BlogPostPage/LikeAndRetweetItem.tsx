// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
//
import React from 'react';
import styled from 'styled-components';

import { device } from '@site/src/config/globals';
import useMediaQuery from '@site/src/hooks/useMediaQuery';
import { H2, ItemH } from '@site/src/css/SharedStyling';
import { BsHeart, BsTwitterX } from 'react-icons/bs';
import Link from '@docusaurus/Link';

const LikeAndReTweetItem = () => {
  const isMobile = useMediaQuery(device.tablet);

  return (
    <ShareRow>
      <ResponsiveH2
        size={isMobile ? '1rem' : '1.25rem'}
        weight='500'
        spacing='-0.02em'
        lineHeight='110%'
        color='#00000'
      >
        If it’s worth reading, it’s worth sharing. Like and retweet.
      </ResponsiveH2>

      <ItemH justifyContent='flex-end' gap='8px'>
        <LikeButton title='Developer Docs' self={isMobile ? 'stretch' : 'self'}>
          <BsHeart
            size={22}
            color='var(--ifm-color-primary-text)'
            style={{ marginRight: '10px' }}
          />
          1.7k
        </LikeButton>

        <ShareButton title='Developer Docs'>
          <BsTwitterX
            size={22}
            color='var(--ifm-color-white)'
            style={{ marginRight: '10px' }}
          />
          Retweet
        </ShareButton>
      </ItemH>
    </ShareRow>
  );
};

const ResponsiveH2 = styled(H2)``;

const ShareRow = styled.div`
  margin: 50px 0 0px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
    margin-top: 52px;
    align-items: center;
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const ShareButton = styled(Link)`
  background: var(--ifm-color-custom-pink);
  border-radius: 16px;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  color: var(--ifm-color-white);
  align-self: ${(props) => props.self};

  @media ${device.mobileL} {
    width: 100%;
    margin: 20px;
  }
`;

const LikeButton = styled(Link)`
  background: transparent;
  border-radius: 16px;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1.5px solid var(--ifm-like-border-color);
  color: var(--ifm-color-primary-text);
  align-self: ${(props) => props.self};

  @media ${device.mobileL} {
    width: 100%;
    margin: 20px;
  }
`;

export default LikeAndReTweetItem;
