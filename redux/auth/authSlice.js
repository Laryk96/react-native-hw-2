import { createSlice } from '@reduxjs/toolkit'
import {
	logOutUser,
	loginUser,
	refreshUser,
	registerUser,
} from './authOperatiom'

const handleRejected = (state, { payload }) => {
	state.isAuthorization = false
	state.isError = payload
}

const handlePending = state => {}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userId: null,
		nickname: null,
		isAuthorization: false,
		isError: false,
	},
	reducers: {
		updateUserProfile(state, { payload }) {
			console.log('updateUserProfile', payload)
			state.userId = payload.userId
			state.nickname = payload.nickname
			state.isAuthorization = true
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.userId = payload.userId
				state.nickname = payload.nickname
				state.isAuthorization = true
				state.isError = false
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.userId = payload.userId
				state.nickname = payload.nickname
				state.isAuthorization = true
				state.isError = false
			})
			// .addCase(refreshUser.fulfilled, (state, { payload }) => {})
			.addCase(logOutUser.fulfilled, state => {
				state.userId = null
				state.nickname = null
				state.isAuthorization = false
				state.isError = false
			})
			// .addCase(refreshUser.fulfilled, (state, { payload }) => {
			// 	console.log('refrash', payload)
			// 	state.userId = payload.userId
			// 	state.nickname = payload.nickname
			// 	state.isAuthorization = true
			// 	state.isError = false
			// })
			.addCase(registerUser.pending, handlePending)
			.addCase(loginUser.pending, handlePending)
			.addCase(logOutUser.pending, handlePending)
			// .addCase(refreshUser.pending, handlePending)
			.addCase(registerUser.rejected, handleRejected)
			.addCase(loginUser.rejected, handleRejected)
			.addCase(logOutUser.rejected, handleRejected)
		// .addCase(refreshUser.rejected, handleRejected)
	},
})

export const { updateUserProfile } = authSlice.actions

//
