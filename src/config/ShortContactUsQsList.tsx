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
export const getShortContactUsQsList = () => {
  const { t } = useTranslation();

  return [
    {
      question: t('components.short-contact-us-snippet.qnas.qna1.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna1.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna1.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna1.answer.contact-partnerships-title'
                  )}
                />
              ),
              4: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna1.answer.contact-grants-title'
                  )}
                />
              ),
              5: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna1.answer.contact-media-title'
                  )}
                />
              ),
              6: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna1.answer.contact-validators-title'
                  )}
                />
              ),
              7: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna1.answer.contact-legal-title'
                  )}
                />
              ),
              8: (
                <Link
                  href='/support'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna1.answer.support-title'
                  )}
                />
              ),
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-contact-us-snippet.qnas.qna2.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna2.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna2.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-contact-us-snippet.qnas.qna3.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna3.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna3.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna3.answer.contact-partnerships-title'
                  )}
                />
              ),
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-contact-us-snippet.qnas.qna4.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna4.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna4.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna4.answer.contact-grants-title'
                  )}
                />
              ),
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-contact-us-snippet.qnas.qna5.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna5.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna5.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna5.answer.contact-media-title'
                  )}
                />
              ),
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-contact-us-snippet.qnas.qna6.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna6.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna6.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='mailto:security@push.org'
                  title={t(
                    'components.short-support-snippet.qnas.qna6.answer.security-policy-title'
                  )}
                  target='_blank'
                />
              ),
            }}
          />
        </Answer>
      ),
    },
    {
      question: t('components.short-contact-us-snippet.qnas.qna7.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna7.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna7.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna7.answer.contact-validators-title'
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
      question: t('components.short-contact-us-snippet.qnas.qna8.question'),
      section: 'General',
      renderAnswer: () => (
        <Answer
          role='region'
          aria-label={`${t('components.short-contact-us-snippet.answer-aria-label')}${t('components.short-contact-us-snippet.qnas.qna8.question')}`}
        >
          <Trans
            i18nKey='components.short-contact-us-snippet.qnas.qna8.answer'
            components={{
              1: <Span role='text' />,
              2: <strong />,
              3: (
                <Link
                  href='#open-contact-form'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna8.answer.contact-careers-title'
                  )}
                  target='_self'
                />
              ),
              4: (
                <Link
                  href='https://x.com/PushChain'
                  title={t(
                    'components.short-contact-us-snippet.qnas.qna8.answer.twitter-title'
                  )}
                  target='_blank'
                />
              ),
            }}
          />
        </Answer>
      ),
    },
  ];
};

// Note: ShortqnasList is now dynamically generated via getShortqnasList()
// and should be called within React components to access translation context
const Answer = styled(ItemH)`
  align-items: stretch;
  align-self: stretch;
  justify-content: flex-start;
  margin: 0px;
  padding: 0 0 24px 0;

  & ${Span} {
    color: var(--ifm-color-neutral-300);
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
    color: var(--ifm-color-white);
    font-weight: 600;
  }
`;
