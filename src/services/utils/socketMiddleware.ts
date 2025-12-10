import { Middleware } from 'redux';
import { RootState } from 'declarations/rootState.ts';
import { TAppAction } from 'declarations/actionTypes.ts';
import { TwsActionTypes } from 'declarations/types';

import { refreshToken } from 'utils/api.ts';

export const socketMiddleware =
  (wsActions: TwsActionTypes, withTokenRefresh: boolean): Middleware<{}, RootState> =>
  (store) => {
    let socket: WebSocket | null = null,
      url: string | null = null;
    const { wsDisconnect }: TwsActionTypes = wsActions;

    return (next) => (action) => {
      const { dispatch } = store,
        { type, payload }: TAppAction = action;

      if (type === 'ORDER_FEED_WS_CONNECT') {
        socket = new WebSocket(payload);
        url = payload;
        socket.onopen = () => {
          dispatch({
            type: 'ORDER_FEED_ON_OPEN',
          });
        };
        socket.onerror = (event) => {
          dispatch({
            type: 'ORDER_FEED_ON_ERROR',
            payload: event,
          });
        };

        socket.onmessage = (event) => {
          const { data } = event,
            parsedData = JSON.parse(data);

          if (withTokenRefresh && parsedData.message === 'Токен неверный или отсутствует!') {
            refreshToken().then((refreshData) => {
              const wssUrl = new URL(url!);
              wssUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
              dispatch({
                type: 'ORDER_FEED_WS_CONNECT',
                payload: wssUrl,
              });
            });
          } else {
            dispatch({
              type: 'ORDER_FEED_WS_MESSAGE',
              payload: parsedData,
            });
          }
        };

        socket.onclose = () => {
          dispatch({ type: 'ORDER_FEED_ON_CLOSE' });
        };
      }

      if (wsDisconnect && type === wsDisconnect && socket) {
        socket.close();
      }

      next(action);
    };
  };
