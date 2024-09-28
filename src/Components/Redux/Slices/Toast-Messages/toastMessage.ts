import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const MessageSlice = createSlice({
	name: "Message Slice",
	initialState: {
		message: "",
	},
	reducers: {
		errorToast: (state, action) => {
			toast.error(action.payload, { toastId: "error1" });
			state.message = action.payload
			return state
		},

		success: (state, action) => {
			toast.success(action.payload, { toastId: "success1" });
			state.message = action.payload; // Update the state
			return state;
		}
	},
})

export const { errorToast, success } = MessageSlice.actions

export default MessageSlice.reducer
