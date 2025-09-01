/* eslint-disable @docusaurus/prefer-docusaurus-heading */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import TOC from '@theme/TOC';
import clsx from 'clsx';
import styled from 'styled-components';
import FooterItem from './FooterItem';
import MorePosts from './MorePosts';
import { MultiContent } from '@site/src/css/SharedStyling';

function BlogPostPageContent({ allPosts, post, children }) {
  const { metadata, toc } = useBlogPost();

  const { frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;

  return (
    <BlogLayout>
      <MultiContent flexDirection='row' gap='clamp(64px, 8vw, 128px)'>
        <BlogPostItem>{children}</BlogPostItem>
        <TOCWrapper className=''>
          {!hideTableOfContents && toc.length > 0 ? (
            <TOC
              toc={toc}
              minHeadingLevel={tocMinHeadingLevel}
              maxHeadingLevel={tocMaxHeadingLevel}
            />
          ) : undefined}
        </TOCWrapper>
      </MultiContent>
      <StyledMultiContent>
        <FooterItem />
      </StyledMultiContent>
      <StyledMultiContent>
        <MorePosts allPosts={allPosts} post={post} />
      </StyledMultiContent>
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const blogPath = props.location.pathname.substring(
    0,
    props.location.pathname.length - 1
  );
  const allPosts = props.allPosts;

  const contentName = allPosts?.find((x) =>
    x?.Preview?.metadata?.permalink?.includes(blogPath)
  );

  const BlogPostContent = contentName?.Preview;

  const isValidComponent =
    BlogPostContent && typeof BlogPostContent === 'function';

  if (!isValidComponent) {
    console.warn(`Invalid blog post component for path: ${blogPath}`);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Blog post not found or invalid.</h1>
        <p>Please check the metadata or route configuration.</p>
      </div>
    );
  }

  return (
    <BlogPostProvider content={BlogPostContent} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent allPosts={allPosts} post={contentName}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}

const BlogItem = styled.div`
  width: 100% !important;
  margin: 0 auto;

  & article .markdown {
    * {
      font-size: 1.15rem;
    }

    h1 {
      font-size: 2.65rem;
      font-weight: 700;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    h4 {
      font-size: 1.25rem;
      font-weight: 700;
    }

    h5 {
      font-size: 1.15rem;
      font-weight: 700;
    }

    h6 {
      font-size: 1rem;
      font-weight: 700;
    }
  }

  @media (max-width: 820px) {
    width: 100% !important;
    box-sizing: border-box;
  }
`;

const StyledMultiContent = styled(MultiContent)`
  @media (min-width: 1200px) {
    width: 75%;
  }
`;

const TOCWrapper = styled.div`
  display: none;

  @media (min-width: 1200px) {
    max-width: 250px;
    display: block;
    margin-top: 100px;
  }
`;
