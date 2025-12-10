import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from 'utils/socketMiddleware.ts';
import { orderFeedReducer } from 'services/orderFeed/reducers.ts';

import {
  authSlice,
  constructorSlice,
  currentIngredientSlice,
  ingredientsSlice,
  orderSlice,
} from 'slices/index.ts';

export const rootReducers = combineReducers({
  ingredients: ingredientsSlice,
  constructorSlice,
  currentIngredientSlice,
  orderSlice,
  authSlice,
  orderFeed: orderFeedReducer,
});

import {
  wsClose as FeedCloseAction,
  wsConnect as FeedConnectAction,
  wsConnecting as FeedConnectionAction,
  wsDisconnect as FeedDisconnectAction,
  wsError as FeedErrorAction,
  wsMessage as FeedMessageAction,
  onClose as FeedOnCloseAction,
  onError as FeedOnErrorAction,
  onOpen as FeedOnOpenAction,
  wsOpen as FeedOpenAction,
} from 'services/orderFeed/actions.ts';

export const wsActions = {
  wsOpen: FeedOpenAction,
  wsConnect: FeedConnectAction,
  wsConnecting: FeedConnectionAction,
  wsMessage: FeedMessageAction,
  wsClose: FeedCloseAction,
  wsDisconnect: FeedDisconnectAction,
  wsError: FeedErrorAction,
  onOpen: FeedOnOpenAction,
  onError: FeedOnErrorAction,
  onClose: FeedOnCloseAction,
};

const checkToken = Boolean(localStorage.getItem('accessToken'));

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions, checkToken)),
});

export type AppDispatch = typeof store.dispatch;
