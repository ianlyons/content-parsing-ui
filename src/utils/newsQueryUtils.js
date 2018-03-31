/*

The query params returned from this function are passed directly to the /everything API of newsapi.org.
You can find full documentation here: https://newsapi.org/docs/endpoints/everything

Things we want to play with as part of this are:
- domains: comma-separated list of specific domains to serve articles from
- sources: comma-separated list of specific sources to serve articles from
- sortBy: relevancy (to the query term), popularity, publishedAt

*/

/**
 *
 * @param { publisherType, personalization, geography } - Each of these is an int from 1-10 that communicates how the news results
 *  should skew based on the setting.
 *
 * For publisherType, 0 is non-traditional publisher, 10 is traditional publisher.
 * For personalization, 0 is highly personalized, 10 is only human editors.
 * For geography, 0 is highly local, 10 is very global.
 */

// const personalizedTerms = [];
export const getQueryParams = queryConfig => {
  const geography = parseInt(queryConfig.geography, 10);
  const publisherType = parseInt(queryConfig.publisherType || 5, 10);
  const personalization = parseInt(queryConfig.personalization || 5, 10);
  console.log('geography is: ', geography);
  console.log('publisherType is: ', publisherType);
  console.log('personalization is: ', personalization);

  const sortBy = (() => {
    // If we want human editors
    if (publisherType > 5) return 'publishedAt';

    // If we want personalization algorithms
    return 'popularity';
  })();

  const sources = (() => {
    // Exceptionally global publishers
    if (geography >= 7) {
      return [
        'associated-press',
        'al-jazeera-english',
        'bloomberg',
        'cnn',
        'google-news',
        'nbc-news',
        'abc-news',
        'the-washington-post',
      ];
    } else if (geography >= 4 && geography < 7) {
      // A mix of global and local publishers
      return [];
    } else if (geography < 4) {
      // Hyperlocal publishers
      return [];
    } else {
      throw new Error(`Uncaught value for geography: ${geography}`);
    }
  })();

  return {
    sortBy,
    sources,
  };
};
