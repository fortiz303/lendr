import {API} from '../API';

const errorActions = {
  throw: (error) => {
    return {
      type: 'NEW_ERROR',
      error: error
    }
  },
  clear: () => {
    return {
      type: 'CLEAR_ALL_ERRORS'
    }
  }
};

export default errorActions;
