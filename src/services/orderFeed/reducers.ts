import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { TOrderFeedStore, TOrdersFeed, WSStatus } from 'declarations/types';
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

export const initialState: TOrderFeedStore = {
  status: WSStatus.OFFLINE,
  url: '',
  error: null,
  orders: {
    success: true,
    total: 0,
    totalToday: 0,
    orders: [],
  },
};

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnect, (state) => {
      state.status = WSStatus.CONNECTING;
    })
    .addCase(wsConnecting, (state) => {
      state.status = WSStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WSStatus.ONLINE;
      state.error = null;
    })
    // ИСПРАВЛЕНИЕ: Используем PayloadAction вместо вручную написанного типа
    .addCase(wsMessage, (state, action: PayloadAction<TOrdersFeed>) => {
      state.status = WSStatus.ONLINE;
      state.orders = action.payload;
      state.error = null;
    })
    .addCase(wsClose, (state) => {
      state.status = WSStatus.OFFLINE;
    })
    .addCase(wsDisconnect, (state) => {
      state.status = WSStatus.OFFLINE;
    })
    // ИСПРАВЛЕНИЕ: payload теперь string (как в экшене)
    .addCase(wsError, (state, action: PayloadAction<string>) => {
      state.status = WSStatus.OFFLINE;
      state.error = action.payload;
    })
    .addCase(onClose, (state) => {
      state.status = WSStatus.OFFLINE;
    })
    .addCase(onOpen, (state) => {
      state.status = WSStatus.ONLINE;
      state.error = null;
    })
    // ИСПРАВЛЕНИЕ: payload теперь string (как в экшене)
    .addCase(onError, (state, action: PayloadAction<string>) => {
      state.status = WSStatus.OFFLINE;
      state.error = action.payload;
    });
});
