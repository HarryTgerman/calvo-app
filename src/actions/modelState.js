import { FETCH_MODEL } from './types';
import firebase from 'firebase';

export const fetchModelState = (id) =>  dispatch => {
    if(id === false){
        return dispatch({
            type: FETCH_MODEL,
            payload: false
        })
    }else{ firebase.auth().onAuthStateChanged((user)=>{
        const userProfile = firebase.auth().currentUser;
        firebase.firestore().collection("models/").doc(userProfile.uid).collection('projects').doc(id).get()
        .then(function(querySnapshot) {
            let snap = querySnapshot.data()
            snap.projectId = id

                return dispatch({
                    type: FETCH_MODEL,
                    payload: snap
                })
            })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    })}
    
    
  }

