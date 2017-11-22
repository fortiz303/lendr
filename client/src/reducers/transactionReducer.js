export default function transactionReduced(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TRANSACTION_SUCCESS':
      return {
        ...state,
        transaction: action.data
      }
    case 'FETCH_ALL_TRANSACTIONS':
      return {
        ...state,
        transactionFeed: action.data
      }
    default:
      return state;
  }
};
