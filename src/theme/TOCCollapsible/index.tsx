import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import TOCItems from '@theme/TOCItems';
import { FiChevronDown } from 'react-icons/fi';
import { CopyPageButton } from '@site/src/components/CopyPageButton';
import styles from './styles.module.css';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

interface TOCCollapsibleProps {
  toc: any[];
  className?: string;
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
}

export default function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: TOCCollapsibleProps) {
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: true,
  });

  return (
    <div className={clsx(styles.tocCollapsible, 'thin-scrollbar', className)}>
      <div className={styles.tocCollapsibleHeader}>
        <button
          type="button"
          className={clsx(
            'clean-btn',
            styles.tocCollapsibleButton,
            !collapsed && styles.tocCollapsibleButtonExpanded,
            className,
          )}
          aria-expanded={!collapsed}
          aria-label={translate({
            id: 'theme.TOCCollapsible.toggleButtonLabel',
            message: 'Toggle table of contents',
            description: 'The label used by the button on the collapsible TOC component',
          })}
          onClick={toggleCollapsed}>
          {translate({
            id: 'theme.TOCCollapsible.toggleButtonLabel',
            message: 'On this page',
            description: 'The label used by the button on the collapsible TOC component',
          })}
          <FiChevronDown className={styles.tocCollapsibleButtonIcon} />
        </button>

        {/* Copy Page Button - always show when TOC has content */}
        {toc.length > 0 && (
          <div className={styles.copyPageButtonWrapper}>
            <CopyPageButton />
          </div>
        )}
      </div>

      <Collapsible lazy collapsed={collapsed}>
        <TOCItems
          toc={toc}
          minHeadingLevel={minHeadingLevel}
          maxHeadingLevel={maxHeadingLevel}
          linkClassName={LINK_CLASS_NAME}
          linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
        />
      </Collapsible>
    </div>
  );
}
