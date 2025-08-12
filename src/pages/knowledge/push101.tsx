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
import { push101Content } from '@site/src/components/Chain/content/push101';

function Page() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.knowledge.push101.seo.title')}
      description={t('pages.knowledge.push101.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta
          property='og:url'
          content='https://push.org/chain/knowledge/push101'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={t('pages.knowledge.push101.seo.og-title')}
        />
        <meta
          name='og:description'
          content={t('pages.knowledge.push101.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/kbbasicspreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Update Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.knowledge.push101.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.knowledge.push101.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/kbbasicspreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      <ChainKnowledgeBaseArticle item={push101Content} />
    </Layout>
  );
}

export default Page;
