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
import Push101Comp from '@site/src/pages-composition/push101Comp';

// Internal Configs
import { DefaultDarkTheme } from '@site/src/css/SharedStyling';

// Main
function PushBasicsPage() {
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
        <meta property='og:url' content='https://push.org/knowledge/push101' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={t('pages.knowledge.push101.seo.og-title')}
        />
        <meta
          property='og:description'
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
        <meta name='twitter:creator' content='@PushChain' />
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

      <DefaultDarkTheme>
        <Push101Comp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default PushBasicsPage;
