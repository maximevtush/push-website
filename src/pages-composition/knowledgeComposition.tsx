// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components

// Internal Component
import ChainKnowledgeBaseComponent from '@site/src/components/Chain/ChainKnowledgeBase/ChainKnowledgeBaseComponent';
import ExploreCollection from '@site/src/components/ExploreCollection/ExploreCollection';
import { Content, Section } from '@site/src/css/SharedStyling';

import QnA from '@site/src/components/QnA/QnA';
import { getShortFAQsList } from '@site/src/config/ShortFAQsList';

// Internal Configs
import { kbResourcesList } from '@site/src/config/kbResourcesList';

// Interfaces and Props

// Helper Functions

// Helper Component

// Main Component
// Composition of a webpage
const KnowledgeComposition = () => {
  return (
    <>
      {/* Create Header Section */}
      <Section>
        <Content className='skeletonsmall'>
          <ChainKnowledgeBaseComponent />
        </Content>
      </Section>

      {/* Create Resources Section */}
      <Section id='resources'>
        <Content>
          <ExploreCollection
            title='Resources'
            items={kbResourcesList}
            variant='tile'
          />
        </Content>
      </Section>

      {/* Create FAQ at the bottom */}
      <Section id='faq'>
        <Content>
          <QnA
            titleKey='components.short-faq-snippet.title'
            titleAriaLabelKey='components.short-faq-snippet.title-aria-label'
            discordLinkTitleKey='components.short-faq-snippet.discord-link-title'
            discordLinkAriaLabelKey='components.short-faq-snippet.discord-link-aria-label'
            discordLinkTextKey='components.short-faq-snippet.discord-link-text'
            accordionAriaLabelKey='components.short-faq-snippet.accordion-aria-label'
            exploreMoreTitleKey='components.short-faq-snippet.explore-more-title'
            exploreMoreAriaLabelKey='components.short-faq-snippet.explore-more-aria-label'
            exploreMoreTextKey='components.short-faq-snippet.explore-more-text'
            discordUrl='https://discord.com/invite/pushchain'
            exploreMoreUrl='/knowledge/faq'
            getQnAsFunction={getShortFAQsList}
          />
        </Content>
      </Section>
    </>
  );
};

export default KnowledgeComposition;
