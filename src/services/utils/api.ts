import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, ORDER_URL } from 'declarations/routs.ts';
import { setAuthChecked, setUser } from 'slices/authSlice.ts';
import { checkResponse } from 'utils/checkResponse.ts';
import {
  IIngredient,
  IUser,
  ILoginRequest,
  IRegisterRequest,
  IUpdateUserRequest,
  IAuthResponse,
  IUserResponse,
  IRefreshResponse,
} from 'declarations/interfaces';
import { TApiResponse, TIngredientResponse, TOrders } from 'declarations/types';

export const refreshToken = async (): Promise<IRefreshResponse> =>
  fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((res) => checkResponse<IRefreshResponse>(res));

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        throw refreshData;
      }

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);

      const headers = (options.headers as Record<string, string>) || {};
      headers.Authorization = refreshData.accessToken;
      options.headers = headers;

      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    }
    throw err;
  }
};

export const loginUser = createAsyncThunk<IUser, ILoginRequest>('auth/login', async (userData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };

  const response = await fetch(`${BASE_URL}/auth/login`, requestOptions);
  const data = await checkResponse<IAuthResponse>(response);

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);

  return data.user;
});

export const getUserData = createAsyncThunk<IUser, void>('user/fetchUserData', async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Не найден токен доступа!');
  }

  const response = await fetchWithRefresh<IUserResponse>(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: token,
    },
  });

  return response.user;
});

export const getIngredients = createAsyncThunk<IIngredient[], void>(
  'ingredientsListSlice/fetchIngredients',
  async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const data = await checkResponse<TIngredientResponse>(response);

    if (data?.success) {
      return data.data;
    }
    throw new Error('Ошибка при загрузке ингредиентов!');
  }
);

export const updateUserData = createAsyncThunk<IUser, IUpdateUserRequest>(
  'user/updateUserData',
  async (updatedData) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Нет токена доступа!');
    }

    const response = await fetchWithRefresh<IUserResponse>(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(updatedData),
    });

    return response.user;
  }
);

export const registerUser = createAsyncThunk<IUser, IRegisterRequest>(
  'auth/registerUser',
  async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await checkResponse<IAuthResponse>(response);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const resetPassword = async (password: string, token: string) => {
  const requestBody = { password, token };
  try {
    const response = await fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (error) {
    console.error('Error during password reset:', error);
    throw error;
  }
};

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string | undefined): Promise<TApiResponse<string>> => {
    const requestBody = { email };
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      return await response.json();
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  const logoutData = await checkResponse(response);

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  return logoutData;
});

export const createOrder = createAsyncThunk<number, (string | undefined)[]>(
  'orderSlice/createOrder',
  async (ingredientIds) => {
    const token = localStorage.getItem('accessToken');
    const filteredIngredientIds = ingredientIds.filter((id) => id !== undefined) as string[];

    const requestBody = {
      ingredients: filteredIngredientIds,
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = token;
    }

    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    const data = await checkResponse<{ order: { number: number } } & TApiResponse<{}>>(response);
    return data.order.number;
  }
);

export const checkUserAuth = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.getItem('accessToken')) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetchWithRefresh<IUserResponse>(`${BASE_URL}/auth/user`, {
        headers: { Authorization: token || '' },
      });

      dispatch(setUser(response.user));
    } catch (error) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
    }
  } else {
    dispatch(setAuthChecked(true));
  }
};

export const getConcreteOrder = async (number: string): Promise<TOrders> => {
  try {
    const response = await fetch(`${ORDER_URL}/${number}`);
    return await checkResponse(response);
  } catch (error) {
    console.error('Ошибка при поиске заказа:', error);
    throw error;
  }
};
