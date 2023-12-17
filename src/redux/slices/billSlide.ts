import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GameBill } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type BillState = {
	billList: GameBill[],
};
const initialState: BillState = {
	billList: [],
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

const billSlice = createSlice({
	name: 'bill',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(billsFetch.fulfilled, (state, action) => {
			state.billList = action.payload;
		});
	},
});

const { reducer } = billSlice;
export default reducer;
