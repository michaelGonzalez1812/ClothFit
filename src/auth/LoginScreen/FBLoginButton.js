
import React from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
import { firebase } from '../../firebase/config';
import styles from './styles';

export default function FBLoginButton() {

  const manageFirebaseAuth = (data) => {
        var credentials = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        firebase.auth().signInWithCredential(credentials).then((userCredential) => {
          if (userCredential.additionalUserInfo.isNewUser) {
            let infoRequest = new GraphRequest('/me', {
              httpMethod: 'GET',
              parameters: {
                'fields': {
                  'string': 'email,first_name,last_name,name_format,picture'
                }
              }
            }, (error, result) => {
              if (error) {
                console.error('Error fetching data from Facebook: ' + error.toString());
              } else {
                const uid = userCredential.user.uid;
                const data = {
                  id: uid,
                  email: result.email,
                  fullName: result.first_name + ' ' + result.last_name,
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
              }
            });

            new GraphRequestManager().addRequest(infoRequest).start();
          }
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('Email already associated with another account.');
            //TODO: Handle account linking here, if using.
          } else {
            console.error(error);
          }
        });
      }

      const onFBLoginFinished = (error, result) => {
          if (error) {
            alert("error en inicio de sesión con FB: " + error.message);
          } else if (result.isCancelled) {
            alert("El inicio de sesión fue cancelado");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => { manageFirebaseAuth(data) });
          }
      };
    
    
      return (
        <View>
          <LoginButton
            style={styles.socialMediaButton}
            permissions={["email", "public_profile"]}
            onLoginFinished={(error, result) => onFBLoginFinished(error, result) }
            onLogoutFinished={() => { alert("User logged out") }} />
        </View>
      );
  };
