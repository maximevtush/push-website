/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PaginatorNavLink from '@theme/PaginatorNavLink';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Internal Configs
import { device } from '@site/src/config/globals';

export default function BlogListPaginator(props) {
  const { t } = useTranslation();
  const { metadata } = props;
  const { previousPage, nextPage } = metadata;
  return (
    <NavItem
      // className="pagination-nav"
      aria-label={t('components.blog.paginator.nav-aria-label')}
    >
      {previousPage && (
        <PaginatorNavLink
          permalink={previousPage}
          title={t('components.blog.paginator.newer-entries')}
        />
      )}
      {nextPage && (
        <PaginatorNavLink
          permalink={nextPage}
          title={t('components.blog.paginator.older-entries')}
          isNext
        />
      )}
    </NavItem>
  );
}

const NavItem = styled.nav`
  margin: 0 auto 72px auto;
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  width: 1120px !important;

  @media ${device.laptopL} {
    width: 100% !important;
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
