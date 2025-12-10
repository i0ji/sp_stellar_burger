import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { slicePriceCalculation } from 'utils/slicePriceCalculation.ts';
import { IIngredient, IConstructorSlice } from 'declarations/interfaces';

export const initialState: IConstructorSlice = {
  totalPrice: 0,
  ingredients: [],
  addedIngredients: [],
  bun: null,
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.addedIngredients = Array.from(new Set([...state.addedIngredients, action.payload]));
      }
      state.totalPrice = slicePriceCalculation(state.addedIngredients, state.bun);
    },
    removeIngredient: (state, action: PayloadAction<string | undefined>) => {
      const idToRemove = action.payload,
        ingredientIndex = state.addedIngredients.findIndex(
          (ingredient: IIngredient) => ingredient._id === idToRemove
        );
      if (ingredientIndex !== -1) {
        state.addedIngredients.splice(ingredientIndex, 1);
      }
      state.totalPrice = slicePriceCalculation(state.addedIngredients, state.bun);
    },
    reorderIngredients: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload,
        addedIngredients = [...state.addedIngredients],
        [movedIngredient] = addedIngredients.splice(dragIndex, 1);
      addedIngredients.splice(hoverIndex, 0, movedIngredient);

      state.addedIngredients = addedIngredients;
    },
    resetIngredients: (state) => {
      state.addedIngredients = [];
      state.bun = null;
      state.totalPrice = 0;
    },
  },
});

export const { addIngredient, removeIngredient, reorderIngredients, resetIngredients } =
  constructorSlice.actions;

export default constructorSlice.reducer;
