import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from 'utils/api.ts';
import { IOrderSlice } from 'declarations/sliceInterfaces';

export const initialState: IOrderSlice = {
  orderNumber: null as number | null,
  IDs: [''],
  status: 'idle',
  error: null as string | null,
  currentOrder: {
    createdAt: '',
    ingredients: [''],
    name: '',
    number: null,
    status: 'pending',
    _id: '',
    updatedAt: '',
  },
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    updateIds: (state, action) => {
      state.IDs = action.payload;
    },
    updateOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
      state.error = null;
    },
    updateCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderNumber = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateIds, updateOrderNumber, updateCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
