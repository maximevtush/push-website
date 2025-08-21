// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';

// Internal Component
import { Content, Section } from '@site/src/css/SharedStyling';

import ContentBlocks from '@site/src/components/ContentBlocks/ContentBlocks';
import { KBPush101List } from '@site/src/config/KBPush101List';

// Internal Configs

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const Push101Comp = () => {
  // Localization
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      text: t(
        'pages.knowledge.push101.explainer-section.breadcrumbs.knowledge-base'
      ),
      link: '/knowledge',
    },
  ];

  return (
    <Section>
      <Content className='skeletonsmall'>
        <ContentBlocks item={KBPush101List} breadcrumbs={breadcrumbs} />
      </Content>
    </Section>
  );
};

export default Push101Comp;
