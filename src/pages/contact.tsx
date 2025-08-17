// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

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
            require('/static/assets/previews/knowledgebasepreview.png').default,
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
            require('/static/assets/previews/knowledgebasepreview.png').default,
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
              <H1>Support</H1>
              <Span>Page to solve your support queries</Span>
            </MultiContent>

            <MultiContent>
              <TypeformSupport
                collapsedText='Open a Support Ticket'
                expandedTitle='Hi There! 👋'
                supportCategories={[
                  {
                    id: 'partnerships',
                    label: '🤝 Partnerships & Integrations',
                    description:
                      'BD, ecosystem integrations (wallets, infra, exchanges, protocols)',
                  },
                  {
                    id: 'grants',
                    label: '💰 Grants & Ecosystem Programs',
                    description: 'BRB, Bootcamp, grants, funding inquiries',
                  },
                  {
                    id: 'media',
                    label: '📰 Media & Press',
                    description: 'Interviews, statements, assets, fact-checks',
                  },
                  {
                    id: 'events',
                    label: '🎤 Speaking & Events',
                    description: 'Talks, workshops, hackathons, sponsorships',
                  },
                  {
                    id: 'careers',
                    label: '👩‍💻 Careers',
                    description:
                      'Open roles, internships, contractor opportunities',
                  },
                  {
                    id: 'validators',
                    label: '🧡 Validator / Node Operators',
                    description:
                      'Operator interest, RPC providers, infra partners',
                  },
                  {
                    id: 'legal',
                    label: '⚖️ Legal & Compliance',
                    description: 'Trademarks, data requests, agreements',
                  },
                  {
                    id: 'general',
                    label: '💬 General Inquiry',
                    description: 'Anything else',
                  },
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
