import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { LoginResponse } from '../interfaces/auth.interface';
import { PREFIX } from '../helpers/api';
import { User } from '../interfaces/user.interface';
import { RootState } from './store';
export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	loginErrorMessage?: string;
	registerErrorMessage?: string;
	profile?: User;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const userData = createAsyncThunk<User, void, { state: RootState }>(
	'/user/getUserData',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const { data } = await axios.get<User>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: 'Bearer ' + jwt
			}
		});
		return data;
	}
);

export const login = createAsyncThunk(
	'/user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email: params.email,
					password: params.password
				}
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const register = createAsyncThunk(
	'/auth/login',
	async (pasrams: { email: string; password: string; name: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(
				`${PREFIX}/auth/register`,
				{
					email: pasrams.email,
					password: pasrams.password,
					name: pasrams.name
				}
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (action.payload) {
				state.jwt = action.payload.access_token;
			}
			return;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			if (action.payload) {
				state.jwt = action.payload.access_token;
			}
			return;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
		builder.addCase(userData.fulfilled, (state, action) => {
			if (action.payload) {
				state.profile = action.payload;
			}
		});
	}
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
