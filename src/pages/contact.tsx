// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// React + Web3 Essentials
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

// Internal Component
import { Contact } from '../components/Contact';

// Internal Configs
import { PageMeta } from '@site/src/config/pageMeta';

function PushChainKnowledgeBase() {
  return (
    <Layout
      title={PageMeta.KNOWLEDGE.pageTitle}
      description={PageMeta.KNOWLEDGE.pageDescription}
      showNavbar={'website'}
    >
      <Head>
        {/* <!-- Update Facebook Meta Tags --> */}
        <meta property='og:url' content='https://push.org/chain/knowledge' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Knowledge Base | Push Chain' />
        <meta
          name='og:description'
          content='Discover everything for tutorials to code base to what makes Push Chain tick at the knowledge hub.'
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
        <meta name='twitter:title' content='Knowledge Base | Push Chain' />
        <meta
          name='twitter:description'
          content='Discover everything for tutorials to code base to what makes Push Chain tick at the knowledge hub.'
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

export default PushChainKnowledgeBase;
