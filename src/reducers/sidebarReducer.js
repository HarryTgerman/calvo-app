import { FETCH_SIDEBAR } from '../actions/types';

const initialState = {
    items: {
      
    }
  }


export default function(state = initialState , action) {
  switch (action.type) {
    case FETCH_SIDEBAR:
    return {
        ...state,
       items: action.payload
     };
    default: return state;

  }
}