import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BASE_API_URL } from '../../utils/constants';

export const getLinks = createAsyncThunk(
  'links/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/links`);
      return data;
    } catch (error) {
      console.log(error?.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateLinks = createAsyncThunk(
  'links/update',
  async (links, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const link = links.find((element) => element.link === '');
      if (link) {
        return rejectWithValue('Link connot be empty');
      }
      const multiplePlatforms = links.some(
        (link) =>
          links.filter((item) => item.platform === link.platform).length > 1
      );

      if (multiplePlatforms) {
        return rejectWithValue(
          'Platform with the selected name already exist.'
        );
      }
      await axios.patch(`${BASE_API_URL}/links`, { links });
      const updatedLinks = getState().links.links;
      setTimeout(() => {
        dispatch(resetSuccessState());
      }, 2000);
      return updatedLinks;
    } catch (error) {
      console.log(error?.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteLink = createAsyncThunk(
  'links/delete',
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${BASE_API_URL}/links/${id}`);
      dispatch(removeLink(id));
    } catch (error) {
      console.log(error);
      if (
        error.response?.status === 404 &&
        error.response?.data?.message === 'CastError'
      ) {
        dispatch(removeLink(id));
      }
    }
  }
);

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    isLoading: false,
    errorMsg: '',
    links: [],
    isRequestSent: false,
    success: false,
  },
  reducers: {
    setLocalLinks: (state, action) => {
      state.links = action.payload.map((item, index) => ({
        ...item,
        order: index,
      }));
    },
    addNewLink: (state) => {
      state.links = [
        {
          _id: uuidv4(),
          platform: 'GitHub',
          link: '',
          order: state.links.length === 0 ? 0 : state.links.length,
        },
        ...state.links,
      ];
    },
    removeLink: (state, action) => {
      state.links = state.links.filter((link) => link._id !== action.payload);
    },
    resetSuccessState: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    /* add link */
    builder.addCase(getLinks.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    }),
      builder.addCase(getLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMsg = '';
        state.links = action.payload;
      }),
      builder.addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg =
          action.payload ||
          'Error while getting list of links. Try again later.';
      }),
      /* update link */

      builder.addCase(updateLinks.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = '';
        state.isRequestSent = true;
        state.success = false;
      }),
      builder.addCase(updateLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMsg = '';
        state.links = action.payload;
        state.isRequestSent = false;
        state.success = true;
      }),
      builder.addCase(updateLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isRequestSent = false;
        state.success = false;
        state.errorMsg =
          action.payload || 'Error during save. Try again later.';
      }),
      /* delete link */

      builder.addCase(deleteLink.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = '';
      }),
      builder.addCase(deleteLink.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMsg = '';
      }),
      builder.addCase(deleteLink.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg =
          action.payload || 'Error while deleting link. Try again later.';
      });
  },
});

export const { setLocalLinks, addNewLink, removeLink, resetSuccessState } =
  linksSlice.actions;

export default linksSlice.reducer;
