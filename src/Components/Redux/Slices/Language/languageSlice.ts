import { createSlice } from "@reduxjs/toolkit"

export const LangSlice = createSlice({
	name: "Lang Slice",
	initialState: {
		lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : "ar",
	},
	reducers: {
        changeLang : (state,action)=>{
            state.lang = action?.payload 
        }

	},
})

export const { changeLang } = LangSlice.actions

export default LangSlice.reducer
