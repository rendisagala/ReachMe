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

export const likedPostReducer = createReducer(initialState, {
  likedPostRequest: (state) => {
    state.loading = true;
  },
  likedPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
    state.done = true;
  },
  likedPostFailure: (state, action) => {
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

export const myPostReducer = createReducer(initialState, {
  myPostRequest: (state) => {
    state.loading = true;
  },
  myPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  myPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  addPostRequest: (state) => {
    state.loading = true;
  },
  addPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
  },
  addPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
  },
  deletePostFailure: (state, action) => {
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

export const likesAndCommentReducer = createReducer(initialState, {
  addLikesRequest: (state) => {
    state.loading = true;
  },
  addLikesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
  },
  addLikesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  addCommentRequest: (state) => {
    state.loading = true;
  },
  addCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
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

export const userPostReducer = createReducer(initialState, {
  userPostRequest: (state) => {
    state.loading = true;
  },
  userPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
