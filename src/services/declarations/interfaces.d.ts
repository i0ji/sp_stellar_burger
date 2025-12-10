import { TError, TStatus, TOrder } from './types';

export interface IIngredient {
  _id: string;
  id?: string;
  uuid?: string;
  name: string;
  type: 'bun' | 'main' | 'sauce' | string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  content?: string;
}

export interface IUser {
  email: string;
  name: string;
  password?: string;
}

export interface IUserData {
  user: IUser;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IIngredientCardProps extends IIngredient {
  count?: number;
  onOpenModal?: () => void;
  onOpenDetailsPage?: () => void;
  onCloseDetailsPage?: () => void;
}

export interface IIngredientGroupProps {
  type: string;
  ingredients: IIngredient[];
  id?: string;
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}

export interface IIngredients {
  ingredients: IIngredient[];
}

export interface IForm {
  [key: string]: string;
}

export interface IRefreshData extends IToken {
  success: boolean;
}

export interface IRegisterUser extends IRefreshData {
  user: IUser;
}

// ------ SLICE INTERFACES

export interface IConstructorSlice {
  totalPrice: number;
  ingredients: IIngredient[];
  addedIngredients: IIngredient[];
  bun: IIngredient | null;
}

export interface IIngredientsListSlice extends IIngredients, TStatus, TError {}

export interface IAuthSlice extends TStatus, TError {
  user: IUser | null;
  isAuth: boolean;
  authChecked: boolean;
  loginError: boolean;
}

export interface IOrderSlice extends TStatus, TError {
  orderNumber: number | null;
  name?: string;
  IDs: string[];
  currentOrder: TOrder | null;
}
