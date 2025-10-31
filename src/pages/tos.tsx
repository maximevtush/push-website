// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

import { useTranslation } from 'react-i18next';

import { DefaultDarkTheme } from '@site/src/css/SharedStyling';
import TosComp from '@site/src/pages-composition/tosComp';

function TermsOfServicePage() {
  const { t } = useTranslation();

  return (
    <Layout
      title={t('pages.tos.seo.title')}
      description={t('pages.tos.seo.description')}
      showNavbar='website'
    >
      <Head>
        <meta property='og:url' content='https://push.org/tos' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('pages.tos.seo.og-title')} />
        <meta
          property='og:description'
          content={t('pages.tos.seo.og-description')}
        />
        <meta
          property='og:image'
          content={useBaseUrl(
            require('/static/assets/previews/tospreview.png').default,
            { absolute: true }
          )}
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@PushChain' />
        <meta name='twitter:creator' content='@PushChain' />
        <meta name='twitter:title' content={t('pages.tos.seo.twitter-title')} />
        <meta
          property='twitter:description'
          content={t('pages.tos.seo.twitter-description')}
        />
        <meta
          property='twitter:image'
          content={useBaseUrl(
            require('/static/assets/previews/tospreview.png').default,
            { absolute: true }
          )}
        />
      </Head>

      <DefaultDarkTheme>
        <TosComp />
      </DefaultDarkTheme>
    </Layout>
  );
}

export default TermsOfServicePage;
