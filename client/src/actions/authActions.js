import {API} from '../API';

const authActions = {
  authenticate: (token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.authenticate(token)
        .then((data) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({type: 'LOADING', loading: false});
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
      dispatch({type: 'LOADING', loading: true});
      API.loginUser(email, pass)
        .then((data) => {
          window.sessionStorage.token = data.token;
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'LOGIN_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  signupUser: (email, pass) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.signupUser(email, pass)
        .then((data) => {
          API.loginUser(email, pass)
            .then((loginData) => {
              dispatch({type: 'LOADING', loading: false});
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
              dispatch({type: 'LOADING', loading: false});
            })
        })
        .catch((error) => {
          dispatch({
            type: 'SIGNUP_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  }
};

export default authActions;
