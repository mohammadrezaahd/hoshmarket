import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "../types";
import type { ICurrentUserResponse } from "~/types/interfaces/auth.interface";
import type { IUserCredit } from "~/types/interfaces/profile.interface";

// Extend current user type to include optional subscription info
export type ICurrentUser = ICurrentUserResponse & {
  subscription?: IUserCredit | null;
};

interface UserState {
  currentUser: ICurrentUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ICurrentUser>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // set or update subscription/credit info for current user
    setUserSubscription: (state, action: PayloadAction<IUserCredit | null>) => {
      const sub = action.payload;
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, subscription: sub };
      } else if (sub) {
        // create minimal currentUser object if none exists
        state.currentUser = { email: sub.email, subscription: sub } as ICurrentUserResponse;
      }
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setUserLoading, setUserError, clearUser, setUserSubscription } =
  userSlice.actions;

export default userSlice.reducer;
