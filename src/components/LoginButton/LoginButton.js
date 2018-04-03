import * as React from 'react';

window.checkLoginState = () => console.info('User is authorized.');

const loginHtml = `
  <fb:login-button  
    scope="public_profile,email,user_likes"
    onlogin="checkLoginState();">
  </fb:login-button>
`;

export default class LoginButton extends React.Component {
  render() {
    return <div className="Login" dangerouslySetInnerHTML={{ __html: loginHtml }} />;
  }
}
