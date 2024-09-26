import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch } from "../../Redux/TsHooks";
import { useEffect, useState } from "react";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { apiParamsType, billState } from "../../Types/types";

type search = {
    apiFunc: (params: apiParamsType) => ThunkAction<void, { bills:billState }, unknown, AnyAction>,
    placeholder : string,
    getsearchValue : (e:string)=>void
}
const SearchInput = ({apiFunc,placeholder,getsearchValue}:search) => {

    const [searchValue, setsearchValue] = useState('')
    const [page,setpage] = useState(1)
    const [size,setsize] = useState(10)

    const dispatch = useAppDispatch()

    // const handleSearch = ()=>{
    //     dispatch(apiFunc({searchValue}))
    // }

    const handleReset = ()=>{
        dispatch(apiFunc({page,size}))
        setsearchValue('')
    }

    

    // useEffect(() => {
    //     dispatch(apiFunc({page,size,searchValue}))
    // }, [searchValue, page, size, dispatch, apiFunc])
    

    return ( 
        <>
            <FormControl className="[&>div>input]:py-[12px]" sx={{width: '35ch',backgroundColor:'white',borderRadius:'6px','& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input':{padding : '8px'}, '& fieldset': { borderColor: 'primary.main',border:'none' } }} variant="outlined">
                <OutlinedInput
                    type="search"
                    id="outlined-adornment-search"
                    placeholder={placeholder}
                    onChange={(e)=>{
                        getsearchValue(e?.target?.value?.trim())
                        // setsearchValue(e.target.value.trim())
                        if (!e.target.value) {
                            handleReset();
                        }}}
                    startAdornment={
                    <InputAdornment position="start">
                        
                        {/* <IconButton
                            aria-label="search"
                            onClick={handleSearch}
                            edge="start"
                        >
                            <CiSearch />
                        </IconButton> */}
                    </InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
}

export default SearchInput;