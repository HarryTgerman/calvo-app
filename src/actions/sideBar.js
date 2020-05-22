import { FETCH_SIDEBAR } from './types';
import firebase from 'firebase';


export const fetchSidebar = (sidebarState) => dispatch => {

    if(sidebarState === 'Dashboard'){
        return dispatch({
            type: FETCH_SIDEBAR,
            payload: true
        })
    }

    if(sidebarState === 'Model'){
        return dispatch({
            type: FETCH_SIDEBAR,
            payload: false
        })
    }
   

  }
