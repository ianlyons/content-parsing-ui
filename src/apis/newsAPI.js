export const get = () => {
  const url =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=377fd71cddec43ef803e2daf782744de';
  const req = new Request(url);
  return fetch(req).then(res => res.json());
};
