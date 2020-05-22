import { FETCH_MODELSTREAMS } from './types';
import firebase from 'firebase';

  
  export const fetchModelStreamsState = (id) =>  dispatch => {
    if(id === false){
        return dispatch({
            type: FETCH_MODELSTREAMS,
            payload: false
        })
    }else{
    firebase.auth().onAuthStateChanged((user)=>{
        const userProfile = firebase.auth().currentUser;
        let data = []
        firebase.firestore().collection("models/").doc(userProfile.uid).collection('projects').doc(id).collection("streams").orderBy('timestamp', 'asc').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(e => {
            data.push({stream: e.data(), id: e.id, timestamp: e.data().timestamp})
            })
            return dispatch({
                type: FETCH_MODELSTREAMS,
                payload: data
            })
        })
        .catch(function(error) {
            
        });
    })
    }
  }