import baseRequest from './baseRequest';

export const getLoginStatus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      window.FB.getLoginStatus(resolve, reject);
    }, 100);
  });
};

export const getLikes = (userId, accessToken) => {
  const url = `https://graph.facebook.com/v2.12/${userId}/likes`;
  return baseRequest(url, { access_token: accessToken });
};

export const getAllLikes = async (userId, accesstoken) => {
  let response = await getLikes(userId, accesstoken);
  // copy to remove reference
  let allLikes = response.data.slice(0);
  while (response.paging.next) {
    response = await baseRequest(response.paging.next);
    allLikes = allLikes.concat(response.data);
  }

  return allLikes;
};
