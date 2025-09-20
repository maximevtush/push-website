/* eslint-disable */
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';

// Internal Configs
import { device } from '@site/src/config/globals';

interface SolidityCodeProps {
  children: React.ReactNode;
  title?: string;
  fileName?: string;
  url?: string;
  showRemixButton?: boolean;
  className?: string;
}

export const SolidityCode: React.FC<SolidityCodeProps> = ({
  children,
  title = 'Solidity Contract',
  fileName = 'Contract.sol',
  url = null,
  showRemixButton = true,
  className = '',
}) => {
  const getRemixUrl = () => {
    let remixUrl = 'https://remix.ethereum.org/';

    if (url) {
      // Convert GitHub blob URL to format Remix can understand
      if (url.includes('github.com') && url.includes('/blob/')) {
        // Use GitHub import format for Remix
        remixUrl = `https://remix.ethereum.org/#url=${url}`;
      } else if (url.includes('raw.githubusercontent.com')) {
        // Already a raw URL, use directly
        remixUrl = `https://remix.ethereum.org/#url=${url}`;
      } else {
        // Fallback to just opening Remix
        remixUrl = 'https://remix.ethereum.org/';
      }
    }

    return remixUrl;
  };

  return (
    <SolidityCodeContainer className={className}>
      <CodeHeader>
        <CodeTitle>
          <div>
            <TitleText>{title}</TitleText>
            <FileNameText>{fileName}</FileNameText>
          </div>
        </CodeTitle>

        <ButtonGroup>
          {showRemixButton && (
            <ActionButton
              href={getRemixUrl()}
              target='_blank'
              rel='noopener noreferrer'
            >
              Open in Remix
              <FiExternalLink size={16} />
            </ActionButton>
          )}
        </ButtonGroup>
      </CodeHeader>

      <CodeBlock>{children}</CodeBlock>
    </SolidityCodeContainer>
  );
};

// Styled Components
const SolidityCodeContainer = styled.div`
  margin: 24px 0;
  border-radius: var(--ifm-global-radius);
  overflow: hidden;

  @media ${device.tablet} {
    margin: 20px 0;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--ifm-playground-header-bg);

  @media ${device.tablet} {
    padding: 10px 12px;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
  }
`;

const CodeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FileIcon = styled.span`
  font-size: 1.125rem;

  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const TitleText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ifm-color-content);
  margin-bottom: 2px;

  @media ${device.tablet} {
    font-size: 0.8125rem;
  }
`;

const FileNameText = styled.div`
  font-size: 0.75rem;
  color: var(--ifm-color-content-secondary);
  font-family: var(--ifm-font-family-monospace);

  @media ${device.tablet} {
    font-size: 0.6875rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${device.tablet} {
    justify-content: flex-end;
    align-self: center;
  }
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--ifm-playground-header-tag);
  border-radius: 4px;
  color: var(--ifm-color-primary-text);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    border: 1px solid var(--ifm-color-primary);
    text-decoration: none;
  }

  @media ${device.tablet} {
    padding: 5px 10px;
    font-size: 0.6875rem;
  }
`;

const CodeBlock = styled.div`
  overflow-x: auto;
  background: var(--ifm-playground-header-terminalbg);

  & > div {
    margin: 0px;
  }
`;

export default SolidityCode;
