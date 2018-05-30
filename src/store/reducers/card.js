import { handleActions } from 'redux-actions'
import { SAVECARDS, MODIFYCARD } from '../types/card'

export default handleActions(
  {
    [SAVECARDS](state, action) {
      const { cards } = action.payload;
      const vcards = cards.filter(item => item.cardType === 0)[0];
      const ecards = cards.filter(item => item.cardType === 1)[0];
      let allCards = [];
      if (vcards) {
        allCards = [...allCards, ...vcards.payCards];
      }
      if (ecards) {
        allCards = [...allCards, ...ecards.payCards];
      }

      return {
        ...state,
        cards: [...state.cards, ...cards],
        vCardList: vcards && vcards.payCards,
        eCardList: ecards && ecards.payCards,
        allCards
      };
    },
    [MODIFYCARD](state, action) {
      const { card } = action.payload
      const allCards = state.allCards.map(currCard => {
        if (currCard.id === card.id) {
          return {...currCard, ...card}
        } else {
          return currCard
        }
      })
      console.log(allCards)
      return {
        ...state,
        allCards
      }
    },
  },
  {
    cards: [],
    vCardList: [],
    eCardList: []
  }
);