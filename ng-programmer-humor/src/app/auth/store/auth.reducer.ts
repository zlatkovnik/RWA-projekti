import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuthActions from './auth.actions';
import Auth from '../models/auth.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  error: any;
  user: Auth;
  loading: boolean;
  message: string;
}

export const initialState: AuthState = {
  error: undefined,
  user: undefined,
  loading: false,
  message: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.setUser, (state, action) => {
    return { ...state, user: action.auth };
  }),
  on(AuthActions.loginUser, (state, action) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.loginUserSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      user: action.user,
      error: undefined,
      message: undefined,
    };
  }),
  on(AuthActions.loginUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      message: undefined,
    };
  }),
  on(AuthActions.registerUser, (state, action) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.registerUserSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
      message: 'Successfully registered',
    };
  }),
  on(AuthActions.registerUserFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      message: undefined,
    };
  }),
  on(AuthActions.logoutUser, (state, action) => {
    return {
      ...state,
    };
  }),
  on(AuthActions.logoutUserSuccess, (state, action) => {
    return {
      ...state,
      user: undefined,
    };
  }),
  on(AuthActions.logoutUserFailure, (state, action) => {
    return {
      ...state,
    };
  }),
  on(AuthActions.updateProfileImage, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AuthActions.updateProfileImageSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
      user: action.auth,
    };
  }),
  on(AuthActions.updateProfileImageFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(AuthActions.setKarma, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthActions.cleanupAuth, (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
    };
  })
);
