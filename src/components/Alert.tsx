/* eslint-disable */
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { FiArrowUpRight } from 'react-icons/fi';
import styled from 'styled-components';

// Internal Components
import { ItemH, Section } from '@site/src/css/SharedStyling';

// Internal Configs
import { device } from '@site/src/config/globals';

// turn alert to false to disable this
export const Alert = () => {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const { t } = useTranslation();

  // Prevent rendering during SSR
  if (typeof window === 'undefined') return null;

  const hideAlertHandler = () => {
    setIsAlertVisible(false);
  };

  const alertLink = `https://snaps.metamask.io/snap/npm/pushprotocol/snap/`;

  return (
    <Section>
      {isAlertVisible && (
        <AlertContainer
          role='alert'
          aria-label={t('notifications.alert.container-aria-label')}
          aria-live='assertive'
        >
          <AlertText
            onClick={() => {
              window.open(alertLink, '_blank', 'noopener');
            }}
            title={t('notifications.alert.know-more-title')}
          >
            {t('notifications.alert.message')}

            <KnowMoreLink>
              {t('notifications.alert.know-more-text')}
            </KnowMoreLink>

            <FiArrowUpRight className='icon' aria-hidden='true' role='img' />
          </AlertText>

          <CancelIcon>
            <AiOutlineClose
              size='1.25rem'
              color='var(--ifm-color-icon-close)'
              className='icon'
              onClick={hideAlertHandler}
              title={t('notifications.alert.close-button-title')}
              aria-label={t('notifications.alert.close-button-aria-label')}
            />
          </CancelIcon>
        </AlertContainer>
      )}
    </Section>
  );
};

const AlertContainer = styled(ItemH)`
  background: linear-gradient(
    90deg,
    var(--ifm-color-grad-start-dark) -2.55%,
    var(--ifm-color-grad-mid-purple) 32.62%,
    var(--ifm-color-grad-end-pink) 68.34%,
    var(--ifm-color-grad-start-dark) 102.97%
  );
  background-color: var(--ifm-color-black);
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  @media ${device.tablet} {
    padding: 0rem 0rem;
  }
`;

const AlertText = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 142%;
  letter-spacing: -0.03em;
  color: var(--ifm-color-white);
  margin: auto auto;
  cursor: pointer;
  @media ${device.tablet} {
    font-size: 14px;
    width: 80%;
    text-align: center;
    padding: 10px;
  }

  .icon {
    position: relative;
    bottom: -3px;
  }
`;
const CancelIcon = styled.div`
  margin-right: 20px;
  @media ${device.tablet} {
  }

  .icon {
    cursor: pointer;
    @media ${device.tablet} {
      width: 15px;
    }
  }
`;

const KnowMoreLink = styled.span`
  padding: 0;
  background: none;
  font-size: 1.125rem;
  padding-left: 0.3rem;
  color: var(--ifm-color-white);
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    opacity: 0.75;
  }

  @media ${device.tablet} {
    font-size: 14px;
    padding-left: 0.5rem;
  }
`;
