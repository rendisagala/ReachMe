import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const allPostReducer = createReducer(initialState, {
  allPostRequest: (state) => {
    state.loading = true;
  },
  allPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  allPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
