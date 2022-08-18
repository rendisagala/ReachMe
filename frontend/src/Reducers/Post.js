import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const allPostReducer = createReducer(initialState, {
  allPostRequest: (state) => {
    state.loading = true;
  },
  allPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
    state.done = true;
  },
  allPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  clearDone: (state) => {
    state.done = false;
  },
  clearErrors: (state) => {
    state.error = null;
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
    state.done = true;
  },
  addPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.postAdded = false;
    state.done = false;
  },
  clearDone: (state) => {
    state.done = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
export const addLikesReducer = createReducer(initialState, {
  addLikesRequest: (state) => {
    state.loading = true;
  },
  addLikesSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;

    state.done = true;
  },
  addLikesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  clearDone: (state) => {
    state.done = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
export const addCommentReducer = createReducer(initialState, {
  addCommentRequest: (state) => {
    state.loading = true;
  },
  addCommentSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;

    state.done = true;
  },
  addCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  clearDone: (state) => {
    state.done = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
