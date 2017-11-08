import {API} from '../API';

const authActions = {
  authenticate: (token) => {
    return (dispatch) => {
      API.authenticate(token)
        .then((data) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'LOGIN_FAILURE',
            error: error
          })
        })
    }
  },
  setToken: (token) => {
    return {
      type: 'SET_USER_TOKEN_FROM_SESSION',
      token: token
    }
  },
  returnAuthStatus: () => {
    return (dispatch) => {
      dispatch({
        type: 'AUTH_STATUS',
        status: false
      })
    }
  },
  loginUser: (email, pass) => {
    return (dispatch) => {
      API.loginUser(email, pass)
        .then((data) => {
          window.sessionStorage.token = data.token;
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'LOGIN_FAILURE',
            error: error
          })
        })
    }
  },
  signupUser: (email, pass) => {
    return (dispatch) => {
      API.signupUser(email, pass)
        .then((data) => {
          API.loginUser(email, pass)
            .then((loginData) => {
              window.sessionStorage.token = loginData.token;
              dispatch({
                type: 'LOGIN_SUCCESS',
                data: loginData
              })
            })
            .catch((error) => {
              dispatch({
                type: 'LOGIN_FAILURE',
                error: error
              })
            })
        })
        .catch((error) => {
          dispatch({
            type: 'SIGNUP_FAILURE',
            error: error
          })
        })
    }
  }
};

export default authActions;
