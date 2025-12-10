import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: 'currentIngredientSlice',
  initialState: {
    selectedIngredient: {},
  },
  reducers: {
    updateSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
  },
});

export const { updateSelectedIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
