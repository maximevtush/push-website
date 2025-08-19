// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import Link from '@docusaurus/Link';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Internal Component
import { LI, UL } from '@site/src/css/SharedStyling';

// Import Assets

// Internal Configs
import { device } from '@site/src/config/globals';

// Interfaces and Props
interface BreadcrumbItem {
  text: string;
  link?: string;
}

interface BreadcrumbsProps {
  breadcrumbs?: BreadcrumbItem[]; // Additional breadcrumbs after Home
}

// Helper Functions

// Helper Component

// Main
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  // Internationalization
  const { t } = useTranslation();

  // Only render breadcrumbs if they are provided
  const breadcrumbsToRender: (BreadcrumbItem | { separator: true })[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    // Always start with Home, then add provided breadcrumbs
    const homeBreadcrumb: BreadcrumbItem = {
      text: t('components.breadcrumbs.home-text'),
      link: '/',
    };
    const allBreadcrumbs = [homeBreadcrumb, ...breadcrumbs];

    // Generate breadcrumbs with separators
    allBreadcrumbs.forEach((breadcrumb, index) => {
      breadcrumbsToRender.push(breadcrumb);
      // Add separator after each item except the last one
      if (index < allBreadcrumbs.length - 1) {
        breadcrumbsToRender.push({ separator: true });
      }
    });
  }

  // Don't render anything if no breadcrumbs
  if (breadcrumbsToRender.length === 0) {
    return null;
  }

  return (
    <BreadcrumbNav
      aria-label={t('components.breadcrumbs.navigation-aria-label')}
      role='navigation'
    >
      <BreadcrumbList itemScope itemType='https://schema.org/BreadcrumbList'>
        {breadcrumbsToRender.map((item, index) => {
          const position = Math.floor(index / 2) + 1; // Account for separators

          return (
            <CustomLi key={index}>
              {'separator' in item ? (
                <BreadcrumbSeparator aria-hidden='true'>
                  {'>'}
                </BreadcrumbSeparator>
              ) : (
                <BreadcrumbItem
                  itemScope
                  itemType='https://schema.org/ListItem'
                  itemProp='itemListElement'
                >
                  <meta itemProp='position' content={position.toString()} />
                  {item.link ? (
                    <BreadcrumbLink
                      to={item.link}
                      itemProp='item'
                      aria-label={t(
                        'components.breadcrumbs.navigate-to-aria-label',
                        { page: item.text }
                      )}
                      title={t('components.breadcrumbs.go-to-title', {
                        page: item.text,
                      })}
                    >
                      <span itemProp='name'>{item.text}</span>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbCurrent
                      itemProp='item'
                      aria-current='page'
                      aria-label={t(
                        'components.breadcrumbs.current-page-aria-label',
                        { page: item.text }
                      )}
                    >
                      <span itemProp='name'>{item.text}</span>
                    </BreadcrumbCurrent>
                  )}
                </BreadcrumbItem>
              )}
            </CustomLi>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

export default Breadcrumbs;

const BreadcrumbNav = styled.nav`
  width: 100%;
`;

const BreadcrumbList = styled(UL)`
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  color: #fff;
`;

const CustomLi = styled(LI)`
  margin-top: 0px;
`;

const BreadcrumbItem = styled.div`
  display: inline-flex;
  align-items: center;
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  font-size: 1.25em;
  font-weight: 500;
  font-family:
    DM Sans,
    sans-serif;
  line-height: 140%;
  color: #fff;
  transition: color 0.2s ease;

  @media ${device.tablet} {
    font-size: 1em;
  }

  &:hover {
    color: #cf59e2;
  }

  &:focus {
    outline: 2px solid #cf59e2;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const BreadcrumbCurrent = styled.span`
  font-size: 1.25em;
  font-weight: 500;
  font-family:
    DM Sans,
    sans-serif;
  line-height: 140%;
  color: #fff;

  @media ${device.tablet} {
    font-size: 1em;
  }
`;

const BreadcrumbSeparator = styled.span`
  font-size: 1.25em;
  font-weight: 400;
  color: #999;
  margin: 0 4px;
  user-select: none;

  @media ${device.tablet} {
    font-size: 1em;
  }
`;
