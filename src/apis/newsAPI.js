import * as qs from 'querystring';
import * as _ from 'lodash';

const baseUrl = 'https://newsapi.org/v2';

/**
 *
 * @param {string} url - The endpoint name. For the `everything` endpoint, this would be `/everything`
 * @param {*} params - Query parameters.
 * @param {*} opts - Options or overrides to be passed to the request object.
 */
export const baseRequest = (url, params, opts = {}) => {
  // Set up authentication so consumers of this don't need to worry about it. Can be overridden
  // by the passed-in params.
  const allOpts = Object.assign(
    {
      headers: {
        Authorization: window.NEWS_API_KEY,
      },
    },
    opts
  );
  const req = new Request(`${baseUrl}${url}?${qs.stringify(params)}`, allOpts);
  return fetch(req).then(res => res.json(), err => err.json());
};

export const getEverything = (query, params = {}) => {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const allParams = Object.assign(
    {
      // we need a number divisible by 6, because that's how many articles we have per row
      pageSize: 96,
      page: 1,
      q: query,
      language: 'en',
      from: yesterdayDate.toISOString(),
    },
    params
  );

  // We want sources/domains to go up as a comma-separated list
  if (_.isArray(allParams.sources)) {
    allParams.sources = allParams.sources.join(',');
  }

  if (_.isArray(allParams.domains)) {
    allParams.domain = allParams.domain.join(',');
  }

  console.info(`Querying with params: ${JSON.stringify(allParams, undefined, 2)}`);

  return baseRequest('/everything', allParams);
};

export const getSources = (params = {}) => {
  const allParams = Object.assign(
    {
      country: 'us',
      language: 'en',
    },
    params
  );

  return baseRequest(`/sources`, allParams);
};
