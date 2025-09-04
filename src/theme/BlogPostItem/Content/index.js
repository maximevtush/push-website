/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import { blogPostContainerID } from '@docusaurus/utils-common';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';
import LikeAndRetweetItem from '../../BlogPostPage/LikeAndRetweetItem';
import { styled } from 'styled-components';
export default function BlogPostItemContent({ children, className }) {
  const { isBlogPostPage, metadata } = useBlogPost();

  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}
      itemProp='articleBody'
    >
      <LikeSection>
        <LikeAndRetweetItem
          twitterId={metadata?.frontMatter?.twitterId}
          text='Hooked? Like and retweet to spread the word'
        />
      </LikeSection>

      <MDXContent>{children}</MDXContent>
    </div>
  );
}

const LikeSection = styled.div`
  margin-bottom: 16px;
`;
