// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { FC } from 'react';

import styled from 'styled-components';

import QnA from '@site/src/components/QnA/QnA';
import { getShortFAQsList } from '@site/src/config/ShortFAQsList';

type ChainBottomComponentProps = {
  showFaq?: boolean;
};

const ChainBottomComponent: FC<ChainBottomComponentProps> = ({ showFaq }) => {
  return (
    <ChainBottomComponentWrapper showFaq={showFaq} id='faq'>
      {/* faq section */}
      {showFaq && (
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
      )}
    </ChainBottomComponentWrapper>
  );
};

export default ChainBottomComponent;

const ChainBottomComponentWrapper = styled.div``;
