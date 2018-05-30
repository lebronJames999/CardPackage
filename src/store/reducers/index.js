import { combineReducers } from 'redux'
import card from './card'
import user from './user';


export default combineReducers({
  card,
  user
});