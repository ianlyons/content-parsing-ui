import * as _ from 'lodash';
import * as newsAPI from '../apis/newsAPI';

export const getQueries = (
  { personalizationScore, tradPublisherScore },
  personalizationSources
) => {
  const editorsScore = personalizationScore;
  const personalizationAlgoScore = 100 - editorsScore;
  const untradPublisherScore = 100 - tradPublisherScore;

  // We have four queries to issue, one for each human-edited articles, personalized articles,
  // traditional publishers, and nontraditional publishers. We return a mix of articles based on that.
  return _.compact([
    // untrad publishers
    newsAPI.getEverything('a', { pageSize: untradPublisherScore }),
    // trad publishers
    newsAPI.getHeadlines({
      pageSize: tradPublisherScore,
      sources: [
        'bbc-news',
        'bloomberg',
        'the-wall-street-journal',
        'the-new-york-times',
        'the-washington-post',
      ],
    }),
    // human editors
    !_.isNil(personalizationScore) &&
      editorsScore &&
      newsAPI.getHeadlines({
        category: 'general',
        country: 'us',
        pageSize: editorsScore,
      }),
    // personalization algorithm
    !_.isNil(personalizationScore) &&
      personalizationAlgoScore &&
      newsAPI.getHeadlines({
        sources: _.map(personalizationSources, 'id'),
        pageSize: personalizationAlgoScore,
      }),
  ]);
};
