import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CalendarState, Order } from './types';
import { mockOrders } from '../components/mockData';

const initialState: CalendarState = {
  orders: mockOrders,
  selectedDate: null,
  viewType: 'all',
  isModalOpen: false,
  editingOrder: {
    buyerId: '',
    sellerId: '',
    productId: '',
    status: 'pending',
    address: ''
  }
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setViewType: (state, action: PayloadAction<'all' | 'pickups' | 'deliveries'>) => {
      state.viewType = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setEditingOrder: (state, action: PayloadAction<Partial<Order>>) => {
      state.editingOrder = { ...state.editingOrder, ...action.payload };
    },
    resetEditingOrder: (state) => {
      state.editingOrder = {
        buyerId: '',
        sellerId: '',
        productId: '',
        status: 'pending',
        address: ''
      };
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    }
  }
});

export const {
  setSelectedDate,
  setViewType,
  setModalOpen,
  setEditingOrder,
  resetEditingOrder,
  addOrder,
  updateOrder,
  deleteOrder
} = calendarSlice.actions;

export default calendarSlice.reducer; 