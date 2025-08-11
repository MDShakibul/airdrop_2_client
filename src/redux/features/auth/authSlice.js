import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallet_address: localStorage.getItem('wallet_address') || '',
  ref_code: localStorage.getItem('ref_code') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { wallet_address, ref_code } = action.payload;
      state.wallet_address = wallet_address;
      state.ref_code = ref_code;



      // Persist to localStorage
      localStorage.setItem('wallet_address', wallet_address);
      localStorage.setItem('ref_code', ref_code);
    },
    disconnect: (state) => {
      state.wallet_address = '';
      state.ref_code = '';

      // Clear from localStorage
      localStorage.removeItem('wallet_address');
      localStorage.removeItem('ref_code');
    },
  },
});

export const { login, disconnect } = authSlice.actions;
export default authSlice.reducer;
