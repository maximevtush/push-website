/* eslint-disable @docusaurus/no-html-links, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Link from '@docusaurus/Link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

import { device } from '../../../config/globals';
import { H1, ItemH, ItemV, LI, Span, UL } from '../../../css/SharedStyling';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { extractTOC } from '../utils/ExtractTableOfContent';

import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useSiteBaseUrl } from '../../../hooks/useSiteBaseUrl';
import ChainKnowledgeBaseGrid from '../ChainKnowledgeBase/ChainKnowledgeBaseGrid';
import ChannelKnowledgeBaseComponentItem from '../ChainKnowledgeBase/ChannelKnowledgeBaseComponentItem';

const ChainKnowledgeBaseArticleContent = ({ item }) => {
  const [showFullMobileTOC, setShowFullMobileTOC] = React.useState(false);
  const isMobile = useMediaQuery(device.mobileL);
  const isTablet = useMediaQuery(device.tablet);
  const baseUrl = useSiteBaseUrl();
  const tocRef = React.useRef(null);
  const contentRef = React.useRef(null);

  // GSAP ScrollTrigger for DesktopTOC
  React.useEffect(() => {
    if (isTablet || !tocRef.current || !contentRef.current) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Calculate TOC height and check if it fits in viewport
    const tocHeight = tocRef.current?.offsetHeight || 0;
    const parentHeight = contentRef.current?.offsetHeight || 0;
    const viewportHeight = window.innerHeight;
    const endOffset = tocHeight; // TOC height + top offset

    // Only activate GSAP if TOC fits in viewport
    const tocFitsInViewport = tocHeight < viewportHeight - 256; // 256px for top/bottom margins

    let scrollTrigger = null;

    // if (tocFitsInViewport) {
    // Create ScrollTrigger for TOC sticky behavior
    scrollTrigger = ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top top+=24',
      end: `bottom top+=${endOffset}`,
      onUpdate: (self) => {
        const progress = self.progress;
        const direction = self.direction;

        if (progress > 0 && progress < 1) {
          // Parent is in viewport - make TOC sticky
          gsap.set(tocRef.current, {
            position: 'fixed',
            top: '24px',
            zIndex: 100,
          });
        } else if (progress >= 1 && direction === 1) {
          // Reached end of parent - return to normal position
          gsap.set(tocRef.current, {
            position: 'relative',
            top: 'auto',
            zIndex: 'auto',
          });
          gsap.set(tocRef.current.parentElement, {
            alignSelf: 'flex-end',
          });
        } else if (progress <= 0 && direction === -1) {
          // Scrolled above parent - return to normal position
          gsap.set(tocRef.current, {
            position: 'relative',
            top: 'auto',
            zIndex: 'auto',
          });
          gsap.set(tocRef.current.parentElement, {
            alignSelf: 'flex-start',
          });
        }
      },
    });
    // }

    return () => {
      scrollTrigger.kill();
    };
  }, [isTablet]);

  if (!item || !item.content) {
    return <p>Loading...</p>; // or some fallback UI
  }

  // Cleans up markdown text by removing leading spaces from each line,
  // except for lines that contain only '---', which are preserved as-is.
  // Also trims leading and trailing whitespace from the final output.
  const cleanMarkdown = (text: string): string => {
    return text
      .split('\n')
      .map((line: string) => {
        if (line.trim() !== '---') {
          return line.replace(/^\s+/gm, '');
        }
        return line;
      })
      .join('\n')
      .trim();
  };

  // Resolve images by adding the base url to the srs provided from content file
  function resolveImageUrls(md: string): string {
    return md.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
      (_match, alt, src) => {
        return `![${alt}](${baseUrl}${src})`;
      }
    );
  }

  // Removes emojis, numbering and spaces from header texts
  // so it can generates an id for the header
  function generateIdFromHeadingText(text: React.ReactNode): string {
    const plain = String(text)
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
      .replace(/^\d+\.\s*/, '');

    return plain
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+$/, '');
  }

  return (
    <ChainKnowledgeBaseArticleWrapper>
      <ItemV alignItems='flex-start' gap='0px'>
        <BreadcrumbList>
          <LI>
            <BreadcrumbLink to='/'>Home</BreadcrumbLink>
          </LI>
          <LI>
            <span>{'>'}</span>
          </LI>
          <LI>
            <BreadcrumbLink to='/knowledge'>Knowledge Base</BreadcrumbLink>
          </LI>
        </BreadcrumbList>

        <H1
          fontSize='3.375rem'
          fontWeight='500'
          fontFamily='N27'
          lineHeight='120%'
          letterSpacing='-1.04px'
          color='#000'
        >
          {item?.title}
        </H1>
      </ItemV>

      {item.content?.map((block, blockIndex) => {
        if (block.type === 'indexlist') {
          const texts =
            block?.value?.filter((v) => v.type === 'text' && !v.hidden) || [];
          const rawMarkdown = texts?.map((t) => t.value).join('\n\n');
          const toc = extractTOC(block?.value || []);

          // Create hidden section placeholders
          const hiddenSections = [];
          block?.value?.forEach((v) => {
            if (v.type === 'text' && v.hidden) {
              // Extract heading from hidden content
              const headingMatch = v.value.match(/^##\s+(.+)$/m);
              if (headingMatch) {
                const headingText = headingMatch[1];
                const headingId = generateIdFromHeadingText(headingText);
                hiddenSections.push({ id: headingId, text: headingText });
              }
            }
          });

          return (
            <ItemH
              key={blockIndex}
              ref={contentRef}
              flexDirection={isTablet ? 'column' : 'row'}
              gap={isTablet ? '32px' : '64px'}
              alignItems='flex-start'
              margin='32px 0 32px 0'
              style={{
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <ItemV
                maxWidth={isTablet ? '100%' : '300px'}
                minWidth={isTablet ? '100%' : '300px'}
                alignItems='flex-start'
                alignSelf='flex-start'
                flexShrink={0}
                margin={!isMobile ? '12px 0 0 0' : ''}
              >
                {isTablet && toc?.length > 0 && (
                  <MobileTOCWrapper>
                    <UL>
                      {(showFullMobileTOC ? toc : toc.slice(0, 2)).map(
                        (item, index) => {
                          const highestLevel = Math.min(
                            ...toc.map((t) => t.level)
                          );
                          return (
                            <LI>
                              <ListItem
                                key={index}
                                href={`#${item.id}`}
                                level={item.level}
                                highestLevel={highestLevel}
                              >
                                {item.text}
                              </ListItem>
                            </LI>
                          );
                        }
                      )}

                      {toc.length > 2 && (
                        <ToggleIcon
                          onClick={() =>
                            setShowFullMobileTOC(!showFullMobileTOC)
                          }
                        >
                          {showFullMobileTOC ? (
                            <BsChevronUp />
                          ) : (
                            <BsChevronDown />
                          )}
                        </ToggleIcon>
                      )}
                    </UL>
                  </MobileTOCWrapper>
                )}

                {!isTablet && toc.length > 0 && (
                  <DesktopTOC
                    ref={tocRef}
                    background='#FFF'
                    padding='32px'
                    borderRadius='32px'
                    alignItems='flex-start'
                    margin='0'
                  >
                    <UL>
                      {toc?.map((item, index) => {
                        const highestLevel = Math.min(
                          ...toc.map((t) => t.level)
                        );
                        return (
                          <LI>
                            <ListItem
                              key={index}
                              href={`#${item.id}`}
                              level={item.level}
                              highestLevel={highestLevel}
                            >
                              {item.text}
                            </ListItem>
                          </LI>
                        );
                      })}
                    </UL>
                  </DesktopTOC>
                )}
              </ItemV>

              <ItemV flex={1}>
                <TextItem>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug, rehypeRaw, rehypeSanitize]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target='_blank' rel='noopener noreferrer'>
                          {props.children}
                        </a>
                      ),
                      ...Object.fromEntries(
                        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tag) => [
                          tag,
                          ({ node, ...props }) => {
                            const id = generateIdFromHeadingText(
                              props.children
                            );

                            return React.createElement(
                              tag,
                              {
                                id,
                                className: `${tag}-text`,
                              },
                              props.children
                            );
                          },
                        ])
                      ),
                      p: ({ node, ...props }) => {
                        // For now, let's hide all paragraphs in hidden sections
                        // This is a simplified approach - we'll hide paragraphs that come after hidden headings
                        const isHidden = false; // We'll implement this logic later if needed

                        return React.createElement(
                          'p',
                          {
                            style: isHidden ? { display: 'none' } : {},
                          },
                          props.children
                        );
                      },
                    }}
                  >
                    {resolveImageUrls(cleanMarkdown(rawMarkdown))}
                  </Markdown>

                  {/* Hidden section placeholders for TOC navigation */}
                  {hiddenSections.map((section, index) => (
                    <div
                      key={`hidden-${section.id}-${index}`}
                      id={section.id}
                      style={{
                        height: '1px',
                        margin: '0',
                        padding: '0',
                        visibility: 'hidden',
                      }}
                    />
                  ))}
                </TextItem>
              </ItemV>
            </ItemH>
          );
        }

        if (block.type === 'list') {
          return (
            <ChainKnowledgeBaseGrid
              items={block?.items}
              title={block?.title}
              mode={block?.mode}
              divider={block?.divider}
            />
          );
        }

        return null;
      })}
    </ChainKnowledgeBaseArticleWrapper>
  );
};

export default ChainKnowledgeBaseArticleContent;

const ChainKnowledgeBaseArticleWrapper = styled.div`
  margin: 213px auto 0 auto;
  width: 100%;
  position: relative;
  @media ${device.mobileL} {
    margin: 153px auto 0 auto;
  }
`;

const BreadcrumbList = styled(UL)`
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  color: #000;
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  font-size: 1.25em;
  font-weight: 400;
  font-family: 'N27', sans-serif;
  line-height: 140%;
  color: #000;
  @media ${device.tablet} {
    font-size: 1em;
  }
  &:hover {
    color: #cf59e2;
  }
`;

const TextItem = styled.div`
  width: inherit;
  color: #000;
  &:not(:first-of-type) {
    margin: 12px 0 0 auto;
  }

  * {
    font-size: 1.25rem;
  }

  h1 {
    color: #000;
    font-family: N27;
    font-size: 3rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin: 64px 0 24px 0;
  }

  h2 {
    color: #000;
    font-family: N27;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin: 64px 0 24px 0;
  }

  h3 {
    color: #000;
    font-family: N27;
    font-size: 2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.64px;
    margin: 0 0 16px 0;
  }

  h4 {
    color: #000;
    font-family: N27;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.64px;
    margin: 0 0 16px 0;
  }

  h5 {
    color: #000;
    font-family: N27;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.64px;
    margin: 0 0 16px 0;
  }

  /* Apply margin-top to all h tags except the first one */
  // h1:not(:first-child),
  // h2:not(:first-child),
  // h3:not(:first-child),
  // h4:not(:first-child),
  // h5:not(:first-child),
  // h6:not(:first-child) {
  //   margin-top: 24px;
  // }

  /* Ensure the first heading has no top margin */
  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    margin-top: 0;
  }

  blockquote {
    border-left: 6px solid #d548ec;
    background: #fff;
    color: #000;
    border-radius: 12px;
    padding: 15px;
    box-sizing: border-box;
    margin: 10px 0;
  }

  ol li {
    list-style-type: decimal;
  }

  ul li {
    list-style-type: disc;
  }

  p {
    line-height: 170%;
  }

  p img,
  img {
    border-radius: 32px;
    margin: 16px 0;
  }
  @media ${device.tablet} {
    max-width: 100%;
  }
`;

const ListItem = styled.a`
  display: block;
  color: #757d8d;
  font-family: N27;
  font-size: ${({ level }) =>
    level === 1 ? '1.25em' : level === 2 ? '1.125em' : '1em'};
  margin-left: ${({ level, highestLevel }) =>
    level === highestLevel ? '0' : `${(level - highestLevel) * 15}px`};
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.4px;
  &:hover {
    color: #cf59e2;
  }
`;

const MobileTOCWrapper = styled.div`
  margin-top: 16px;
  padding: 20px;
  border-radius: 24px;
  background: #f8f8f8;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`;

const DesktopTOC = styled(ItemV)`
  align-self: flex-start;
  position: relative;
  min-width: 300px;
  width: 300px;

  justify-content: flex-start;

  max-height: 90vh;
  overflow-y: auto;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  li {
    margin: 0 !important;
  }
`;

const ToggleIcon = styled.div`
  font-size: 1.5em;
  text-align: center;
  margin-top: 12px;
  cursor: pointer;
  color: #757d8d;
  font-weight: bold;
`;
