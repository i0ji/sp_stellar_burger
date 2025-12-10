import { createReducer } from '@reduxjs/toolkit';
import { TOrderFeedStore, TOrdersFeed } from 'declarations/types';
import {
  onClose,
  onError,
  onOpen,
  wsClose,
  wsConnect,
  wsConnecting,
  wsDisconnect,
  wsError,
  wsMessage,
  wsOpen,
} from 'services/orderFeed/actions.ts';

enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export const initialState: TOrderFeedStore = {
  status: WebsocketStatus.OFFLINE,
  url: '',
  error: '',
  orders: {
    total: null,
    totalToday: null,
    orders: [
      {
        ingredients: [],
        _id: '',
        status: 'created',
        number: null,
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
};

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnect, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = null;
    })
    .addCase(wsMessage, (state, action: { payload: TOrdersFeed; type: string }) => {
      state.status = WebsocketStatus.ONLINE;
      state.orders = action.payload;
      state.error = null;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsDisconnect, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action: { payload: Error; type: string }) => {
      state.status = WebsocketStatus.OFFLINE;
      state.error = action.payload;
    })
    .addCase(onClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(onOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = null;
    })
    .addCase(onError, (state, action: { payload: Error; type: string }) => {
      state.status = WebsocketStatus.OFFLINE;
      state.error = action.payload;
    });
});
