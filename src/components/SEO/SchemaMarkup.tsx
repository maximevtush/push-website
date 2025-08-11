// React + Web3 Essentials
import Head from '@docusaurus/Head';
import React from 'react';

// Schema markup types
interface SchemaMarkupProps {
  type?: 'Organization' | 'WebSite' | 'Article' | 'Blog';
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  articleAuthor?: string;
  datePublished?: string;
  dateModified?: string;
}

export default function SchemaMarkup({
  type = 'Organization',
  pageTitle,
  pageDescription,
  pageUrl,
  articleAuthor,
  datePublished,
  dateModified,
}: SchemaMarkupProps): JSX.Element {
  // Base organization schema
  const organizationSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'Pushhh Chain',
    description: 'Any Chain. Any User. Any App',
    url: 'https://push.org',
    logo: '/assets/website/favicon.ico',
    sameAs: [
      'https://x.com/PushChain',
      'https://www.linkedin.com/company/push-protocol/mycompany/',
    ],
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Push Chain',
    description:
      pageDescription ||
      'Universal blockchain for any chain, any user, any app',
    url: pageUrl || 'https://push.org',
    publisher: {
      '@type': 'Organization',
      name: 'Push Chain',
      logo: '/assets/website/favicon.ico',
    },
  };

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    headline: pageTitle,
    description: pageDescription,
    url: pageUrl,
    author: {
      '@type': 'Organization',
      name: articleAuthor || 'Push Chain Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Push Chain',
      logo: '/assets/website/favicon.ico',
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
  };

  // Blog schema
  const blogSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Blog',
    name: 'Push Chain Blog',
    description:
      pageDescription ||
      'Latest updates, technical insights, and developer stories from Push Chain',
    url: pageUrl || 'https://push.org/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Push Chain',
      logo: '/assets/website/favicon.ico',
    },
  };

  // Select appropriate schema based on type
  let schema;
  switch (type) {
    case 'WebSite':
      schema = websiteSchema;
      break;
    case 'Article':
      schema = articleSchema;
      break;
    case 'Blog':
      schema = blogSchema;
      break;
    case 'Organization':
    default:
      schema = organizationSchema;
      break;
  }

  return (
    <Head>
      <script type='application/ld+json'>{JSON.stringify(schema)}</script>
    </Head>
  );
}
