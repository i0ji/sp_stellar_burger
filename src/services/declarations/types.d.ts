import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IIngredient, IToken, IUser, IUserData } from './interfaces'; // Импорт из соседнего файла
import { RootState } from './rootState'; // Убедитесь, что путь верный
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type TInputElementType = HTMLInputElement | null;

export type TStatus = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export type TError = {
  error: string | null;
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TIngredientResponse = TServerResponse<{
  data: IIngredient[];
}>;

export type TUserLoginResponse = TServerResponse<
  IToken & {
    user: IUserData;
  }
>;

export type TUserRegister = TServerResponse<
  IToken & {
    user: IUser;
  }
>;

export type TApiResponse<T> = TServerResponse<{
  [key: string]: T;
}>;

export type TBurgerComplete = 'done' | 'created' | 'pending';

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: TBurgerComplete;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number | null;
};

export type TOrders = { orders: array<TOrder> };

export type TOrdersFeed = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TOrderFeedStore = {
  status: WebsocketStatus;
  url: string;
  error: string | null;
  orders: TOrdersFeed;
};

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, Action>
>;

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  wsMessage: ActionCreatorWithPayload<TOrdersFeed>;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
};
