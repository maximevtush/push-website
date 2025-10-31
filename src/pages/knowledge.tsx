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
import SchemaMarkup from '@site/src/components/SEO/SchemaMarkup';
import { DefaultDarkTheme } from '@site/src/css/SharedStyling';

import KnowledgeComp from '@site/src/pages-composition/knowledgeComp';

// Main
function KnowledgeBasePage() {
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.knowledge.seo.title')}
      description={t('pages.knowledge.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/knowledge' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.knowledge.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.knowledge.seo.og-description')}
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
          content={t('pages.knowledge.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.knowledge.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/knowledgebasepreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      {/* FAQ Schema Markup with default FAQs */}
      <SchemaMarkup type='FAQPage' />

      <DefaultDarkTheme>
        <KnowledgeComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default KnowledgeBasePage;
