/* eslint-disable @docusaurus/no-html-links, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// React + Web3 Essentials
import Link from '@docusaurus/Link';
import React from 'react';

// External Components
import styled from 'styled-components';

// Internal Component
import useMediaQuery from '@site/src/hooks/useMediaQuery';

import { H1, ItemV, LI, UL } from '@site/src/css/SharedStyling';

import Breadcrumbs from '@site/src/components/Breadcrumbs/Breadcrumbs';
import ExplainerIndexList from '@site/src/components/Explainer/Explainer';
import ExploreCollection from '@site/src/components/ExploreCollection/ExploreCollection';
import Spinner, {
  SPINNER_TYPE,
} from '@site/src/components/reusables/spinners/SpinnerUnit';

// Import Assets

// Internal Configs
import { device } from '@site/src/config/globals';

// Interfaces and Props

// Helper Functions

// Helper Component

// Interfaces and Props
interface BreadcrumbItem {
  text: string;
  link?: string;
}

interface ContentBlocksProps {
  item: any;
  breadcrumbs?: BreadcrumbItem[]; // Additional breadcrumbs after Home
}

// Main
const ContentBlocks = ({ item, breadcrumbs }: ContentBlocksProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const isTablet = useMediaQuery(device.tablet);

  if (!item || !item.content) {
    return (
      <ContentBlocksArticleWrapper>
        <ItemV alignItems='center' justifyContent='center' padding='64px 0'>
          <Spinner size={48} type={SPINNER_TYPE.PROCESSING} />
        </ItemV>
      </ContentBlocksArticleWrapper>
    );
  }

  return (
    <ContentBlocksArticleWrapper>
      <ItemV alignItems='flex-start' gap='0px'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <H1
          fontSize='3rem'
          fontWeight='600'
          lineHeight='135%'
          letterSpacing='-1.1px'
          color='var(--ifm-color-white)'
        >
          {item?.title}
        </H1>
      </ItemV>

      {item.content?.map((block, blockIndex) => {
        if (block.type === 'indexlist') {
          return (
            <ArticleContent topGap={block?.topGap} bottomGap={block?.bottomGap}>
              <ExplainerIndexList
                key={blockIndex}
                block={block}
                blockIndex={blockIndex}
              />
            </ArticleContent>
          );
        }

        if (block.type === 'list') {
          return (
            <ArticleContent topGap={block?.topGap} bottomGap={block?.bottomGap}>
              <ExploreCollection
                items={block?.items}
                title={block?.title}
                variant={block?.variant}
              />
            </ArticleContent>
          );
        }

        return null;
      })}
    </ContentBlocksArticleWrapper>
  );
};

export default ContentBlocks;

const ContentBlocksArticleWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ArticleContent = styled.div`
  margin: auto;

  margin-top: ${({ topGap }) => (topGap ? '72px' : '0')};
  margin-bottom: ${({ bottomGap }) => (bottomGap ? '120px' : '0')};

  @media ${device.mobileL} {
    margin-top: ${({ topGap }) => (topGap ? '64px' : '0')};
    margin-bottom: ${({ bottomGap }) => (bottomGap ? '120px' : '0')};
  }
`;
