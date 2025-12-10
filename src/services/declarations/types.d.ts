import { IToken, IUser, IUserData } from 'declarations/sliceInterfaces';
import { IIngredient } from 'declarations/interfaces';
import { RootState } from 'declarations/rootState.ts';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import Error = types.Error;

export type TInputElementType = HTMLInputElement | null;

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TStatus = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export type TError = Error | string | null;

export type TOrders = { orders: array<TOrder> };

export type TApiResponse<T> = TServerResponse<{
  [key: string]: T;
}>;

export type TIngredientResponse = TServerResponse<{
  data: IIngredient[];
}>;

export type TUserLoginResponse = TServerResponse<
  IToken,
  {
    user: IUserData;
  }
>;

export type TUserRegister = TServerResponse<IToken, IUser>;

export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState>>;

export type TBurgerComplete = 'done' | 'created' | 'pending';

export type TOrder = {
  createdAt?: string;
  ingredients?: Array<string>;
  name?: string;
  number: number | null;
  status?: TBurgerComplete;
  _id?: string;
  updatedAt?: string;
};

export type TOrdersFeed = {
  success: boolean;
  total: string;
  totalToday: string;
  orders: Array<TOrder>;
};

export type TOrderFeedStore = {
  url: string;
  status: WebsocketStatus;
  orders: TOrdersFeed;
};

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  wsMessage: ActionCreatorWithPayload<TOrdersFeed>;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<TError>;
};
