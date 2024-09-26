import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { HttpError, FormValues, Car, sparepartTableData } from '../../../Types/types';
import axios from 'axios'
import { toast } from "react-toastify"
import { errorToast } from "../Toast-Messages/toastMessage";

type getAllParts = {
    page?:number,
    size?:number,
    searchValue?:string,
    col?:string|null,
    dir?:string|null,
    paginated? : number,
    type? : string
}

export const getAllSpareparts = createAsyncThunk("getAllSparepartsFunc", async({type,paginated,page,size,searchValue}:getAllParts, {rejectWithValue, dispatch})=>{
    
    const url = `/spare-parts?paginated=${1}${page ? `&page=${page}` : ''}${size ? `&size=${size}` : ''}${searchValue ? `&searchValue=${searchValue}` : '' }${type && type !== '' ? `&type=${type}` : ''}` ;
    try {
        const res = await axios.get(url)
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
                return rejectWithValue(httpError.message)
        }
    }
})

export const addSparepart = createAsyncThunk("addSparepartFunc", async(data:sparepartTableData, {rejectWithValue,dispatch})=>{
    
    const url = `/spare-parts`;
    try {
        const res = await toast.promise(axios.post(url,data),{
            pending : "Loading....",
            success : "Item Added Successfully"
        })
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

export const editSparepart = createAsyncThunk("editSparepartFunc", async({data,id}:{data:sparepartTableData, id:number}, {rejectWithValue,dispatch})=>{
    
    const url = `/spare-parts/${id}`;
    try {
        const res = await toast.promise(axios.put(url,data),{
            pending : "Loading....",
            success : "Item Updated Successfully"
        })
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

export const deleteSparepart = createAsyncThunk("deleteSparepartFunc", async(id:number|string, {rejectWithValue,dispatch})=>{
    
    const url = `/spare-parts/${id}`;
    try {
        const res = await toast.promise(axios.delete(url),{
            pending : "Loading....",
            success : "Item Deleted Successfully"
        })
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

export type sparePartInit = {
    loading : boolean,
    spareparts : {
        data : [],
        meta?: {
            current_page?: string | number,
            from?: string | number,
            last_page?: string | number,
            path?:string | number ,
            per_page?: string | number,
            to?: string | number,
            total?: number
        }
    } ,
    errors? : [] | unknown | undefined | null
}

const initialState:sparePartInit = {
    loading : false,
    spareparts : {data : []},
    errors : null
}
export const sparepartSlice = createSlice({
	name: "spare-parts Slice",
	initialState,
	reducers: {
	},
    extraReducers(builder) {
        builder
        .addCase(getAllSpareparts.pending, (state)=>{
            state.loading = true
        })
        .addCase(getAllSpareparts.fulfilled, (state,action)=>{
            state.loading = false
            state.spareparts = action?.payload
        })
        .addCase(getAllSpareparts.rejected, (state,action)=>{
            state.loading = false
            state.spareparts = {data : []}
            state.errors = action?.payload
        })

        .addCase(deleteSparepart.pending, (state)=>{
            state.loading = true
        })
        .addCase(deleteSparepart.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(deleteSparepart.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

        .addCase(editSparepart.pending, (state)=>{
            state.loading = true
        })
        .addCase(editSparepart.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(editSparepart.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

    },
})

// export const { errorToast, success } = CarSlice.actions

export default sparepartSlice.reducer
