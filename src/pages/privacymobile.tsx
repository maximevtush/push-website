// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

import { useTranslation } from 'react-i18next';

import { DefaultDarkTheme } from '@site/src/css/SharedStyling';
import PrivacyMobileComp from '@site/src/pages-composition/privacymobileComp';

function PrivacyMobilePage() {
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.privacymobile.seo.title')}
      description={t('pages.privacymobile.seo.description')}
      showNavbar='website'
    >
      <Head>
        <meta property='og:url' content='https://push.org/privacymobile' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={t('pages.privacymobile.seo.og-title')}
        />
        <meta
          property='og:description'
          content={t('pages.privacymobile.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/privacypreview.png').default,
            { absolute: true }
          )}
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta
          name='twitter:title'
          content={t('pages.privacymobile.seo.twitter-title')}
        />
        <meta
          property='twitter:description'
          content={t('pages.privacymobile.seo.twitter-description')}
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
        <PrivacyMobileComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default PrivacyMobilePage;
