import {API} from '../API';

const transactionActions = {
  new: (data) => {
    return (dispatch) => {
      API.newTransaction(data)
        .then((data) => {
          dispatch({
            type: 'NEW_TRANSACTION_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'NEW_TRANSACTION_FAILURE',
            error: error
          })
        })
    }
  },
  fetchAll: (token) => {
    return (dispatch) => {
      API.fetchAllTransactions(token)
        .then((data) => {
          dispatch({
            type: 'FETCH_ALL_TRANSACTIONS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: error
          })
        })
    }
  }
};

export default transactionActions;
