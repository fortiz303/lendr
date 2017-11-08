export default function transactionReduced(state = {}, action) {
  switch (action.type) {
    case 'NEW_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'CLEAR_ALL_ERRORS':
      return {
        ...state,
        error: false
      }
    default:
      return state;
  }
};
