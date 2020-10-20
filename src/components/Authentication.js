import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import EventCoordinator from './EventCoordinator';
import  { Auth }  from 'aws-amplify';

export function logoutUser(authSystem) {
  if(authSystem === "cognito") {
    //return new Promise(function(resolve, reject) {
      Auth.signOut()
      .then(value => {
        EventCoordinator.signal('auth', {type:'signOut', data:null, message:'Sucessfully signed out through Cognito'});
        //resolve('Logged out');
      })
      .catch(error => {
        console.log("[CognitoAuthentication] Auth.signIn Error : " + error.message);
        //reject(error);
      });
    //});
  }
}

export function withAuthenticator(WrappedComponent, authSystem) {

    return class extends React.Component {
      state = {
        isSignedIn: false,
        userData :null,
        errorMessage:''
      };

      constructor(props) {
        super(props);
       
        EventCoordinator.register('auth', ({ payload }) => {
          const { type } = payload;
          switch (type) {
            case 'signIn':
              this.setState({isSignedIn: true, errorMessage:null, userData:null});
              localStorage.setItem('@user-signed-in-to-app', 'true');
              break;
            case 'newPassword':
              this.setState({userData: payload.data});
              break;
            case 'signOut':
              this.setState({isSignedIn: false});
              if(payload.errorMessage) {
                this.setState({errorMessage: payload.errorMessage});
              }
              localStorage.removeItem('@user-signed-in-to-app');
              break;
          }
        });

      }
  
      componentDidMount() {
        var value = localStorage.getItem('@user-signed-in-to-app');
        console.log("localstorage value:"+value);
        
        if(value === 'true') {
          this.setState({isSignedIn: true});
        }
      }
  
      componentWillUnmount() {

      }
  
       onLogin = async (email, pwd) => {
          if(authSystem === "cognito") {
            return new Promise(function(resolve, reject) {
                Auth.signIn(email, pwd)
                .then(user => {
                  if(user.challengeName === 'NEW_PASSWORD_REQUIRED'){
                    EventCoordinator.signal('auth', {type:'newPassword', data:{user:user, email:email}, message:'Need new password'});
                  } else {
                    EventCoordinator.signal('auth', {type:'signIn', data:user, message:'Successfull Cognito user sign in'});
                  }
                  resolve(user);
                })
                .catch(error => {
                  console.log("[CognitoAuthentication] Auth.signIn Error : " + error.message);
                  reject(error);
                });
            });
          } else {
            throw Error("Unsupported authentication system.");
          }
      }
  
      onNewPassword =  (user, email, pwd) => {
        if(authSystem === "cognito") {
          return new Promise(function(resolve, reject) {
            Auth.completeNewPassword(
              user,               // the Cognito User Object
              pwd,       // the new password
              {
                email,
              }
            ).then(signedInUser => {
                EventCoordinator.signal('auth', {type:'signIn', data:signedInUser, message:'Successfull Cognito user sign in'});
                resolve(user);
              })
              .catch(error => {
                console.log("[CognitoAuthentication] Auth.signIn Error : " + error.message);
                reject(error);
              });
          });
        } else {
          throw Error("Unsupported authentication system.");
        }
      }

      render() {
        if(this.state.isSignedIn) {
          return <WrappedComponent {...this.props} />
        }else if (!this.state.isSignedIn && this.state.userData !== null) {
          return <NewPasswordScreen user={this.state.userData.user} email={this.state.userData.email} onNewPassword={this.onNewPassword.bind(this)}/>
        }else {
          return <LoginScreen errorMessage={this.state.errorMessage} onLogin={this.onLogin.bind(this)}/>
        }
      }
    };
}