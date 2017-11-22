import {API} from '../API';

const loadingActions = {
  loading: (loading) => {
    console.log('loading actions', loading)
    return {
      type: 'LOADING',
      loading: loading
    }
  }
};

export default loadingActions;
