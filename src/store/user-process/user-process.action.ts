import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute , AppRoute } from '../../const';
import { redirectToRoute } from '.././action';
import {TAuthData} from '../../types/auth-data';
import {TUserData} from '../../types/user-data';
import { dropToken, saveUserInfo } from '../../services/token';
import { fetchFavAction, fetchOffersAction } from '../offers-data/offers-data.action';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg , {extra: api}) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email , password}, {dispatch, extra: api}) => {
    const {data: {token , email : emailFromServer }} = await api.post<TUserData>(APIRoute.Login, {email, password});
    saveUserInfo(token , emailFromServer);
    dispatch(redirectToRoute(AppRoute.Root));
    dispatch(fetchOffersAction());
    dispatch(fetchFavAction());
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
