/* eslint-disable no-irregular-whitespace */
// Knowledge Base Content Configuration:
// - Add a new object with the following fields:
//   - `id`: identifier for the knowledge base item.
//   - `image`, `subtitle`: Metadata for the item.
//   - `title` & `content`: Each object has a title & content, which is in the /content folder. Add the title in the object in this directory and  // Use HTML or Markdown to create the article (similar to the blog section).
//   - `url`: For external links, provide the full URL instead of using `content`.

export const KBResourcesList = [
  {
    id: 'push101',
    url: 'push101',
    title: 'Push Chain Basics',
    ctatitle: 'Explore More',
    target: '_self',
    // image: 'knowledge_101',
    subtitle:
      "Learn about basics of Push Chain, It's innovations and why it is required",
    image: require(`@site/static/assets/website/docshub/WhitePushLogo.png`)
      .default,
    image2x: require(`@site/static/assets/website/docshub/WhitePushLogo@2x.png`)
      .default,
    image3x: require(`@site/static/assets/website/docshub/WhitePushLogo@3x.png`)
      .default,
    // bgImage: require(`@site/static/assets/website/docshub/BG.png`).default,
    bgColor: '#dd6fff',
    bgStylizing: {
      type: 'sparkle',
      density: 40,
      size: 10,
      minOpacity: 0.25,
      maxOpacity: 0.55,
    },
    customWidth: '70px',
  },
  {
    id: 'builders',
    url: 'builders',
    title: 'Build on Push Chain',
    ctatitle: 'Builders Assemble',
    target: '_self',
    // image: 'knowledge_builders',
    subtitle:
      'Dive into how to build universal apps, what it unlocks and how to get started!',
    image: require(`@site/static/assets/website/docshub/BuildOnPushIcon.png`)
      .default,
    image2x: require(
      `@site/static/assets/website/docshub/BuildOnPushIcon@2x.png`
    ).default,
    image3x: require(
      `@site/static/assets/website/docshub/BuildOnPushIcon@3x.png`
    ).default,
    // bgImage: require(`@site/static/assets/website/docshub/BlackBG.png`).default,
    bgColor: 'var(--ifm-color-neutral-1100)',
    bgStylizing: {
      type: 'sparkle',
      density: 40,
      size: 10,
    },
    customWidth: '113px',
  },
  {
    id: 'deepdives',
    url: 'deepdives',
    title: 'Technical Deep Dives',
    ctatitle: 'See it Tick',
    target: '_self',
    // image: 'knowledge_deepdives',
    subtitle:
      'Want to know the intricate working of Push? or just a curious fellow? Eitherway, say hello!',
    image: require(
      `@site/static/assets/website/docshub/TechnicalDeepDivesIcon.png`
    ).default,
    image2x: require(
      `@site/static/assets/website/docshub/TechnicalDeepDivesIcon@2x.png`
    ).default,
    image3x: require(
      `@site/static/assets/website/docshub/TechnicalDeepDivesIcon@3x.png`
    ).default,
    // bgImage: require(`@site/static/assets/website/docshub/BlackBG.png`).default,
    bgColor: 'var(--ifm-color-neutral-1100)',
    bgStylizing: {
      type: 'sparkle',
      density: 40,
      size: 10,
    },
    customWidth: '103px',
  },
  {
    id: 'devdocs',
    // image: 'knowledge_devdocs',
    title: 'Developer Docs',
    subtitle: `Let's come straight to the point! I am a universal chain... and you are a dev, let's make it official!`,
    url: '/docs',
    target: '_self',
    ctatitle: 'Build Now',
    image: require(`@site/static/assets/website/docshub/DeveloperDocsIcon.png`)
      .default,
    image2x: require(
      `@site/static/assets/website/docshub/DeveloperDocsIcon@2x.png`
    ).default,
    image3x: require(
      `@site/static/assets/website/docshub/DeveloperDocsIcon@3x.png`
    ).default,
    // bgImage: require(`@site/static/assets/website/docshub/BlueBG.png`).default,
    bgColor: '#4277F7',
    bgStylizing: {
      type: 'lines',
      gridSize: 30,
      color: 'white',
      opacity: 0.2,
    },
    customWidth: '90px',
  },
  {
    id: 'tokenomics',
    // image: 'knowledge_tokenomics',
    title: 'Explore Tokenomics',
    subtitle: `Learn how our tokenomics incentivizes and ensures sustainable network that's built to last`,
    url: 'tokenomics',
    target: '_self',
    ctatitle: 'Learn Token Design',
    image: require(`@site/static/assets/website/docshub/TokenomicsIcon.png`)
      .default,
    image2x: require(
      `@site/static/assets/website/docshub/TokenomicsIcon@2x.png`
    ).default,
    image3x: require(
      `@site/static/assets/website/docshub/TokenomicsIcon@3x.png`
    ).default,
    // bgImage: require(`@site/static/assets/website/docshub/BlackBG.png`).default,
    bgColor: 'var(--ifm-color-neutral-1100)',
    bgStylizing: {
      type: 'sparkle',
      density: 40,
      size: 10,
    },
  },
  {
    id: 'faq',
    // image: 'frequently-asked-questions',
    title: 'FAQs',
    subtitle:
      'The place to find answers to all the popular questions the community has asked',
    url: 'faq',
    target: '_self',
    ctatitle: 'Read More',
    image: require(`@site/static/assets/website/docshub/FAQIcons.png`).default,
    image2x: require(`@site/static/assets/website/docshub/FAQIcons@2x.png`)
      .default,
    image3x: require(`@site/static/assets/website/docshub/FAQIcons@3x.png`)
      .default,
    // bgImage: require(`@site/static/assets/website/docshub/BlackBG.png`).default,
    bgColor: 'var(--ifm-color-neutral-1100)',
    bgStylizing: {
      type: 'sparkle',
      density: 40,
      size: 10,
    },
    customWidth: '70px',
  },
];
