/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import SchemaMarkup from '@site/src/components/SEO/SchemaMarkup';
import WebsiteMeta from '@site/src/components/SEO/WebsiteMeta';
import { ItemH } from '@site/src/css/SharedStyling';
import Footer from '@site/src/segments/Footer';
import Header from '@site/src/segments/Header';
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export default function Layout(props) {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
    showNavbar,
  } = props;

  const { t } = useTranslation();
  useKeyboardNavigation();

  return (
    <LayoutProvider>
      {/* Passing description as null since description is done custom on each page */}
      {/* Individual blog and docs pages handle it automatically */}
      <PageMetadata title={title} description={null} />

      {/* Default Schema Markup for all pages */}
      {/* Organization */}
      <SchemaMarkup type='Organization' />

      {/* WebSite */}
      <SchemaMarkup
        type='Organization'
        pageTitle={title || t('global.site-name')}
        pageDescription={description || t('global.site-description')}
      />

      {/* Website Meta */}
      <WebsiteMeta />

      <SkipToContent />
      <AnnouncementBar />
      {/* navbar for docs/blogs */}
      {(showNavbar === undefined || showNavbar === 'docusaurus') && <Navbar />}
      {/* navbar for website pages and sub pages */}
      {showNavbar === 'website' && <Header />}
      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {showNavbar === 'website' && (
        <ItemH background='#e8eff8'>
          <Footer showPattern={false} />
        </ItemH>
      )}
    </LayoutProvider>
  );
}
