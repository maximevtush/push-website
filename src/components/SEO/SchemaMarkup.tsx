// src/components/SchemaMarkup.tsx
// React + Web3 Essentials
import Head from '@docusaurus/Head';

// External Components
import { useTranslation } from 'react-i18next';

type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'WebPage'
  | 'Blog'
  | 'BlogPosting'
  | 'FAQPage';

interface FAQ {
  question: string;
  answer: string;
}

interface SchemaMarkupProps {
  type?: SchemaType;

  // Site-level defaults (pass origin like "https://push.org")
  siteUrl?: string; // strongly recommended
  siteName?: string; // default: "Push Chain"
  logoUrl?: string; // absolute PNG/SVG (not .ico)
  sameAs?: string[]; // socials

  // Page fields
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string; // absolute preferred
  inLanguage?: string; // e.g., "en", "en-US"

  // FAQ
  faqs?: FAQ[];

  // WebSite search
  searchTarget?: string; // e.g., "https://push.org/search?q={search_term_string}"
}

export default function SchemaMarkup({
  type = 'Organization',
  siteUrl = 'https://push.org',
  logoUrl = 'https://push.org/assets/website/brand/logo-512.png',
  sameAs = [
    'https://x.com/PushChain',
    'https://www.youtube.com/@PushChain',
    'https://www.linkedin.com/company/push-chain',
    'https://discord.com/invite/pushchain',
    'https://www.instagram.com/pushprotocol/',
    'https://t.me/epnsproject',
    'https://t.me/epnsprojectnews',
    'https://github.com/pushchain',
  ],

  pageTitle,
  pageDescription,
  pageUrl,
  inLanguage = 'en',

  faqs,
  searchTarget = 'https://push.org/search?q={search_term_string}',
}: SchemaMarkupProps): JSX.Element {
  const { t } = useTranslation();

  // Convert to translated description
  const translatedSiteName = pageTitle || t('global.site-name');
  const translatedDescription = pageDescription || t('global.site-description');

  const orgId = `${siteUrl.replace(/\/$/, '')}/#organization`;
  const webId = `${siteUrl.replace(/\/$/, '')}/#website`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: t('global.site-name'),
    url: `${siteUrl}/`,
    description: t('global.site-description'),
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 512,
      height: 512,
    },
    sameAs,
    contactPoint: [
      // add/adjust as you create these inboxes
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@push.org',
        availableLanguage: [
          'en',
          'zh',
          'es',
          'hi',
          'ko',
          'ja',
          'pt',
          'ru',
          'tr',
          'fr',
          'id',
          'vi',
          'de',
          'ar',
        ],
      },
    ],
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': webId,
    url: `${siteUrl}/`,
    name: t('global.site-name'),
    publisher: { '@id': orgId },
    potentialAction: {
      '@type': 'SearchAction',
      target: searchTarget,
      'query-input': 'required name=search_term_string',
    },
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl ? `${pageUrl}#webpage` : undefined,
    url: pageUrl,
    name: translatedSiteName,
    description: translatedDescription,
    inLanguage,
    isPartOf: { '@id': webId },
  };

  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl.replace(/\/$/, '')}/blog#blog`,
    url: `${siteUrl}/blog`,
    name: t('pages.blog.seo.title'),
    description: t('pages.blog.seo.description'),
    publisher: { '@id': orgId },
  };

  // Helper function to clean text for schema markup
  const cleanTextForSchema = (text: string): string => {
    return text
      .replace(/<\d+>/g, '') // Remove opening tags like <1>, <2>
      .replace(/<\/\d+>/g, '') // Remove closing tags like </1>, </2>
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .trim();
  };

  // Default FAQs if none provided
  const defaultFaqs = [
    {
      question: t('components.short-faq-snippet.faqs.faq1.question'),
      answer: cleanTextForSchema(
        t('components.short-faq-snippet.faqs.faq1.answer')
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq2.question'),
      answer: cleanTextForSchema(
        t('components.short-faq-snippet.faqs.faq2.answer')
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq3.question'),
      answer: cleanTextForSchema(
        t('components.short-faq-snippet.faqs.faq3.answer')
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq4.question'),
      answer: cleanTextForSchema(
        t('components.short-faq-snippet.faqs.faq4.answer')
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq5.question'),
      answer: cleanTextForSchema(
        t('components.short-faq-snippet.faqs.faq5.answer')
      ),
    },
    {
      question: t('components.short-faq-snippet.faqs.faq6.question'),
      answer: cleanTextForSchema(
        t('components.short-faq-snippet.faqs.faq6.answer')
      ),
    },
  ];

  // Use provided FAQs or defaults, and clean any provided FAQs
  const cleanedFaqs = faqs
    ? faqs.map(({ question, answer }) => ({
        question,
        answer: cleanTextForSchema(answer),
      }))
    : defaultFaqs;

  const faqPage =
    cleanedFaqs && cleanedFaqs.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: cleanedFaqs.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }
      : null;

  let schema: object | null;
  switch (type) {
    case 'WebSite':
      schema = webSite;
      break;
    case 'WebPage':
      schema = webPage;
      break;
    case 'Blog':
      schema = blog;
      break;
    case 'FAQPage':
      schema = faqPage;
      break;
    case 'Organization':
    default:
      schema = organization;
      break;
  }

  return (
    <Head>
      <script type='application/ld+json'>{JSON.stringify(schema)}</script>
    </Head>
  );
}
