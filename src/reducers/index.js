import { combineReducers } from 'redux';
import authReducer from './authReducer'
import modelReducer from './modelStateReducer'
import modelStreamReducer from './modelStateStreamReducer'
import projectStateReducer from './projectStateReducer'
import sidebarReducer from './sidebarReducer'



export default combineReducers({
  streamState: modelStreamReducer,
  modelState: modelReducer,
  authState: authReducer,
  projectState: projectStateReducer,
  sidebarState: sidebarReducer,
})