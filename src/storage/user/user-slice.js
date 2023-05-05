import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLocalData } from '../../utils/localStorage';
import { toast } from 'react-toastify';

const initialState = {
  isAuthChecked: false,
  data: null,

  registerUserRequest: false,
  registerUserError: null,

  loginUserRequest: false,
  loginUserError: null,

  checkTokenUserRequest: false,
  checkTokenUserError: null,

  fetchUserRequest: false,
  fetchUserError: null,
};

export const sliceName = 'user';

export const fetchUser = createAsyncThunk(
  `${sliceName}/fetchUser`,
  async function (_, { fulfillWithValue, rejectWithValue, extra: api }) {
    try {
      const data = await api.getUserInfo();

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async function (dataUser, { fulfillWithValue, rejectWithValue, extra: api }) {
    try {
      const data = await api.register(dataUser);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async function (dataUser, { fulfillWithValue, rejectWithValue, extra: api }) {
    try {
      const data = await api.authorize(dataUser);
      if (data.token) {
        setLocalData('token', data.token);
        
      } else {
        
        return rejectWithValue(data);
      }

      return fulfillWithValue(data.data);
    } catch (err) {
      
      return rejectWithValue(err);
    }
  }
);

export const checkTokenUser = createAsyncThunk(
  `${sliceName}/checkTokenUser`,
  async function (
    token,
    { fulfillWithValue, rejectWithValue, extra: api, dispatch }
  ) {
    try {
      const data = await api.checkToken(token);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(authCheck());
    }
  }
);

const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.data = null;
      setLocalData('token', null);
      toast.warn('Success Notification !');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
        toast.success('Вы успешно зарегистрировались!');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserError = action.payload;
        state.registerUserRequest = false;
        toast.error(action.payload?.message);
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserError = action.payload;
        state.loginUserRequest = false;
        toast.error(action.payload?.message);
      })

      .addCase(checkTokenUser.pending, (state) => {
        state.checkTokenUserRequest = true;
        state.checkTokenUserError = null;
      })
      .addCase(checkTokenUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.checkTokenUserRequest = false;
      })
      .addCase(checkTokenUser.rejected, (state, action) => {
        state.checkTokenUserError = action.payload;
        state.checkTokenUserRequest = false;
      });
  },
});

export const { authCheck, logout } = userSlice.actions;
export default userSlice.reducer;
