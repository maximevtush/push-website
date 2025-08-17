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
import { Contact } from '@site/src/components/Contact';

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
        <meta property='og:url' content='https://push.org/contact' />
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

      <Contact />
    </Layout>
  );
}

export default ContactPage;
