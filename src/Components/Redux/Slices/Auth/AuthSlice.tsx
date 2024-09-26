import { createSlice } from "@reduxjs/toolkit"
// import { toast } from "react-toastify"
import { authType } from "../../../Types/types"

const initialState : authType = {
    auth : true
}
export const Auth = createSlice({
	name: "Auth Slice",
	initialState,
	reducers: {
		// errorToast: (state, action) =>
		// 	toast.error(action.payload, { toastId: "error1" }),

		// success: (state, action) =>
		// 	toast.success(action.payload, { toastId: "success1" }),
	},
})

// export const { errorToast, success } = Auth.actions

export default Auth.reducer
