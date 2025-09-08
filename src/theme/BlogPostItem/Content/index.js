/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { blogPostContainerID } from '@docusaurus/utils-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import MDXContent from '@theme/MDXContent';
import LikeAndRetweetItem from '../../BlogPostPage/LikeAndRetweetItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function BlogPostItemContent({ children, className }) {
  const { isBlogPostPage, metadata } = useBlogPost();
  const [hasInjectedSocialButtons, setHasInjectedSocialButtons] =
    useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isBlogPostPage || hasInjectedSocialButtons || !contentRef.current)
      return;

    // Wait for content to render
    const timer = setTimeout(() => {
      const firstImage = contentRef.current?.querySelector('p > img');

      if (firstImage && !hasInjectedSocialButtons) {
        // Create social buttons container
        const socialContainer = document.createElement('div');

        // Insert after the first image's parent paragraph
        firstImage.parentNode.parentNode.insertBefore(
          socialContainer,
          firstImage.parentNode.nextSibling
        );

        // Render the component with QueryClientProvider
        const { createRoot } = require('react-dom/client');
        const queryClient = new QueryClient();
        const root = createRoot(socialContainer);
        root.render(
          <QueryClientProvider client={queryClient}>
            <LikeAndRetweetItem twitterId={metadata?.frontMatter?.twitterId} />
          </QueryClientProvider>
        );

        setHasInjectedSocialButtons(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    isBlogPostPage,
    hasInjectedSocialButtons,
    metadata?.frontMatter?.twitterId,
  ]);

  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}
      itemProp='articleBody'
      ref={contentRef}
    >
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
