import { TError, TStatus } from 'declarations/types';

export interface IIngredient {
  id?: string;
  _id?: string | undefined;
  uuid?: string;
  name: string;
  type: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  content?: string;
  moveIngredient?: (dragIndex: number, hoverIndex: number) => void;
}

export interface IIngredientCardProps extends IIngredient {
  onOpenModal?: () => void;
  onOpenDetailsPage?: () => void;
  onCloseDetailsPage?: () => void;
}

export interface IIngredientGroupProps {
  type: string;
  ingredients: IIngredient[];
  navigate?: string;
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}

export interface IForm {
  [key: string]: string;
}

export interface IIngredients {
  ingredients: Array<IIngredient>;
}

export interface IUser {
  name?: string | null;
  email?: string | undefined;
  password?: string | undefined;
}

export interface IToken {
  refreshToken: string;
  accessToken: string;
}

export interface IRefreshData extends IToken {
  success: boolean;
}

export interface IBurgerState extends IIngredients, TStatus, TError {}

export interface IUserData extends IUser {
  user?: IUser;
}

export interface IRegisterUser extends IRefreshData {
  user: IUser;
}

export interface IIngredientsWithQuantity {
  ingredient: IIngredient;
  qty: number;
}
