import { handleActions } from 'redux-actions';
import { SAVEUSER } from '../types';

export default handleActions({
  [SAVEUSER](state, action) {
    const info = action.payload
    console.log(action)
    return {
      ...state,
      info
    }
  }
}, {
  info: {}
}) 