import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import Footer from '@site/src/segments/Footer';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import React, { useState } from 'react';
import styles from './styles.module.css';

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
          <Content className='skeletonextrasmall docs clip' flexDirection='row'>
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
