import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
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
    state.user = action.payload;
    state.isRegistered = true;
    // state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isRegistered = false;
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
    state.user = action.payload;
    state.isAuthenticated = false;
  },
  LogoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
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
    state.done = true;
  },
  allUserFailure: (state, action) => {
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
export const getUserReducer = createReducer(initialState, {
  getUserRequest: (state) => {
    state.loading = true;
  },
  getUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  getUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
export const followUserReducer = createReducer(initialState, {
  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.done = true;
  },
  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.done = true;
  },
  clearDone: (state) => {
    state.done = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
