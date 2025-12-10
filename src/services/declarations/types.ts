import { Action, ActionCreator } from 'redux';
// import { ThunkAction } from 'redux-thunk';
import { IIngredient } from './interfaces';
import { RootState } from './rootState';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  ThunkAction,
} from '@reduxjs/toolkit';

export type TInputElementType = HTMLInputElement | null;

export type TStatus = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export enum WSStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TError = {
  error: string | null;
};

export type TIngredientResponse = TServerResponse<{
  data: IIngredient[];
}>;

// export type TUserLoginResponse = TServerResponse<
//   IToken & {
//     user: IUserData;
//   }
// >;

// export type TUserRegister = TServerResponse<
//   IToken & {
//     user: IUser;
//   }
// >;

//FEATURE
export type TServerResponse<T> = {
  success: boolean;
} & T;

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

export type TOrders = { orders: Array<TOrder> };

export type TOrdersFeed = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrderFeedStore = {
  status: WSStatus;
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
