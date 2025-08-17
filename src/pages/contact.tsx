// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React, { useEffect, useState } from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import {
  Content,
  DefaultDarkTheme,
  H1,
  MultiContent,
  Section,
  Span,
} from '@site/src/css/SharedStyling';
import { TypeformSupport } from '../components/Support/TypeformSupport';

import QnA from '@site/src/components/QnA/QnA';
import { getShortContactUsQsList } from '@site/src/config/ShortContactUsQsList';

function ContactPage() {
  // Internationalization
  const { t } = useTranslation();

  // Track if user has manually interacted with the page
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Handle anchor link to auto-expand support form
  useEffect(() => {
    // Track user interactions to prevent auto-expand after manual interaction
    const handleUserInteraction = () => {
      setUserHasInteracted(true);
    };

    // Add event listeners for user interactions
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    const handleHashChange = () => {
      if (window.location.hash === '#open-contact-form' && !userHasInteracted) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          // Scroll to the support form
          const supportForm = document.getElementById('open-contact-form');
          if (supportForm) {
            // Get the element's position and scroll with custom offset
            const elementTop = supportForm.offsetTop;
            const offsetPosition = elementTop - 150; // 150px more scroll

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });

            // Auto-expand the support form by clicking the button
            setTimeout(() => {
              // Look for the expand button by ID
              const expandButton = document.getElementById(
                'typeform-expand-button'
              );
              if (expandButton) {
                expandButton.click();
              }
            }, 800); // Longer delay to ensure scroll completes
          }
        }, 100); // Small delay for DOM readiness
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Also listen for popstate events (browser navigation)
    window.addEventListener('popstate', handleHashChange);

    // Listen for click events on support ticket links
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href.includes('#open-contact-form')) {
        // Small delay to let navigation happen first
        setTimeout(handleHashChange, 50);
      }
    };

    document.addEventListener('click', handleLinkClick);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      document.removeEventListener('click', handleLinkClick);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <Layout
      title={t('pages.contact.seo.title')}
      description={t('pages.contact.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/support' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.contact.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.contact.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/contactpreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Update Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.contact.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.contact.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/contactpreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      {/* Theme to Apply */}
      <DefaultDarkTheme>
        {/* Heading Section */}
        <Section>
          <Content className='skeletonsmall'>
            <MultiContent>
              <H1>{t('pages.contact.hero-section.title')}</H1>
              <Span>{t('pages.contact.hero-section.description')}</Span>
            </MultiContent>

            <MultiContent id='open-contact-form'>
              <TypeformSupport
                collapsedText={t(
                  'components.typeform-support.collapsed-text-for-contact'
                )}
                expandedTitle={t(
                  'components.typeform-support.expanded-title-for-contact'
                )}
                supportCategoryKeys={[
                  'partnerships',
                  'grants',
                  'media',
                  'events',
                  'careers',
                  'validators',
                  'legal',
                  'general',
                ]}
              />
            </MultiContent>
          </Content>
        </Section>

        {/* QnA Section */}
        <Section>
          <Content>
            <QnA
              titleKey='components.short-contact-us-snippet.title'
              titleAriaLabelKey='components.short-contact-us-snippet.title-aria-label'
              discordLinkTitleKey='components.short-contact-us-snippet.discord-link-title'
              discordLinkAriaLabelKey='components.short-contact-us-snippet.discord-link-aria-label'
              discordLinkTextKey='components.short-contact-us-snippet.discord-link-text'
              accordionAriaLabelKey='components.short-contact-us-snippet.accordion-aria-label'
              exploreMoreTitleKey='components.short-contact-us-snippet.explore-more-title'
              exploreMoreAriaLabelKey='components.short-contact-us-snippet.explore-more-aria-label'
              exploreMoreTextKey='components.short-contact-us-snippet.explore-more-text'
              discordUrl='https://discord.com/invite/pushchain'
              exploreMoreUrl='/knowledge/faq'
              getQnAsFunction={getShortContactUsQsList}
            />
          </Content>
        </Section>
      </DefaultDarkTheme>
    </Layout>
  );
}

export default ContactPage;
