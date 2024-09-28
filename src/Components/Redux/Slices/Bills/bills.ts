import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { HttpError, apiParamsType } from "../../../Types/types";
import axios from 'axios'
import { errorToast } from "../Toast-Messages/toastMessage";
// import { toast } from "react-toastify"

export const getBills = createAsyncThunk("BillsFunc", async({page,size,col,dir,searchValue} : apiParamsType, {rejectWithValue,dispatch})=>{
    // console.log(page,size);
    let colCheck;
    
    if (col) {
        colCheck = col === 'Joining Date' ? 'created_at' : col === 'Updated at' ? 'updated_at' : col === 'Name' ? 'full_name' : col === 'Status' ? 'is_active' : col.replace(/\s+/g, '').toLowerCase();
    }
    
    const url = !col ? `/users/couriers/all?page=${page ? page : 1}&size=${size ? size : 10}${searchValue ?`&search=${searchValue}`: ''}` : `/users/couriers/all?page=${page ? page : 1}&size=${size ? size : 10}${searchValue ?`&search=${searchValue}`: ''}&sortBy=${colCheck}&sortOrder=${dir?.toUpperCase()}`;
    try {
        const res = await axios.get(url)
        // console.log(res);
        return res.data

    } catch(error:unknown){
        const httpError = error as HttpError;

        if (httpError.response && httpError.response.data) {
            if(Array?.isArray(httpError?.response?.data?.errors)){
                httpError?.response?.data && httpError?.response?.data?.errors?.map(item=>dispatch(errorToast(item)))
            } else{
                dispatch(errorToast(httpError?.response?.data?.errors))
            }
            return rejectWithValue(httpError?.response?.data?.errors)
            } else if(navigator.onLine === false){
                dispatch(errorToast('Check Internet Connection'))
            }
            
            else {
                return rejectWithValue(httpError?.message)
        }
    }
})

const initialState = {
    bills : []
}
export const Bills = createSlice({
	name: "Bills Slice",
	initialState,
	reducers: {
		// errorToast: (state, action) =>
		// 	toast.error(action.payload, { toastId: "error1" }),

		// success: (state, action) =>
		// 	toast.success(action.payload, { toastId: "success1" }),
	},
    extraReducers(builder) {
        builder
        // .addCase()
    },
})

// export const { errorToast, success } = Bills.actions

export default Bills.reducer
