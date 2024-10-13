import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';

export const getProfileInfo = createAsyncThunk(
  'profile/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/auth/profile`);
      return data;
    } catch (error) {
      console.log(error?.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getPublicProfile = createAsyncThunk(
  'profile/public',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/auth/profile/${id}`);
      return data;
    } catch (error) {
      console.log(error?.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  'profile/update',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axios.patch(
        `${BASE_API_URL}/auth/profile`,
        data
      );
      setTimeout(() => {
        dispatch(resetSuccessState());
      }, 2000);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoading: false,
    errorMsg: '',
    profileInfo: null,
    publicProfileInfo: null,
    success: false,
    isRequestSent: false,
  },
  reducers: {
    resetSuccessState: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // get profile info
    builder.addCase(getProfileInfo.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    }),
      builder.addCase(getProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMsg = '';
        state.profileInfo = action.payload;
      }),
      builder.addCase(getProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg =
          action.payload ||
          'Error while getting profile information. Try again later.';
      }),
      // get public profile info

      builder.addCase(getPublicProfile.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = '';
      }),
      builder.addCase(getPublicProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMsg = '';
        state.publicProfileInfo = action.payload;
      }),
      builder.addCase(getPublicProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg =
          action.payload ||
          'Error while getting public profile information. Try again later.';
      }),
      // update profile info

      builder.addCase(updateProfileInfo.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = '';
        state.success = false;
        state.isRequestSent = true;
      }),
      builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMsg = '';
        state.success = true;
        state.profileInfo = action.payload;
        state.isRequestSent = false;
      }),
      builder.addCase(updateProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isRequestSent = false;
        state.errorMsg =
          action.payload || 'Error while updating profile. Try again later.';
      });
  },
});

export const { resetSuccessState } = profileSlice.actions;

export default profileSlice.reducer;
