import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | null;
}

const initialState: NotificationState = {
  message: '',
  type: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = '';
      state.type = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
