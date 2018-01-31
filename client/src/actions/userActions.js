import {API} from '../API';

const userActions = {
  fetchDwollaUser: (url, token, dwolla_id = false) => {
    return (dispatch) => {
      API.fetchDwollaUser(url, token, dwolla_id)
        .then((data) => {
          dispatch({
            type: 'FETCH_DWOLLA_USER_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_DWOLLA_USER_FAILURE',
            error: error
          })
        })
    }
  },
  createNewDwollaUser: (data, token) => {
    return (dispatch) => {
      API.createNewDwollaUser(data, token)
        .then((data) => {
          dispatch({
            type: 'CREATE_DWOLLA_USER_SUCCESS',
            data: data
          })
          console.log(data)
        })
        .catch((error) => {
          dispatch({
            type: 'CREATE_DWOLLA_USER_FAILURE',
            error: error
          })
        })
    }
  },
  fetchById: (id, token) => {
    return (dispatch) => {
      API.fetchUserById(id, token)
        .then((data) => {
          console.log(data)
          dispatch({
            type: 'FETCH_PROFILE_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_PROFILE_FAILURE',
            error: error
          })
        })
    }
  }
};

export default userActions;
