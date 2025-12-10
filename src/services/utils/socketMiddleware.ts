import { Middleware } from 'redux';
import { RootState } from 'declarations/rootState.ts';
import { TwsActionTypes } from 'declarations/types';
import { refreshToken } from 'utils/api';

export const socketMiddleware =
  (wsActions: TwsActionTypes, withTokenRefresh: boolean): Middleware<{}, RootState> =>
  (store) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        // wsConnect,
        wsDisconnect,
        // wsMessage,
        // onOpen,
        // onClose,
        // onError,
        // wsOpen
      } = wsActions;

      // Безопасное извлечение type и payload с проверкой типов
      const actionType = (action as any)?.type;
      const actionPayload = (action as any)?.payload;

      // CONNECT
      if (actionType === 'ORDER_FEED_WS_CONNECT' && typeof actionPayload === 'string') {
        try {
          socket = new WebSocket(actionPayload);
          url = actionPayload;

          socket.onopen = () => {
            dispatch({
              type: 'ORDER_FEED_ON_OPEN',
            });
          };

          socket.onerror = (event: Event) => {
            const errorMessage = event instanceof Event ? event.type : 'WebSocket error';
            dispatch({
              type: 'ORDER_FEED_ON_ERROR',
              payload: errorMessage,
            });
          };

          socket.onmessage = (event: MessageEvent) => {
            try {
              const parsedData = JSON.parse(event.data);

              if (withTokenRefresh && parsedData.message === 'Токен неверный или отсутствует!') {
                refreshToken().then((refreshData) => {
                  if (url) {
                    const wssUrl = new URL(url);
                    const token = refreshData.accessToken.replace('Bearer ', '');
                    wssUrl.searchParams.set('token', token);

                    dispatch({
                      type: 'ORDER_FEED_WS_CONNECT',
                      payload: wssUrl.toString(),
                    });
                  }
                });
              } else {
                dispatch({
                  type: 'ORDER_FEED_WS_MESSAGE',
                  payload: parsedData,
                });
              }
            } catch (parseError) {
              console.error('Failed to parse WebSocket message:', parseError);
            }
          };

          socket.onclose = () => {
            dispatch({ type: 'ORDER_FEED_ON_CLOSE' });
          };
        } catch (wsError) {
          console.error('Failed to create WebSocket:', wsError);
        }
      }

      // DISCONNECT
      if (actionType === wsDisconnect.type && socket) {
        socket.close();
      }

      return next(action);
    };
  };
