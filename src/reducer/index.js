import { combineReducers } from 'redux';
import userData from './LoginReducer';

const rootReducer = combineReducers( {
  userData
}
);

export default rootReducer;
