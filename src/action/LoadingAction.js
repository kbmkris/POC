import * as actionTypes from "../constants/actionTypes";

export function pageLoadingStart() {
  return {
    type: actionTypes.PAGE_LOADING_START,
    isLoading: true
  };
}

export function pageLoadingComplete() {
  return {
    type: actionTypes.PAGE_LOADING_COMPLETE,
    isLoading: false
  };
}
