import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { billTableData } from "../../../Components/Types/types";
import { FaEdit, FaEye } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../Components/Redux/TsHooks";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { Link } from "react-router-dom";
import { useRemoteSort } from "../../../Components/Common/SortHook/sortHook";
import { getAllClients } from "../../../Components/Redux/Slices/Clients/clients";
import { tableStyle } from "../../../Components/Common/TableStyle/tableStyle";

const ActionCell = ({data}:{data:billTableData})=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    
    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // console.log(data); 

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
                <div className='[&>li]:mb-2 [&>li>svg]:mr-2 [&>li>svg]:text-xl rounded-md overflow-hidden capitalize'>
                    <MenuItem className='text-mainLightBlue bg-mainBlue'><Link to='viewreport' state={{data:data,type:'view'}} className='w-full flex items-center gap-x-3'> عرض الفاتورة <FaEye className='text-xl' /></Link></MenuItem>
                    <MenuItem className='text-mainLightDark bg-gray-300'><Link to='editreport' state={{data:data,type:'edit'}} className='w-full flex items-center gap-x-3'> تعديل الفاتورة <FaEdit className='text-xl' /></Link></MenuItem>
                </div>
            </Menu>

            {/* <EditrestaurantModal open={openModal} close={handelClose} data={data} img={kfc} /> */}
        </div>
    );
}
const ReportsDatatable = () => {
    const navigate = useNavigate()
    const [page,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)
    const [searchValue,] = useState<string>('')
    const dispatch = useAppDispatch()
    const [paginated,] = useState<number>(1)

    const {currentPage} = useAppSelector((state) => state?.resetPagination);
    const {toggle} = useAppSelector((state) => state?.resetPagination);

    useEffect(() => {
        setpage(currentPage)
    }, [toggle])


    const {handleRemoteSort, icon} = useRemoteSort(getAllClients, dispatch, page, size, paginated, searchValue);

    const data:billTableData[] = [
        {id:1,name:'جورج استيفن عبد المسيح',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:2,name:'مايكل مرقص ناشد',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:3,name:'ali ali el sayed mohamed',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:4,name:'yasmine el sayed arfat',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:5,name:'mona mark',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:6,name:'mina ashraf zaki',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:7,name:'andrew ashrf',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:8,name:'andrew ashrf',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:9,name:'andrew ashrf',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
        {id:10,name:'andrew ashrf',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
    ]

    const columns:TableColumn<billTableData>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            // width:'80px',
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row?.name || '',
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => row?.date || '',
            sortable: true,
            // minWidth : '180px'
        },
        {
            name: 'Car Type',
            selector: (row) => row?.carType || '',
            sortable: false,
            // minWidth : '480px'
        },
        {
            name: 'Chassie',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.chassie}</span> || '',
            sortable: false,
        },
        {
            name: 'Motor',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.motor}</span> || '',
            sortable: false,
        },
        {
            name: 'Color',
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.color}</span> || '',
            sortable: false,
        },
        {
            name: 'Details',
            allowOverflow: true,
            button : true,
            cell: row=>(
                <>
                    {<ActionCell data={row} />}
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
                // direction={lang === 'ar' ? 'rtl' as Direction : 'ltr' as Direction}
                columns={columns}
                data={data}
                pagination
                paginationPerPage = {size}
                paginationRowsPerPageOptions = {[10,50,100]}
                paginationServer
                // paginationTotalRows={couriers?.couriers?.meta?.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowChange}
                customStyles={tableStyle}
                highlightOnHover
                onRowClicked={(data)=>navigate('viewreport',{state:{data:data,type:'view'}})}
                sortServer
                onSort={handleRemoteSort}
                sortIcon={icon}
                paginationDefaultPage={page}
                keyField="clients-table"
                paginationResetDefaultPage = {true}
                paginationComponentOptions={
                    {
                        // rowsPerPageText : t('common.paginationRowText'),
                        // rangeSeparatorText : t('common.paginationSeperateText')
                    }
                }
            />
        </div>
    );
}

export default ReportsDatatable;