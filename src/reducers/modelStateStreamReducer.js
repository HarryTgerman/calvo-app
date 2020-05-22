import { FETCH_MODELSTREAMS } from '../actions/types';

const initialState = {
    items: false
  }


export default function(state = initialState , action) {
  switch (action.type) {
    case FETCH_MODELSTREAMS:
    return {
        ...state,
       items: action.payload
     };
    default: return state;

  }
}