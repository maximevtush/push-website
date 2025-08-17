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
import ChainKnowledgeBaseArticle from '../../components/Chain/ChainKnowledgeBaseArticle/ChainKnowledgeBaseArticle';

// Internal Configs
import { buildersContent } from '@site/src/components/Chain/content/builders';

function BuildersPage() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.knowledge.builders.seo.title')}
      description={t('pages.knowledge.builders.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/knowledge/builders' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={t('pages.knowledge.builders.seo.og-title')}
        />
        <meta
          property='og:description'
          content={t('pages.knowledge.builders.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/kbbuilderspreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Update Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.knowledge.builders.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.knowledge.builders.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/kbbuilderspreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      <ChainKnowledgeBaseArticle item={buildersContent} />
    </Layout>
  );
}

export default BuildersPage;
