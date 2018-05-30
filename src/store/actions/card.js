import { SAVECARDS, MODIFYCARD } from '../types/card'
import { createAction } from 'redux-actions'
import { fetchCards } from "../../net/requests";

export const syncCards = createAction(SAVECARDS, () => {
  console.log('sdfjkasfskaf')
  return fetchCards().then(res => {
    if (res.code === 200) {
      return {
        cards: res.data
      }
    }
  });
});

export const modifyCard = createAction(MODIFYCARD, (data) => {
  return {
    card: data
  }
});

