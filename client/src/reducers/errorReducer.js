export default function transactionReduced(state = {}, action) {
  switch (action.type) {
    case 'MODAL':
      return {
        ...state,
        modal: {
          ...action.data
        }
      }
    case 'NEW_ERROR':
      return {
        ...state,
        error: JSON.stringify(action.error.message)
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
