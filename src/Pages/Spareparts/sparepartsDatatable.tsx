import { useEffect, useState } from "react";
import DataTable, { Direction, TableColumn } from "react-data-table-component";
import {useRemoteSort} from '../../Components/Common/SortHook/sortHook'
import { useAppDispatch, useAppSelector } from "../../Components/Redux/TsHooks";
import { Button, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { sparepartTableData } from "../../Components/Types/types";
import { tableStyle } from "../../Components/Common/TableStyle/tableStyle";
import { deleteSparepart, getAllSpareparts } from "../../Components/Redux/Slices/Spareparts/sparePartSlice";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { WarningModal } from "../../Components/Common/Modals/modals";
import { resetPage } from "../../Components/Redux/Slices/ResetPagination/resetPagination";
import EditSparepart from "./editSparepart";
import { TFunction } from "i18next";

const ActionCell = ({data,t,lang}:{data:sparepartTableData, t:TFunction, lang?:string | null | undefined})=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()

    const open = Boolean(anchorEl);
    
    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)
    // console.log(data); 

    // warning modal properties
    const [openWarning, setopenWarning] = useState(false)
    const handelWarningOpen = ()=>setopenWarning(true)
    const handelWarningClose = ()=>setopenWarning(false)
    // console.log(data); 

    const id = data?.id

    const handleDelete = ()=>{
        const page =1,
            size = 10,
            paginated = 1
        if(id){
            dispatch(deleteSparepart(id)).then( (e)=>{
                if(e?.meta?.requestStatus === 'fulfilled'){
                    dispatch(getAllSpareparts({page,size,paginated}))
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
                PaperProps={{ style: { boxShadow: 'none',padding:0 } }}
                className='shadow-md p-0'
            >
                <MenuItem className='mb-2' onClick={handelModalOpen}>
                    <Button className={`text-mainBlue flex items-center gap-2 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>{t('common.edit')} <AiFillEdit className="text-xl" /></Button>
                </MenuItem>

                <MenuItem onClick={handelWarningOpen}>
                    <Button className={`text-danger flex items-center gap-2 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>{t('common.delete')} <MdDeleteSweep className="text-xl" /></Button>
                </MenuItem>
            </Menu>

            <EditSparepart open={openModal} close={handelModalClose} data={data} t={t} lang={lang} />
            <WarningModal open={openWarning} close={handelWarningClose} data={data} deleteFunc={handleDelete} />
        </div>
    );
}

type sparePartProps = {
    type : string,
    data : {
        spareparts : {
            data : [],
            links?:object,
            meta?: {
                current_page?: string | number,
                from?: string | number,
                last_page?: string | number,
                path?:string | number ,
                per_page?: string | number,
                to?: string | number,
                total?: number
            }
        }
        
    },
    searchValue:string,
    t:TFunction,
    lang : string | null
}
const SparepartsDatatable = ({type,data,searchValue,t,lang}:sparePartProps) => {
    const [page,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)
    const [paginated,setpaginated] = useState<number>(1)
    const dispatch = useAppDispatch()

    const {currentPage} = useAppSelector((state) => state?.resetPagination);
    const {toggle} = useAppSelector((state) => state?.resetPagination);

    useEffect(() => {
        setpage(currentPage)
    }, [toggle])

    const {handleRemoteSort, icon} = useRemoteSort(getAllSpareparts, dispatch, page, size, paginated,searchValue,type);

    const columns:TableColumn<sparepartTableData>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            width:'80px',
            sortable: false,
        },
        {
            name: t('common.name'),
            selector: (row) => row?.name || '',
            sortable: false,
        },
        {
            name: t('common.code'),
            selector: (row) => row?.code || '',
            sortable: false,
            // minWidth : '180px'
        },
        {
            name: t('common.qnt'),
            selector: (row) => row?.stock || '',
            sortable: false,
            // minWidth : '480px'
        },
        {
            name: t('common.buy.price'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.buy_price}</span> || '',
            sortable: false,
            // omit : true  // this line to hide this column based on condition (hide this column for all users except admin)
        },
        {
            name: t('common.sell.price'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.price}</span> || '',
            sortable: false,
        },
        {
            name: t('common.type'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.type?.replace(/_/g,' ')}</span> || '',
            sortable: false,
        },
        {
            name: t('common.notes'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.notes}</span> || '',
            minWidth : '250px',
            sortable: false,
        },
        {
            name: t('common.date'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.date}</span> || '',
            sortable: false,
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

    return ( 
        <div>
            <DataTable
                direction={lang === 'ar' ? 'rtl' as Direction : 'ltr' as Direction}
                columns={columns}
                data={data?.spareparts?.data}
                pagination
                paginationPerPage = {size}
                paginationRowsPerPageOptions = {[10,50,100]}
                paginationServer
                paginationTotalRows={data?.spareparts?.meta?.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowChange}
                customStyles={tableStyle}
                highlightOnHover
                // onRowClicked={(data)=>navigate('viewbill',{state:{data:data,type:'view'}})}
                sortServer
                sortIcon={icon}
                onSort={handleRemoteSort}
                paginationDefaultPage={page}
                keyField="spare-parts"
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

export default SparepartsDatatable;