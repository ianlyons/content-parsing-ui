import * as _ from 'lodash';
import * as qs from 'querystring';

const baseRequest = (url, queryParams = {}, opts = {}) => {
  const query = _.isEmpty(queryParams) ? '' : `?${qs.stringify(queryParams)}`;
  const request = new Request(`${url}${query}`, opts);
  return fetch(request).then(res => res.json(), err => err.json());
};

export default baseRequest;
