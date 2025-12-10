import { IIngredient } from 'utils/interfaces/interfaces';
import { TError, TOrder, TStatus } from 'declarations/types';
import { IIngredients } from 'declarations/interfaces';

export interface IConstructorSlice {
  totalPrice: number;
  ingredients: Array<IIngredient>;
  addedIngredients: Array<IIngredient>;
  bun: IIngredient | null;
}

export interface IIngredientsListSlice extends IIngredients, TStatus, TError {}

export interface IAuthSlice extends TStatus, TError {
  user: IUserData | null;
  userData: IUserData | null;
  isAuth: boolean;
  authChecked: boolean;
  loginError: boolean;
}

export interface IOrderSlice extends TStatus, TError {
  orderNumber: number | null;
  IDs: Array<string>;
  currentOrder: TOrder;
}
