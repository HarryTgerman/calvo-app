import { FETCH_MODEL } from '../actions/types';

const initialState = {
    items: false,
  }


export default function(state = initialState , action) {
  switch (action.type) {
    case FETCH_MODEL:
    return {
        ...state,
       items: action.payload
     };
    default: return state;

  }
}