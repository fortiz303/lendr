export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.data
      }
    case 'FETCH_PROFILE_FAILURE':
      return {
        ...state,
        error: action.data
      }
    default:
      return state;
  }
};
