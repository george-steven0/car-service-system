import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { HttpError, FormValues, Car } from '../../../Types/types';
import axios from 'axios'
import { toast } from "react-toastify"
import { errorToast } from "../Toast-Messages/toastMessage";

type getAllCarsProp = {
    page?:number,
    size?:number,
    searchValue?:string,
    col?:string|null,
    dir?:string|null,
    paginated? : number,
}

export const getAllClients = createAsyncThunk("getAllClientsFunc", async({paginated,page,size,searchValue}:getAllCarsProp, {rejectWithValue, dispatch})=>{
    // console.log(page,size);
    // let colCheck;
    
    // if (col) {
    //     colCheck = col === 'Joining Date' ? 'created_at' : col === 'Updated at' ? 'updated_at' : col === 'Name' ? 'full_name' : col === 'Status' ? 'is_active' : col.replace(/\s+/g, '').toLowerCase();
    // }
    
    const url = `/clients?paginated=${paginated ? 1 : 0}${paginated && page ? `&page=${page}` : ''}${paginated && size ? `&size=${size}` : ''}${searchValue ? `&searchValue=${searchValue}` : '' }`;
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
                return rejectWithValue(httpError?.message)
        }
    }
})

export const getClientById = createAsyncThunk("getClientByIdFunc", async(id:number|string, {rejectWithValue, dispatch})=>{
    
    const url = `/clients/${id}`;
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

export const addClient = createAsyncThunk("addClientFunc", async(data:FormValues, {rejectWithValue,dispatch})=>{
    
    const url = `/clients`;
    try {
        const res = await toast.promise(axios.post(url,data),{
            pending : "Loading....",
            success : "Client Added Successfully"
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

export const editClient = createAsyncThunk("editClientFunc", async({data,id}:{data:FormValues,id:number|string}, {rejectWithValue,dispatch})=>{
    
    const url = `/clients/${id}`;
    try {
        const res = await toast.promise(axios.put(url,data),{
            pending : "Loading....",
            success : "Client Updated Successfully"
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

export const deleteClient = createAsyncThunk("deleteClientFunc", async(id:number|string, {rejectWithValue,dispatch})=>{
    
    const url = `/clients/${id}`;
    try {
        const res = await toast.promise(axios.delete(url),{
            pending : "Loading....",
            success : "Client Deleted Successfully"
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

export type clientInit = {
    loading : boolean,
    clients : { 
        data: {
            id: number;
            name: string;
            phone: string | number;
            cars: Car[];
        }[],
        meta?: {
            current_page?: string | number;
            from?: string | number;
            last_page?: string | number;
            path?: string | number;
            per_page?: string | number;
            to?: string | number;
            total?: number;
        };
    } | {
        data: [];
        meta?: {
            current_page?: string | number;
            from?: string | number;
            last_page?: string | number;
            path?: string | number;
            per_page?: string | number;
            to?: string | number;
            total?: number;
        };
    },
    clientById : {
            id:number | string, name:string, phone:string, cars:Car[], brands : {
                id:number
                name:string
            }[]} | null 
    errors? : [] | unknown | undefined | null
}

const initialState:clientInit = {
    loading : false,
    clients : {data:[]},
    clientById : null,
    errors : null
}
export const clientSlice = createSlice({
	name: "Client Slice",
	initialState,
	reducers: {
		// errorToast: (state, action) =>
		// 	toast.error(action.payload, { toastId: "error1" }),

		// success: (state, action) =>
		// 	toast.success(action.payload, { toastId: "success1" }),
	},
    extraReducers(builder) {
        builder
        .addCase(getAllClients.pending, (state)=>{
            state.loading = true
        })
        .addCase(getAllClients.fulfilled, (state,action)=>{
            state.loading = false
            state.clients = action?.payload
        })
        .addCase(getAllClients.rejected, (state,action)=>{
            state.loading = false
            state.clients = {data : []}
            state.errors = action?.payload
        })

        .addCase(getClientById.pending, (state)=>{
            state.loading = true
        })
        .addCase(getClientById.fulfilled, (state,action)=>{
            state.loading = false
            state.clientById = action?.payload?.client
        })
        .addCase(getClientById.rejected, (state,action)=>{
            state.loading = false
            state.clientById = null
            state.errors = action?.payload
        })

        .addCase(addClient.pending, (state)=>{
            state.loading = true
        })
        .addCase(addClient.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(addClient.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

        .addCase(editClient.pending, (state)=>{
            state.loading = true
        })
        .addCase(editClient.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(editClient.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

        .addCase(deleteClient.pending, (state)=>{
            state.loading = true
        })
        .addCase(deleteClient.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(deleteClient.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

    },
})

// export const { errorToast, success } = CarSlice.actions

export default clientSlice.reducer
