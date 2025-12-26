import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a simple app slice to prevent empty reducer error
const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: true,
  },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    // Add your other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
