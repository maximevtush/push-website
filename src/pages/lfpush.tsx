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
import ChainKnowledgeBase from '../components/Chain/ChainKnowledgeBase/ChainKnowledgeBase';

function PushChainKnowledgeBase() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.lfpush.seo.title')}
      description={t('pages.lfpush.seo.description')}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/chain/knowledge' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.lfpush.seo.og-title')} />
        <meta
          name='og:description'
          content={t('pages.lfpush.seo.og-description')}
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
        <meta
          name='twitter:title'
          content={t('pages.lfpush.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.lfpush.seo.twitter-description')}
        />
        <meta
          name='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/knowledgebasepreview.png').default,
            { absolute: true }
          )}
        />

        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Organization',
            name: 'Push Chain',
            description: 'Any Chain. Any User. Any App',
            url: 'https://push.org',
            logo: '/assets/website/favicon.ico',
            sameAs: [
              'https://x.com/PushChain',
              'https://www.linkedin.com/company/push-protocol/mycompany/',
            ],
          })}
        </script>
      </Head>

      <ChainKnowledgeBase />
    </Layout>
  );
}

export default PushChainKnowledgeBase;
