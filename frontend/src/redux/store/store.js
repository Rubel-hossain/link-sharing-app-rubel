import { configureStore } from '@reduxjs/toolkit';
import linksReducer from '../features/linksSlice';
import profileReducer from '../features/profileSlice';

const store = configureStore({
  reducer: {
    links: linksReducer,
    profile: profileReducer
  }
});

export default store;
