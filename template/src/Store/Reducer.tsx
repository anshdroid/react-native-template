import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  isUserLoggedIn: boolean;
  userDetails: any;
  hasSeenIntroScreens: boolean;
  language: any;
}

const initialState: UserState = {
  isUserLoggedIn: false,
  userDetails: {},
  hasSeenIntroScreens: false,
  language: 'en',
};

export const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedInFlag: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setSeenIntroScreens: (state, action: PayloadAction<any>) => { 
      state.hasSeenIntroScreens = action.payload;
    },
    setCurrentLanguage: (state, action: PayloadAction<any>) => {
      state.language = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserLoggedInFlag, setUserDetails, setSeenIntroScreens, setCurrentLanguage} = userReducerSlice.actions;

export default userReducerSlice.reducer;
