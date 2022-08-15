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

export const addPostReducer = createReducer(initialState, {
  addPostRequest: (state) => {
    state.loading = true;
  },
  addPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
    state.postAdded = true;
  },
  addPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.postAdded = false;
  },
});
