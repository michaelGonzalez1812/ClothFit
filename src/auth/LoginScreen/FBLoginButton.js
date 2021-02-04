
import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { firebase } from '../../firebase/config';

export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          permissions={["email", "public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    alert("token" + data.accessToken.toString())

                    console.log("before provider");
                    var credentials = firebase.auth.FacebookAuthProvider.credential(
                      data.accessToken
                    );
                    console.log("data", data);
                    console.log("data.accessToken", data.accessToken);
                    console.log("Credentials", credentials);
                    console.log("before in sign in with credential");

                    firebase.auth().signInWithCredential(credentials).then((userCredential) => {
                      console.log('userCredential: ', userCredential);
                      console.log('in sign in with credential succeeded!');
                      console.log("is new user: ", userCredential.additionalUserInfo.isNewUser);
                      if (userCredential.additionalUserInfo.isNewUser) {
                            console.log(data.accessToken.toString())
                            let infoRequest = new GraphRequest('/me', {
                              httpMethod: 'GET',
                              parameters: {
                                'fields': {
                                  'string': 'email,first_name,last_name,name_format,picture'
                                }
                              }
                            }, (error, result) => {
                              console.log("err------------")
                              console.log(error)
                              console.log("res------------")
                              console.log(result);
                              console.log("userCredential.user.uid ", userCredential.user.uid);
                              const uid = userCredential.user.uid;
                              const data = {
                                id: uid,
                                email: result.email,
                                first_name: result.first_name,
                                last_name: result.last_name,
                                isProvider: false,
                                balance: 0,
                                providers: [],
                                clients: []
                              };
                              const usersRef = firebase.firestore().collection('users')
                              usersRef
                                .doc(uid)
                                .set(data)
                                .catch((error) => {
                                  alert(error)
                                });

                            });

                            new GraphRequestManager().addRequest(infoRequest).start();
                          
                      }
                    }).catch(function (error) {
                      console.log("in sign in with credential");
                      console.error(error);
                      console.log("--------------------------");
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      // The email of the user's account used.
                      var email = error.email;
                      // The firebase.auth.AuthCredential type that was used.
                      var credential = error.credential;
                      if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('Email already associated with another account.');
                        // Handle account linking here, if using.
                      } else {
                        console.error(error);
                      }
                    });
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            alert("User logged out")
          }} />
      </View>
    );
  }
};


module.exports = FBLoginButton;