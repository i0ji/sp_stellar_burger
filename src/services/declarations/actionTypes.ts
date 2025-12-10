import { getUserData, loginUser, logoutUser, registerUser, updateUserData } from 'utils/api.ts';
import {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  resetIngredients,
} from 'slices/constructorSlice.ts';
import { updateSelectedIngredient } from 'slices/currentIngredientSlice.ts';
import { updateIds, updateOrderNumber } from 'slices/orderSlice.ts';
import { createOrder } from 'utils/api.ts';
import { getIngredients } from 'utils/api.ts';
import {
  wsClose,
  wsConnect,
  wsConnecting,
  wsDisconnect,
  wsError,
  wsMessage,
  wsOpen,
} from 'services/orderFeed/actions.ts';

type TIngredientActions =
  | ReturnType<typeof getIngredients.pending>
  | ReturnType<typeof getIngredients.fulfilled>
  | ReturnType<typeof getIngredients.rejected>;

type TOrderActions =
  | ReturnType<typeof createOrder.pending>
  | ReturnType<typeof createOrder.fulfilled>
  | ReturnType<typeof createOrder.rejected>
  | ReturnType<typeof updateIds>
  | ReturnType<typeof updateOrderNumber>;

type TCurrentActions = ReturnType<typeof updateSelectedIngredient>;

type TConstructorActions =
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof resetIngredients>
  | ReturnType<typeof reorderIngredients>
  | ReturnType<typeof removeIngredient>;

type TAuthActions =
  | ReturnType<typeof loginUser.pending>
  | ReturnType<typeof loginUser.fulfilled>
  | ReturnType<typeof loginUser.rejected>
  | ReturnType<typeof registerUser.pending>
  | ReturnType<typeof registerUser.fulfilled>
  | ReturnType<typeof registerUser.rejected>
  | ReturnType<typeof logoutUser.pending>
  | ReturnType<typeof logoutUser.fulfilled>
  | ReturnType<typeof logoutUser.rejected>
  | ReturnType<typeof getUserData.fulfilled>
  | ReturnType<typeof getUserData.rejected>
  | ReturnType<typeof updateUserData.pending>
  | ReturnType<typeof updateUserData.fulfilled>
  | ReturnType<typeof updateUserData.rejected>;

type TFeedActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsError>;

export type TAppAction =
  | TConstructorActions
  | TAuthActions
  | TCurrentActions
  | TOrderActions
  | TIngredientActions
  | TFeedActions;
