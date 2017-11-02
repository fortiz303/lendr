export default function authReducer(state = {}, action) {
  switch (action.type) {
    case 'AUTH_STATUS':
      return {
        ...state,
        status: action.status
      }
    default:
      return state;
  }
};
