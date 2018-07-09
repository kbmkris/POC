import * as actionTypes from '../constants/actionTypes';

const LoadingReducer = (state = false, action) => {
//  debugger;
  switch (action.type) {
    case actionTypes.PAGE_LOADING_START:
      return action.isLoading;
    case actionTypes.PAGE_LOADING_COMPLETE:
      return action.isLoading;
    default:
      return state;
  }
};

export default LoadingReducer;
