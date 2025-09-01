import React, { useState } from 'react';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import styles from './styles.module.css';
import Footer from '@site/src/segments/Footer';

// Internal Components
import { Content, Section } from '@site/src/css/SharedStyling';

export default function DocRootLayout({ children }) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  return (
    <>
      <div className={styles.docsWrapper}>
        <BackToTopButton />
        <Section>
          <Content className='skeletonextrasmall docs' flexDirection='row'>
            {sidebar && (
              <DocRootLayoutSidebar
                sidebar={sidebar.items}
                hiddenSidebarContainer={hiddenSidebarContainer}
                setHiddenSidebarContainer={setHiddenSidebarContainer}
              />
            )}
            <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
              {children}
            </DocRootLayoutMain>
          </Content>
        </Section>
      </div>
      <Footer />
    </>
  );
}
