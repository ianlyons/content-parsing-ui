import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import './LoginScene.css';

export default class LoginScene extends React.Component {
  render() {
    const { onLogin } = this.props;
    return (
      <div className="LoginScene">
        <div className="LoginScene-prompt">
          We'd like to use your Facebook account to serve you content that's personalized to things
          you've Liked. Please log in!
        </div>
        <FacebookLogin
          fields="public_profile,email,user_likes"
          callback={onLogin}
          autoLoad={true}
          appId="1453532308082274"
        />
      </div>
    );
  }
}
