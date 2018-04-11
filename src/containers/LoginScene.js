import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import LoginButton from '../components/LoginButton/LoginButton';
import './LoginScene.css';

console.log(FacebookLogin);

export default class LoginScene extends React.Component {
  render() {
    const { onLogin } = this.props;
    return (
      <div className="LoginScene">
        <div className="LoginScene-prompt">
          We'd like to use your Facebook account to serve you content that's personalized to things
          you've Liked. Please log in using the dialog below:
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
