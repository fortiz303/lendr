export default function authReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_USER_TOKEN_FROM_SESSION':
      return {
        ...state,
        user: {
          ...state.user,
          token: action.toke
        }
      }
    case 'AUTH_STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'LOGIN_SUCCESS': 
      return {
        ...state,
        status: true,
        user: {
          user_name: action.data.user_name,
          token: action.data.token
        }
      }
    case 'LOGIN_FAILURE': 
      return {
        ...state,
        status: false,
        user: false
      }
    case 'SIGNUP_SUCCESS': 
      return {
        ...state,
        status: true,
        user: false
      }
    case 'SIGNUP_FAILURE': 
      return {
        ...state,
        status: false,
        user: false
      }
    default:
      return state;
  }
};
