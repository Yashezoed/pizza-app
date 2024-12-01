import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import CartItem from '../components/CartItem/CartItem';

export const CART_PERSISTENT_STATE = 'cartData';
export interface CartItem {
	id: number;
	count: number;
}

export interface CartState {
	items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {items: []};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		cleanCart: (state) => {
			state.items = [];
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);

		},
		decrease: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				return;
			}
			if (existed.count === 1) {
				state.items = state.items.filter(i => i.id !== action.payload);
			} else{
				state.items.map(i => {
					if (i.id === action.payload) {
						i.count -= 1;
					}
					return i;
				});	
				return;

			}
			
			state.items = state.items.filter(i => i.id !== action.payload);
		},
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1});
				return;

			}
			state.items.map(i => {
				if (i.id === action.payload) {
					i.count += 1;
				}
				return i;
			});
		}
	}
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
