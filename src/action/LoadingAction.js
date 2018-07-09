import * as actionTypes from '../constants/actionTypes';

export function pageLoadingStart() {
  console.log('Inside pageLoadingStart');
  return {
    type: actionTypes.PAGE_LOADING_START,
    isLoading: true
  };
}

export function pageLoadingComplete() {
  console.log('Inside pageLoadingComplete');
  return {
    type: actionTypes.PAGE_LOADING_COMPLETE,
    isLoading: false
  };
}
