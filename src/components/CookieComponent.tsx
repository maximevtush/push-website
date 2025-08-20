// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import GLOBALS, { device } from '@site/src/config/globals';
import {
  A,
  Button,
  H2,
  Image,
  ItemH,
  ItemV,
  Section,
} from '@site/src/css/SharedStyling';
import useMediaQuery from '@site/src/hooks/useMediaQuery';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CookieComponent = () => {
  const [cookies, setCookie] = useCookies(['pushCookies']);
  const [showModal, setShowModal] = useState(
    () => cookies.pushCookies === undefined
  );
  const { t } = useTranslation();

  const handleAccept = () => {
    setCookie('pushCookies', true, { path: '/' });
    setShowModal(false);
  };

  const handleReject = () => {
    setCookie('pushCookies', false, {
      path: '/',
    });
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <CookieContainer
          role='dialog'
          aria-label={t('components.cookie-banner.banner-aria-label')}
          aria-describedby='cookie-message'
        >
          <H2
            id='cookie-message'
            color='var(--ifm-color-black)'
            fontWeight='400'
            letterSpacing='normal'
            fontSize={'14px'}
            fontFamily='DM Sans'
            lineHeight='130%'
            textAlign='left'
          >
            {t('components.cookie-banner.message')}{' '}
            <a
              href='https://push.org/privacy'
              target='_blank'
              rel='noopener'
              style={{ textDecoration: 'underline' }}
              title={t('components.cookie-banner.privacy-policy-link-title')}
              aria-label={t(
                'components.cookie-banner.privacy-policy-link-aria-label'
              )}
            >
              {t('components.cookie-banner.privacy-policy-link')}
            </a>
            .
          </H2>

          <ButtonContainer>
            <AcceptButton
              onClick={handleAccept}
              title={t('components.cookie-banner.accept-button-title')}
              aria-label={t(
                'components.cookie-banner.accept-button-aria-label'
              )}
            >
              {t('components.cookie-banner.accept-button')}
            </AcceptButton>
            <RejectButton
              onClick={handleReject}
              title={t('components.cookie-banner.reject-button-title')}
              aria-label={t(
                'components.cookie-banner.reject-button-aria-label'
              )}
            >
              {t('components.cookie-banner.reject-button')}
            </RejectButton>
          </ButtonContainer>
        </CookieContainer>
      )}
    </>
  );
};

const CookieContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 344px;
  z-index: 999999999999;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.10);
  backdrop-filter: blur(12px);

  h2 {

  a {
    color: black;

    &:hover {
      text-decoration: underline;
    }
  }
}

  @media ${device.mobileL} {
      width: calc(100% - 32px);
      left: 16px
      bottom: 16px;
      right: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;
`;

const AcceptButton = styled(Button)`
  color: var(--ifm-color-white);
  border: none;
  height: 48px;
  width: 104px;
  padding: 0px;
  border-radius: 4px;
  cursor: pointer;
  border-radius: 8px;
  background: var(--ifm-color-custom-pink);
  font-size: 14px;
  font-weight: 500;
`;

const RejectButton = styled(Button)`
  background-color: transparent;
  color: var(--ifm-color-black);
  border: none;
  height: 48px;
  width: 104px;
  padding: 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: transparent !important;
  }
`;
export default CookieComponent;
