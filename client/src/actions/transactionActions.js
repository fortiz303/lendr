import {API} from '../API';

const transactionActions = {
  accept: (data, token) => {
    return (dispatch) => {
      API.acceptLoan(data, token)
        .then((data) => {
          dispatch({
            type: 'LOAN_ACCEPTANCE_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'LOAN_ACCEPTANCE_FAILURE',
            error: error
          })
        })
    }
  },
  new: (data, token) => {
    return (dispatch) => {
      API.newTransaction(data, token)
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
