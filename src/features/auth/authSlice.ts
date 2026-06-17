import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';
import { AuthState } from '../../types';

export const registerUser = createAsyncThunk('auth/register', async (d:{name:string;email:string;password:string}, {rejectWithValue}) => {
  try { const r = await api.post('/auth/register', d); return r.data.data; }
  catch(e:any) { return rejectWithValue(e.response?.data?.message||'Registration failed'); }
});
export const loginUser = createAsyncThunk('auth/login', async (d:{email:string;password:string}, {rejectWithValue}) => {
  try { const r = await api.post('/auth/login', d); return r.data.data; }
  catch(e:any) { return rejectWithValue(e.response?.data?.message||'Login failed'); }
});

const s: AuthState = { user:null, accessToken:localStorage.getItem('accessToken'), isLoading:false, error:null };
const authSlice = createSlice({ name:'auth', initialState:s,
  reducers: {
    logout: state => { state.user=null; state.accessToken=null; localStorage.removeItem('accessToken'); },
    clearError: state => { state.error=null; }
  },
  extraReducers: b => {
    const handle = (builder:any, thunk:any) => {
      builder.addCase(thunk.pending, (s:any) => { s.isLoading=true; s.error=null; })
        .addCase(thunk.fulfilled, (s:any, a:any) => { s.isLoading=false; s.user=a.payload.user; s.accessToken=a.payload.accessToken; localStorage.setItem('accessToken',a.payload.accessToken); })
        .addCase(thunk.rejected, (s:any, a:any) => { s.isLoading=false; s.error=a.payload; });
    };
    handle(b, registerUser); handle(b, loginUser);
  }
});
export const {logout,clearError} = authSlice.actions;
export default authSlice.reducer;
