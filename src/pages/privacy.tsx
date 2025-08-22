// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Components
import { DefaultDarkTheme } from '@site/src/css/SharedStyling';
import PrivacyComp from '@site/src/pages-composition/privacyComp';

function PrivacyPage() {
  // Internationalization
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.privacy.seo.title')}
      description={t('pages.privacy.seo.description')}
      showNavbar='website'
    >
      <Head>
        {/* <!-- Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/privacy' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.privacy.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.privacy.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/privacypreview.png').default,
            { absolute: true }
          )}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.privacy.seo.twitter-title')}
        />
        <meta
          name='twitter:description'
          content={t('pages.privacy.seo.twitter-description')}
        />
        <meta
          property='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/privacypreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      <DefaultDarkTheme>
        <PrivacyComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default PrivacyPage;
