import { createAction } from 'redux-actions'
import { SAVEUSER } from '../types'

export const saveUser = createAction(SAVEUSER, data => data);