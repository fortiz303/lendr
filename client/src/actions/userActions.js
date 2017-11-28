import {API} from '../API';

const userActions = {
  fetchById: (id, token) => {
    return (dispatch) => {
      API.fetchUserById(id, token)
        .then((data) => {
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