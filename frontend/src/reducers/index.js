/******************************* ALL DATA REDUCERS **********************************/
/*---------IMPORT----------*/
import { combineReducers } from 'redux'; /* récup' ALL et envoi vers le store */
import userReducer from './userReducer';
import allUsersReducer from './allUsersReducer';
import postReducer from './postReducer';


/*---------EXPORT----------*/
export default combineReducers({
    userReducer,
    allUsersReducer,
    postReducer
});