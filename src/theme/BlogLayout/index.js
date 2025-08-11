/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

import SchemaMarkup from '@site/src/components/SEO/SchemaMarkup';
import BlogSidebar from '@theme/BlogSidebar';
import Layout from '@theme/Layout';
import styled from 'styled-components';

export default function BlogLayout(props) {
  const { sidebar, toc, children } = props;

  // Internationalization
  const { t } = useTranslation();

  const location = useLocation();
  const pathname = location?.pathname;

  const isBlogMainPage =
    pathname.includes('/page/') || pathname == '/blog/' || pathname == '/blog';

  return (
    <Layout
      title={isBlogMainPage ? t('pages.blog.seo.title') : ''}
      description={isBlogMainPage ? t('pages.blog.seo.description') : ''}
    >
      {isBlogMainPage && (
        <>
          <Head>
            {/* <!-- Facebook Meta Tags --> */}
            <meta property='og:url' content='https://push.org/blog' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={t('pages.blog.seo.og-title')} />
            <meta
              property='og:description'
              content={t('pages.blog.seo.og-description')}
            />
            <meta
              property='og:image'
              content={
                require('@site/static/assets/previews/blogpreview.png').default
              }
            />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@PushChain' />
            <meta
              name='twitter:title'
              content={t('pages.blog.seo.twitter-title')}
            />
            <meta
              name='twitter:description'
              content={t('pages.blog.seo.twitter-description')}
            />
            <meta
              name='twitter:image'
              content={
                require('@site/static/assets/previews/blogpreview.png').default
              }
            />
          </Head>

          {/* Schema Markup For Blog */}
          <SchemaMarkup
            type='Blog'
            pageDescription={t('pages.blog.seo.description')}
            pageUrl='https://push.org/blog'
          />
        </>
      )}

      {toc ? (
        <BlogItem className='blog-section'>
          <TOC className=''></TOC>
          <main
            className='mainItem'
            itemScope
            itemType='http://schema.org/Blog'
          >
            {children}
          </main>
          <TOC className=''>{toc}</TOC>
        </BlogItem>
      ) : (
        <div className='container blog-section'>
          <BlogSidebar sidebar={sidebar} />
          <main
            className='mainItem'
            itemScope
            itemType='http://schema.org/Blog'
          >
            {children}
          </main>
        </div>
      )}
    </Layout>
  );
}

const BlogItem = styled.div`
  max-width: 100vw !important;

  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 85vw !important;
    min-width: 85vw !important;
    margin: 0 auto;
    & main {
      margin: 0 auto;
    }
  }
`;

const TOC = styled.div`
  display: none;

  @media (min-width: 1200px) {
    width: 250px;
    display: block;
    margin-top: 100px;
  }
`;
