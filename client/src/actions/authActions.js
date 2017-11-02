const authActions = {
  returnAuthStatus: () => {
    return (dispatch) => {
      dispatch({
        type: 'AUTH_STATUS',
        status: false
      })
    }
  }
};

export default authActions;
