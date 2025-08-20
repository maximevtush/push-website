export const KBDeepDivesList = {
  title: 'pages.knowledge.deepdives.explainer-section.blocks.title',
  content: [
    {
      type: 'indexlist',
      topGap: false,
      bottomGap: false,
      value: [
        {
          type: 'text',
          valueKey:
            'pages.knowledge.deepdives.explainer-section.blocks.sections.architecture-deep-dives.items.overview',
        },
        {
          type: 'text',
          hidden: true,
          value: `## Curated Reads 👇`,
        },
      ],
    },

    {
      title: 'Learn what makes Push Chain tick!',
      type: 'list',
      topGap: true,
      bottomGap: true,
      variant: 'row',
      items: [
        {
          slug: 'interop-spectrum',
          image: 'interop-spectrum',
          title: 'Interop as a Spectrum',
          url: '/blog/interop-spectrum',
          target: '_blank',
        },
        {
          slug: 'understand-proof-of-stake-part-1',
          image: 'understand-proof-of-stake',
          title: 'Understanding Proof of Stake (POS) - Part 1',
          url: '/blog/understand-proof-of-stake',
          target: '_blank',
        },
      ],
    },
  ],
};
