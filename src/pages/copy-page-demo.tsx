/* eslint-disable */
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import Layout from '@theme/Layout';
import styled from 'styled-components';

// Internal Components
import { CopyPageButton } from '@site/src/components/CopyPageButton';
import { Section, ItemH } from '@site/src/css/SharedStyling';

// Internal Configs
import { device } from '@site/src/config/globals';

const CopyPageDemo = () => {
  const sampleContent = `
# Push Chain Documentation

Push Chain is a decentralized communication protocol that enables cross-chain notifications and messaging for dapps, wallets, and services.

## Key Features

- **Cross-chain Communication**: Send notifications across different blockchains
- **Decentralized Infrastructure**: Built on IPFS and Ethereum
- **Developer-friendly**: Easy integration with existing dapps
- **User Control**: Users control their notification preferences

## Getting Started

To integrate Push Protocol into your application:

1. Install the Push SDK
2. Initialize the Push instance
3. Send your first notification
4. Subscribe to channels

## Code Example

\`\`\`javascript
import { PushAPI } from '@pushprotocol/restapi';

const userAlice = await PushAPI.initialize(signer, {
  env: 'staging'
});

// Send notification
await userAlice.channel.send(['*'], {
  notification: {
    title: 'Hello World!',
    body: 'This is a test notification'
  }
});
\`\`\`

## Architecture

Push Protocol consists of several key components:

- **Push Nodes**: Decentralized network nodes
- **Push Channels**: Communication channels for dapps
- **Push Chat**: Decentralized messaging
- **Push Delivery Nodes**: Notification delivery infrastructure

## Use Cases

- DeFi protocol notifications
- NFT marketplace alerts
- DAO governance updates
- Gaming achievements
- Social media interactions

For more information, visit our comprehensive documentation and start building with Push Chain today!
  `;

  return (
    <Layout
      title="Copy Page Button Demo"
      description="Demo page showcasing the Copy Page Button component inspired by Monad documentation"
    >
      <DemoContainer>
        <Section>
          <DemoHeader>
            <HeaderContent>
              <h1>Copy Page Button Demo</h1>
              <p>This demo showcases the Copy Page Button component inspired by Monad documentation.</p>
            </HeaderContent>
            <ButtonContainer>
              <CopyPageButton 
                pageContent={sampleContent}
                pageTitle="Push Chain Documentation Demo"
                pageUrl="https://push.org/docs/copy-page-demo"
              />
            </ButtonContainer>
          </DemoHeader>

          <DemoContent>
            <ContentSection>
              <h2>Push Chain Documentation</h2>
              <p>
                Push Chain is a decentralized communication protocol that enables cross-chain 
                notifications and messaging for dapps, wallets, and services.
              </p>

              <h3>Key Features</h3>
              <ul>
                <li><strong>Cross-chain Communication</strong>: Send notifications across different blockchains</li>
                <li><strong>Decentralized Infrastructure</strong>: Built on IPFS and Ethereum</li>
                <li><strong>Developer-friendly</strong>: Easy integration with existing dapps</li>
                <li><strong>User Control</strong>: Users control their notification preferences</li>
              </ul>

              <h3>Getting Started</h3>
              <p>To integrate Push Chain into your application:</p>
              <ol>
                <li>Install the Push SDK</li>
                <li>Initialize the Push instance</li>
                <li>Send your first notification</li>
                <li>Subscribe to channels</li>
              </ol>

              <h3>Code Example</h3>
              <CodeBlock>
                {`import { PushAPI } from '@pushprotocol/restapi';

const userAlice = await PushAPI.initialize(signer, {
  env: 'staging'
});

// Send notification
await userAlice.channel.send(['*'], {
  notification: {
    title: 'Hello World!',
    body: 'This is a test notification'
  }
});`}
              </CodeBlock>

              <h3>Architecture</h3>
              <p>Push Chain consists of several key components:</p>
              <ul>
                <li><strong>Push Nodes</strong>: Decentralized network nodes</li>
                <li><strong>Push Channels</strong>: Communication channels for dapps</li>
                <li><strong>Push Chat</strong>: Decentralized messaging</li>
                <li><strong>Push Delivery Nodes</strong>: Notification delivery infrastructure</li>
              </ul>

              <h3>Use Cases</h3>
              <ul>
                <li>DeFi protocol notifications</li>
                <li>NFT marketplace alerts</li>
                <li>DAO governance updates</li>
                <li>Gaming achievements</li>
                <li>Social media interactions</li>
              </ul>

              <p>
                For more information, visit our comprehensive documentation and start building 
                with Push Chain today!
              </p>
            </ContentSection>

            <FeatureSection>
              <h3>Copy Page Button Features</h3>
              <FeatureList>
                <FeatureItem>
                  <strong>Copy page</strong> - Copies the page content as Markdown format optimized for LLMs
                </FeatureItem>
                <FeatureItem>
                  <strong>View as Markdown</strong> - Opens the page content in a new window as plain text
                </FeatureItem>
                <FeatureItem>
                  <strong>Open in ChatGPT</strong> - Opens ChatGPT with the page content as context
                </FeatureItem>
                <FeatureItem>
                  <strong>Open in Claude</strong> - Opens Claude AI with the page content as context
                </FeatureItem>
              </FeatureList>
            </FeatureSection>
          </DemoContent>
        </Section>
      </DemoContainer>
    </Layout>
  );
};

// Styled Components
const DemoContainer = styled.div`
  min-height: 100vh;
  background: var(--ifm-color-background);
`;

const DemoHeader = styled(ItemH)`
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 0;
  border-bottom: 1px solid var(--ifm-color-emphasis-200);
  margin-bottom: 2rem;

  @media ${device.tablet} {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  flex: 1;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--ifm-color-content);
    margin-bottom: 0.5rem;

    @media ${device.tablet} {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.125rem;
    color: var(--ifm-color-content-secondary);
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  @media ${device.tablet} {
    align-self: flex-end;
  }
`;

const DemoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContentSection = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--ifm-color-content);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ifm-color-content);
    margin: 2rem 0 1rem 0;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--ifm-color-content);
    margin-bottom: 1rem;
  }

  ul, ol {
    margin-bottom: 1rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
`;

const CodeBlock = styled.pre`
  background: var(--ifm-color-emphasis-100);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1rem 0;
`;

const FeatureSection = styled.div`
  background: var(--ifm-color-emphasis-0);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 8px;
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--ifm-color-content);
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FeatureItem = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--ifm-color-content);
`;

export default CopyPageDemo;
