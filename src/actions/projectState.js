import { FETCH_PROJECTS } from './types';
import firebase from 'firebase';

export const fetchProjectState = () => dispatch => {
    firebase.auth().onAuthStateChanged((user)=>{
        const userProfile = firebase.auth().currentUser;
        let data = []
        firebase.firestore().collection("models/").doc(userProfile.uid).collection('projects').orderBy('timestamp', 'asc').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(e => {
            data.push({stream: e.data(), id: e.id, timestamp: e.data().timestamp})
            })
            return dispatch({
                type: FETCH_PROJECTS,
                payload: data
            })
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    })
  }
