import { FETCH_AUTHSTATUS } from './types';
import firebase from 'firebase';

export const fetchAuthState = () =>  dispatch => {
  let authState = {}
  firebase.auth().onAuthStateChanged((user)=>{
      const userProfile = firebase.auth().currentUser;
      firebase.firestore().collection("users/").doc(userProfile.uid).get().then(snapShot =>{
        if(user){
          authState = {
            authenticated: true,
            name : userProfile.displayName,
            email : userProfile.email,
            uid : userProfile.uid,
            company: snapShot.data().companyName,
          }
          return dispatch({
            type: FETCH_AUTHSTATUS,
            payload: authState
          })
        }
          else {
            authState = {
              authenticated: false,
              name : '',
              email : '',
              uid : '',
              company: '',
            }
            return dispatch({
              type: FETCH_AUTHSTATUS,
              payload: authState
          })
        }
      })
      
    })


}