import {API} from '../API';

const transactionActions = {
  lock: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true})
      API.lockTransaction(id, token)
        .then((data) => {
          dispatch({
            type: 'LOCK_TRANSACTION_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'LOCK_TRANSACTION_FAILURE',
            error: error
          })
        })
    }
  },
  free: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true})
      API.freeTransaction(id, token)
        .then((data) => {
          dispatch({
            type: 'FREE_TRANSACTION_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'FREE_TRANSACTION_FAILURE',
            error: error
          })
        })
    }
  },
  accept: (data, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.acceptLoan(data, token)
        .then((data) => {
          dispatch({
            type: 'LOAN_ACCEPTANCE_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'LOAN_ACCEPTANCE_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  new: (data, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.newTransaction(data, token)
        .then((data) => {
          dispatch({
            type: 'NEW_TRANSACTION_SUCCESS',
            data: data,
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'NEW_TRANSACTION_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  fetchById: (id, token) => {
    return (dispatch) => {
      API.fetchTransactionById(id, token)
        .then((data) => {
          dispatch({
            type: 'FETCH_TRANSACTION_SUCCESS',
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
  },
  fetchAllBorrowedForUser: (id, token) => {
    return (dispatch) => {
      API.fetchTransactionsByUserId(id, token)
        .then((data) => {
          dispatch({
            type: 'FETCH_TRANSACTIONS_FOR_USER_SUCCESS',
            borrowHistory: data.data,
            lendHistory: []
          })
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_TRANSACTIONS_FOR_USER_FAILURE',
            error: error
          })
        })
    }
  },
  fetchAll: (token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.fetchAllTransactions(token)
        .then((data) => {
          dispatch({
            type: 'FETCH_ALL_TRANSACTIONS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  }
};

export default transactionActions;
