import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
    // state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
    // state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LogoutRequest: (state) => {
    state.loading = true;
  },
  LogoutSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = false;
  },
  LogoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = true;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUserReducer = createReducer(initialState, {
  allUserRequest: (state) => {
    state.loading = true;
  },
  allUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
  },
  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  clearDone: (state) => {
    state.done = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
export const myUserReducer = createReducer(initialState, {
  profileRequest: (state) => {
    state.loading = true;
  },
  profileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  profileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = false;
  },
  updateUserRequest: (state) => {
    state.loading = true;
  },
  updateUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.done = true;
  },
  updateUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
