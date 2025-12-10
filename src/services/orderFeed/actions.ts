import { createAction } from '@reduxjs/toolkit';
import { TOrdersFeed } from 'declarations/types';

export const wsConnect = createAction<string, 'ORDER_FEED_WS_CONNECT'>('ORDER_FEED_WS_CONNECT');

export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING');

export const wsOpen = createAction('ORDER_FEED_WS_OPEN');

export const wsMessage = createAction<TOrdersFeed, 'ORDER_FEED_WS_MESSAGE'>(
  'ORDER_FEED_WS_MESSAGE'
);

export const wsClose = createAction('ORDER_FEED_WS_CLOSE');

export const wsDisconnect = createAction('ORDER_FEED_WS_DISCONNECT');

export const wsError = createAction<string, 'ORDER_FEED_WS_ERROR'>('ORDER_FEED_WS_ERROR');

export const onOpen = createAction('ORDER_FEED_ON_OPEN');

export const onError = createAction<string, 'ORDER_FEED_ON_ERROR'>('ORDER_FEED_ON_ERROR');

export const onClose = createAction('ORDER_FEED_ON_CLOSE');
