// React + Web3 Essentials
import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { FC } from 'react';
import styled from 'styled-components';

// External Components
import { useTranslation } from 'react-i18next';
import { BsArrowRight, BsDiscord } from 'react-icons/bs';

// Import Assets

// Internal Components
import Accordion from '@site/src/components/Accordion';
import { A, H2, ItemH, ItemV, Span } from '../../css/SharedStyling';
import useMediaQuery from '../../hooks/useMediaQuery';

// Internal Configs
import { device } from '@site/src/config/globals';
import { getShortFAQsList } from '@site/src/config/ShortFAQsList';

interface QnAProps {
  titleKey?: string;
  titleAriaLabelKey?: string;
  discordLinkTitleKey?: string;
  discordLinkAriaLabelKey?: string;
  discordLinkTextKey?: string;
  accordionAriaLabelKey?: string;
  exploreMoreTitleKey?: string;
  exploreMoreAriaLabelKey?: string;
  exploreMoreTextKey?: string;
  discordUrl?: string;
  exploreMoreUrl?: string;
  faqsList?: Array<{
    question: string;
    section: string;
    renderAnswer: () => JSX.Element;
  }>;
  getQnAsFunction?: () => Array<{
    question: string;
    section: string;
    renderAnswer: () => JSX.Element;
  }>;
}

const QnA: FC<QnAProps> = ({
  titleKey = 'components.short-faq-snippet.title',
  titleAriaLabelKey = 'components.short-faq-snippet.title-aria-label',
  discordLinkTitleKey = 'components.short-faq-snippet.discord-link-title',
  discordLinkAriaLabelKey = 'components.short-faq-snippet.discord-link-aria-label',
  discordLinkTextKey = 'components.short-faq-snippet.discord-link-text',
  accordionAriaLabelKey = 'components.short-faq-snippet.accordion-aria-label',
  exploreMoreTitleKey = 'components.short-faq-snippet.explore-more-title',
  exploreMoreAriaLabelKey = 'components.short-faq-snippet.explore-more-aria-label',
  exploreMoreTextKey = 'components.short-faq-snippet.explore-more-text',
  discordUrl = 'https://discord.com/invite/pushchain',
  exploreMoreUrl = '/knowledge/faq',
  faqsList,
  getQnAsFunction = getShortFAQsList,
}) => {
  // Internationalization
  const { t } = useTranslation();

  const isMobile = useMediaQuery(device.mobileL);
  const isLaptop = useMediaQuery(device.laptop);
  const finalFaqsList = faqsList || getQnAsFunction();

  return (
    <ItemH
      flexDirection={isLaptop && 'column'}
      alignItems='flex-start'
      justifyContent='space-between'
      gap={isLaptop ? '24px' : '120px'}
    >
      <ItemV
        flexDirection={isLaptop ? 'row' : 'column'}
        alignItems='flex-start'
        justifyContent={isLaptop ? 'space-between' : 'flex-start'}
        flex='0 0 auto'
        gap='24px'
      >
        <H2
          color='var(--ifm-color-white)'
          fontSize={isMobile ? '2.5rem' : '3rem'}
          fontFamily='DM Sans, sans-serif'
          fontWeight='600'
          lineHeight='120%'
          whiteSpace='break-spaces'
          role='heading'
          aria-level='2'
          aria-label={t(titleAriaLabelKey)}
        >
          {t(titleKey)}
        </H2>

        <QnAPrimaryLink
          href={discordUrl}
          target='_blank'
          title={t(discordLinkTitleKey)}
          aria-label={t(discordLinkAriaLabelKey)}
          rel='noopener'
        >
          <BsDiscord size={28} aria-hidden='true' />
          <p>{t(discordLinkTextKey)}</p>
          <BsArrowRight
            size={24}
            className='anchorSvgLink'
            aria-hidden='true'
          />
        </QnAPrimaryLink>
      </ItemV>

      <ItemV
        alignItems='flex-start'
        justifyContent='flex-start'
        flex='1'
        margin={isLaptop ? '48px 0 0 0' : '-20px 0 0 0'}
      >
        <AccordionGrid role='region' aria-label={t(accordionAriaLabelKey)}>
          <Accordion items={finalFaqsList} />
        </AccordionGrid>

        <QnAMoreInfoLink
          href={useBaseUrl(exploreMoreUrl)}
          title={t(exploreMoreTitleKey)}
          aria-label={t(exploreMoreAriaLabelKey)}
          target='_self'
          className='button'
          margin={isMobile ? '24px auto 0px 0px' : '24px 0px 0px auto'}
          hoverBackground='transparent'
          hover='transparent'
          background='transparent'
          filter='none'
          color='var(--ifm-color-pink-400)'
          borderRadius='0'
          padding='0px 0px'
        >
          <SpanLink>{t(exploreMoreTextKey)}</SpanLink>
          <BsArrowRight className='anchorSVGlink' aria-hidden='true' />
        </QnAMoreInfoLink>
      </ItemV>
    </ItemH>
  );
};

// Styled Components
const QnAPrimaryLink = styled(A)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 16px;
  background: var(--ifm-color-qna-discord);
  color: var(--ifm-color-white);
  font-family: 'DM Sans', sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.3);
  }

  p {
    margin: 0;
    font-weight: 500;
    color: inherit;
  }
`;

const AccordionGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SpanLink = styled(Span)`
  position: relative;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.36px;
  line-height: 142%;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--ifm-color-pink-400);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const QnAMoreInfoLink = styled(A)`
  overflow: inherit;
  .anchorSVGlink {
    color: var(--ifm-color-pink-400);
    top: 3px;
    margin-left: 8px;
  }

  &:hover {
    .anchorSVGlink {
      color: var(--ifm-color-pink-400);
    }
  }
`;

export default QnA;
