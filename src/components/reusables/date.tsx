import { usePluralForm } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import moment from 'moment';
import React from 'react';

export function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime }
      )
    );
  };
}

export function Spacer() {
  return <>{' · '}</>;
}

export function ReadingTime({ readingTime }) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

export function Date({ date, formattedDate, mr }: { date?: string; formattedDate?: string; mr?: string } = {}) {
  // Early return if no date data is available
  if (!date && !formattedDate) {
    return (
      <time style={{ marginRight: mr }} itemProp='datePublished'>
        Unknown date
      </time>
    );
  }

  const year = moment().year();

  // Try multiple parsing strategies
  let parsedDate;

  // Strategy 1: Try parsing formattedDate with expected format
  if (formattedDate) {
    parsedDate = moment(formattedDate, 'MMM DD, YYYY');
  }

  // Strategy 2: Try parsing formattedDate without strict format
  if (!parsedDate?.isValid() && formattedDate) {
    parsedDate = moment(formattedDate);
  }

  // Strategy 3: Try parsing raw date
  if (!parsedDate?.isValid() && date) {
    parsedDate = moment(date);
  }

  // If all parsing fails, return the original strings
  if (!parsedDate?.isValid()) {
    return (
      <time
        style={{ marginRight: mr }}
        dateTime={date}
        itemProp='datePublished'
      >
        {formattedDate || date || 'Unknown date'}
      </time>
    );
  }

  const isPresentYear = parsedDate.year() === year;
  const newDate = parsedDate.format(!isPresentYear ? 'MMM DD, YYYY' : 'MMM DD');

  return (
    <time style={{ marginRight: mr }} dateTime={date} itemProp='datePublished'>
      {newDate}
    </time>
  );
}
