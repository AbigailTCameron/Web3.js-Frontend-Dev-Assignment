import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weenusBalance: 0,
    rETHBalance: 0,
    cryptoAddress: null,
    amount: 0,
    sendAddress: null,
    crypto: "rETH",
    address: "Engage Wallet",
    hashCode: null,
    status: "Status Pending"
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setWeenusBalance: (state, action) => {
            state.weenusBalance = action.payload
        },
        setrETHBalance: (state, action) => {
            state.rETHBalance = action.payload
        },
        setCryptoAddress: (state, action) => {
            state.cryptoAddress = action.payload
        },
        setAmount: (state, action) => {
            state.amount = action.payload
        },
        setCrypto: (state, action) => {
            state.crypto = action.payload
        },
        setSendAddress: (state, action) => {
            state.sendAddress = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setHashCode: (state, action) => {
            state.hashCode = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
});

export const { setWeenusBalance, setrETHBalance, setCryptoAddress, setAmount, setCrypto, setSendAddress, setAddress, setHashCode, setStatus } = accountSlice.actions;

export const selectWeenusBalance = (state) => state.account.weenusBalance;
export const selectrETHBalance = (state) => state.account.rETHBalance;
export const selectCryptoAddress = (state) => state.account.cryptoAddress;
export const selectAmount = (state) => state.account.amount;
export const selectCrypto = (state) => state.account.crypto;
export const selectSendAddress = (state) => state.account.sendAddress;
export const selectAddress = (state) => state.account.address;
export const selectHashCode = (state) => state.account.hashCode;
export const selectStatus = (state) => state.account.status;

export default accountSlice.reducer;