import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { carsData, HttpError } from "../../../Types/types";
import axios from 'axios'
import { toast } from "react-toastify"
import { errorToast } from "../Toast-Messages/toastMessage";

export type initCarsState = {
    loading : boolean,
    cars : { data : carsData[] } | null,
    brands : [],
    errors : null | [] | unknown
}

type CarPropType = {
    data : {
        name : string,
    },
    id?:number,
    meta?: {
        current_page?: string | number,
        from?: string | number,
        last_page?: string | number,
        path?:string | number ,
        per_page?: string | number,
        to?: string | number,
        total?: string | number
    }
}

type addCarProp = {
    name : string
}

type getAllCarsProp = {
    page?:number,
    size?:number,
    searchValue?:string,
    col?:string|null,
    dir?:string|null,
    paginated? : number,
}

export const getAllCars = createAsyncThunk("getAllCarsFunc", async({paginated,page,size,searchValue}:getAllCarsProp, {rejectWithValue, dispatch})=>{
    // console.log(page,size);
    // let colCheck;
    
    // if (col) {
    //     colCheck = col === 'Joining Date' ? 'created_at' : col === 'Updated at' ? 'updated_at' : col === 'Name' ? 'full_name' : col === 'Status' ? 'is_active' : col.replace(/\s+/g, '').toLowerCase();
    // }
    
    const url = `/car-types?paginated=${paginated ? 1 : 0}${paginated && page ? `&page=${page}` : ''}${paginated && size ? `&size=${size}` : ''}${searchValue ? `&searchValue=${searchValue}` : '' }`;
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

export const addCar = createAsyncThunk("addCarFunc", async(data:addCarProp, {rejectWithValue, dispatch})=>{

    const url = `/car-types`;
    try {
        const res = await toast.promise(axios.post(url,data),{
            pending : "Loading....",
            success : "Car Added Successfully"
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

export const editCar = createAsyncThunk("editCarFunc", async({data,id}:CarPropType, {rejectWithValue, dispatch})=>{

    const url = `/car-types/${id}`;
    try {
        const res = await toast.promise(axios.put(url,data),{
            pending : "Loading....",
            success : "Car Updated Successfully"
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

export const deleteCar = createAsyncThunk("deleteCarFunc", async(id:number, {rejectWithValue,dispatch})=>{

    const url = `/car-types/${id}`;
    try {
        const res = await toast.promise(axios.delete(url),{
            pending : "Loading....",
            success : "Car Deleted Successfully"
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

export const getCarBrand = createAsyncThunk("getCarBrandFunc", async(id:number, {rejectWithValue, dispatch})=>{
    // console.log(page,size);
    // let colCheck;
    
    // if (col) {
    //     colCheck = col === 'Joining Date' ? 'created_at' : col === 'Updated at' ? 'updated_at' : col === 'Name' ? 'full_name' : col === 'Status' ? 'is_active' : col.replace(/\s+/g, '').toLowerCase();
    // }
    
    const url = `/car-types/${id}/brands`;
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


const initialState:initCarsState = {
    loading : false,
    cars : null,
    brands : [],
    errors : null
}
export const CarSlice = createSlice({
	name: "Car Slice",
	initialState,
	reducers: {
		// errorToast: (state, action) =>
		// 	toast.error(action.payload, { toastId: "error1" }),

		// success: (state, action) =>
		// 	toast.success(action.payload, { toastId: "success1" }),
	},
    extraReducers(builder) {
        builder
        .addCase(getAllCars.pending, (state)=>{
            state.loading = true
        })
        .addCase(getAllCars.fulfilled, (state,action)=>{
            state.loading = false
            state.cars = action?.payload?.carTypes
        })
        .addCase(getAllCars.rejected, (state,action)=>{
            state.loading = false
            state.cars = null
            state.errors = action?.payload
        })

        .addCase(editCar.pending, (state)=>{
            state.loading = true
        })
        .addCase(editCar.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(editCar.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

        .addCase(deleteCar.pending, (state)=>{
            state.loading = true
        })
        .addCase(deleteCar.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(deleteCar.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })

        .addCase(getCarBrand.pending, (state)=>{
            state.loading = true
        })
        .addCase(getCarBrand.fulfilled, (state,action)=>{
            state.loading = false
            state.brands = action?.payload?.data || []
        })
        .addCase(getCarBrand.rejected, (state,action)=>{
            state.loading = false
            state.errors = action?.payload
        })
    },
})

// export const { errorToast, success } = CarSlice.actions

export default CarSlice.reducer
