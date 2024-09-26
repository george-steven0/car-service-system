import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const MessageSlice = createSlice({
	name: "Message Slice",
	initialState: {
		message: "",
	},
	reducers: {
		errorToast: (_, action) =>
			toast.error(action.payload, { toastId: "error1" }),

		success: (_, action) =>
			toast.success(action.payload, { toastId: "success1" }),
	},
})

export const { errorToast, success } = MessageSlice.actions

export default MessageSlice.reducer
