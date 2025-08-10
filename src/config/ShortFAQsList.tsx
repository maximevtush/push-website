// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// External Components
import Link from '@docusaurus/Link';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Internal Components
import { ItemH, Span } from '@site/src/css/SharedStyling';

// Internal Configs
import { device } from '@site/src/config/globals';

// Function to generate FAQ list with translations
export const getShortFAQsList = () => {
  const { t } = useTranslation();

  return [
    {
      question: t('components.short-faq-snippet.faqs.faq1.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-faq-snippet.answer-aria-label')}${t('components.short-faq-snippet.faqs.faq1.question')}`}
        >
          <Trans
            i18nKey='components.short-faq-snippet.faqs.faq1.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq2.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-faq-snippet.answer-aria-label')}${t('components.short-faq-snippet.faqs.faq2.question')}`}
        >
          <Trans
            i18nKey='components.short-faq-snippet.faqs.faq2.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq3.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-faq-snippet.answer-aria-label')}${t('components.short-faq-snippet.faqs.faq3.question')}`}
        >
          <Trans
            i18nKey='components.short-faq-snippet.faqs.faq3.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq4.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-faq-snippet.answer-aria-label')}${t('components.short-faq-snippet.faqs.faq4.question')}`}
        >
          <Trans
            i18nKey='components.short-faq-snippet.faqs.faq4.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq5.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-faq-snippet.answer-aria-label')}${t('components.short-faq-snippet.faqs.faq5.question')}`}
        >
          <Trans
            i18nKey='components.short-faq-snippet.faqs.faq5.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#useful-stats'
                  title={t(
                    'components.short-faq-snippet.faqs.faq5.answer.supported-urls-title'
                  )}
                />
              ),
              4: (
                <Link
                  href='/contact'
                  title={t(
                    'components.short-faq-snippet.faqs.faq5.answer.contact-url-title'
                  )}
                  target='_self'
                />
              ),
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq6.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-faq-snippet.answer-aria-label')}${t('components.short-faq-snippet.faqs.faq6.question')}`}
        >
          <Trans
            i18nKey='components.short-faq-snippet.faqs.faq6.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='https://donut.push.network'
                  title={t(
                    'components.short-faq-snippet.faqs.faq6.answer.donut-testnet-title'
                  )}
                />
              ),
            }}
          />
        </Answer>
      ),
    },
  ];
};

// Note: ShortFAQsList is now dynamically generated via getShortFAQsList()
// and should be called within React components to access translation context
const Answer = styled(ItemH)`
  align-items: stretch;
  align-self: stretch;
  justify-content: flex-start;
  margin: 0px;
  padding: 0 0 24px 0;

  & ${Span} {
    color: #bbbcd0;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 30px */
    width: 100%;

    @media ${device.mobileL} {
      font-size: 16px;
    }
  }

  & Span:not(:first-child) {
    margin-top: 24px;
  }

  & a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  & b {
    color: #fff;
    font-weight: 600;
  }
`;
