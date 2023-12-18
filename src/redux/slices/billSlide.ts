import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GameBill } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type BillState = {
	billList: GameBill[],
	gameBillList: GameBill[],
};
const initialState: BillState = {
	billList: [],
	gameBillList: []
};

export const billsFetch = createAsyncThunk(
	'bill/billsFetch',
	async () => {
		const { data } = await RestService.getInstance().get<{bills: GameBill[]}>(
			`${config.IDP_URL}/bills`,
		);
		return data.bills;
	},
);

export const gameBillsFetch = createAsyncThunk(
	'bill/gameBillsFetch',
	async (gameId: string)  => {
		const { data } = await RestService.getInstance().get<{bills: GameBill[]}>(
			`${config.IDP_URL}/bills?gameId=${gameId}`,
		);
		return data.bills;
	},
);

const billSlice = createSlice({
	name: 'bill',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(billsFetch.fulfilled, (state, action) => {
			state.billList = action.payload;
		});
		builder.addCase(gameBillsFetch.fulfilled, (state, action) => {
			state.gameBillList = action.payload;
		});
	},
});

const { reducer } = billSlice;
export default reducer;
