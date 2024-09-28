import { AiFillEdit } from "react-icons/ai"; 
import { MdDeleteSweep } from "react-icons/md"; 
import { useEffect, useState } from "react";
import DataTable, { Direction, TableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../Components/Redux/TsHooks";
import { Button, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { carObject, carsData } from '../../Components/Types/types';
import EditCarModal from "./Modals/editCar";
import { tableStyle } from "../../Components/Common/TableStyle/tableStyle";
import { WarningModal } from "../../Components/Common/Modals/modals";
import { deleteCar, getAllCars, getCarBrand } from "../../Components/Redux/Slices/Cars/carSlice";
import { useRemoteSort } from "../../Components/Common/SortHook/sortHook";
import { resetPage } from "../../Components/Redux/Slices/ResetPagination/resetPagination";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ActionCell = ({data,t,lang}:{data:carsData,t:TFunction,lang?:string | null | undefined})=>{

    const id = data?.id

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()

    const open = Boolean(anchorEl);
    
    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // edit modal properties
    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)
    
    // warning modal properties
    const [openWarning, setopenWarning] = useState(false)
    const handelWarningOpen = ()=>setopenWarning(true)
    const handelWarningClose = ()=>setopenWarning(false)
    // console.log(data); 

    const handleDelete = ()=>{
        const page =1,
            size = 10,
            paginated = 1
        if(id){
            dispatch(deleteCar(id)).then( (e)=>{
                if(e?.meta?.requestStatus === 'fulfilled'){
                    dispatch(getAllCars({page,size,paginated}))
                    dispatch(resetPage())
                }
                handelWarningClose()
            } )
        }
    }
    return (
        <div className='action-wrapper relative'>
            <Button className='rounded-md' onClick={handleClick}><span><BiDotsHorizontalRounded className='text-xl' /></span></Button>
            <Menu
                id="datatable-action-menu"
                aria-labelledby="datatable-action-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                className='shadow-md p-0'
                sx={{'& .MuiList-root' : {p:0}}}
            >
                <div className="[&>li>button]:font-semibold">
                    <MenuItem className='mb-2' onClick={handelModalOpen}>
                        <Button className={`text-mainBlue flex items-center gap-2 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>{t('common.edit')} <AiFillEdit className="text-xl" /></Button>
                    </MenuItem>

                    <MenuItem onClick={handelWarningOpen}>
                        <Button className={`text-danger flex items-center gap-2 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>{t('common.delete')} <MdDeleteSweep className="text-xl" /></Button>
                    </MenuItem>
                </div>
            </Menu>

            <EditCarModal open={openModal} close={handelModalClose} data={data} t={t} lang={lang} />
            <WarningModal open={openWarning} close={handelWarningClose} data={data} deleteFunc={handleDelete} />
        </div>
    );
}

type expandleProps = {
    data : {
        name : string,
        id : number
    }
}

type brands = {
    data : {
        name : string,
        id : number
    }[]
}

const ExpandedComponent = ({ data }:expandleProps) => {
    const {t} = useTranslation()
    const id = data?.id
    const dispatch = useAppDispatch()
    const [brands, setbrands] = useState<brands | null>(null);
    
    useEffect(() => {
        if (id) {
            dispatch(getCarBrand(id)).then((response) => {
                setbrands(response?.payload);
            });
        }
    }, [dispatch, id]);

    // console.log(brands);
    
    
    return(
        <div className="mb-2">
            <div className="bg-mainLightBlue p-2">
                <div className="col-span-full grid grid-cols-2 gap-2 mb-2 text-mainBlue pb-2 border-b-2 border-mainBlue">
                    <p>#</p>
                    <p>{t('common.brand')}</p>
                </div>
                {brands?.data?.map( (brand,index:number)=>(
                    <div key={index} className="grid grid-cols-2 gap-2 bg-mainLightBlue p-2 pb-1 border-b mb-1">
                        <p>{index + 1}</p>
                        <p>{brand?.name}</p>
                    </div>
                ) )}
            </div>
            
        </div>
    )
};


const CarsTable = ({data,searchValue,t,lang}:{data:carObject,searchValue:string,t:TFunction,lang?:string | null | undefined }) => {
    const dispatch = useAppDispatch()
    const [page,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)
    const [paginated,] = useState<number>(1)

    const {currentPage} = useAppSelector((state) => state?.resetPagination);
    const {toggle} = useAppSelector((state) => state?.resetPagination);

    useEffect(() => {
        setpage(currentPage)
    }, [currentPage, toggle])

    // const [searchValue,setsearchValue] = useState<string>('')
    // const dispatch = useAppDispatch()

    const columns:TableColumn<carsData>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            // maxWidth:'180px',
            sortable: false,
        },
        {
            name: t('common.name'),
            cell: (row) => <span className="capitalize">{row?.name || ''}</span>,
            sortable: false,
            grow:1
        },
        {
            name: t('common.actions'),
            allowOverflow: true,
            button : true,
            cell: row=>(
                <>
                    {<ActionCell data={row} t={t} lang={lang} />}
                </>
            )
                
        },
    ];

    const handlePageChange = (page:number) => {
        setpage(page);        
    };

    const handleRowChange = (rows:number) => {
        setsize(rows);        
    };

    const {handleRemoteSort, icon} = useRemoteSort(getAllCars, dispatch, page, size, paginated,searchValue);

    // console.log(data?.cars?.meta?.total);
    
    return ( 
        <div>
            <DataTable
                direction={lang === 'ar' ? 'rtl' as Direction : 'ltr' as Direction}

                columns={columns}
                data={data?.cars?.data || []}
                pagination
                paginationPerPage = {size}
                paginationRowsPerPageOptions = {[10,50,100]}
                paginationServer
                paginationTotalRows={data?.cars?.meta?.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowChange}
                customStyles={tableStyle}
                highlightOnHover
                sortServer
                sortIcon={icon}
                onSort={handleRemoteSort}
                expandableRows 
                expandableRowsComponent={ExpandedComponent}
                expandableIcon={{
                    collapsed : lang === 'en' ? <FaAngleRight /> : <FaAngleLeft />,
                    expanded : <FaAngleDown />
                }}
                keyField="cars-table"
                paginationDefaultPage={page}
                paginationResetDefaultPage = {true}
                paginationComponentOptions={
                    {
                        rowsPerPageText : t('common.paginationRowText'),
                        rangeSeparatorText : t('common.paginationSeperateText')
                    }
                }
            />
        </div>
    );
}

export default CarsTable;