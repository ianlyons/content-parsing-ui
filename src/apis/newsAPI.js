import * as qs from 'querystring';

const baseUrl = 'https://newsapi.org/v2';

/**
 *
 * @param {string} url - The endpoint name. For the `everything` endpoint, this would be `/everything`
 * @param {*} params - Query parameters.
 * @param {*} opts - Options or overrides to be passed to the request object.
 */
export const BaseRequest = (url, params, opts = {}) => {
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
  return new Request(`${baseUrl}${url}?${qs.stringify(params)}`, allOpts);
};

export const getEverything = (query, params = {}) => {
  const allParams = Object.assign(
    {
      pageSize: 100,
      page: 1,
      q: query,
      language: 'en',
    },
    params
  );
  const req = BaseRequest('/everything', allParams);
  return fetch(req).then(res => res.json());
};
