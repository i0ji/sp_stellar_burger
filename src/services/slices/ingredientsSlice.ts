import { createSlice } from '@reduxjs/toolkit';
import { IIngredientsListSlice } from 'declarations/interfaces';
import { getIngredients } from 'utils/api.ts';

const initialState: IIngredientsListSlice = {
    ingredients: [],
    status: 'idle',
    error: null,
  },
  ingredientsListSlice = createSlice({
    name: 'ingredientsListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getIngredients.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.ingredients = action.payload;
        })
        .addCase(getIngredients.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message !== undefined ? action.error.message : null;
        });
    },
  });

export default ingredientsListSlice.reducer;
