import { useState } from "react";
import DataTable, { Direction, TableColumn } from "react-data-table-component";
import { billTableData, translationType } from "../../../Components/Types/types";
import { FaEdit, FaEye } from "react-icons/fa";
import { useAppSelector } from "../../../Components/Redux/TsHooks";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { Link } from "react-router-dom";
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
                className='shadow-md p-0'
            >
                <div className='[&>li]:mb-2 [&>li>svg]:mr-2 [&>li>svg]:text-xl rounded-md overflow-hidden capitalize'>
                    <MenuItem className='text-mainLightBlue bg-mainBlue'><Link to='viewbill' state={{data:data,type:'view'}} className='w-full flex items-center gap-x-3'> عرض الفاتورة <FaEye className='text-xl' /></Link></MenuItem>
                    <MenuItem className='text-mainLightDark bg-gray-300 '><Link to='editbill' state={{data:data,type:'edit'}} className='w-full flex items-center gap-x-3'> تعديل الفاتورة <FaEdit className='text-xl' /></Link></MenuItem>
                </div>
            </Menu>

            {/* <EditrestaurantModal open={openModal} close={handelClose} data={data} img={kfc} /> */}
        </div>
    );
}
const BillsDatatable:React.FC<translationType> = ({t}) => {
    const {lang} = useAppSelector(state=>state?.lang)
    const navigate = useNavigate()
    const [,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)

    // const {handleRemoteSort, defState} = useRemoteSort(getAllCars,dispatch,page,size,searchValue)

    const data:billTableData[] = [
        {id:1,name:'جورج استيفن عبد المسيح',date:'20-10-2022',carType:'Audi',chassie:'LSXM255633',motor:'MOS85526',color:'red'},
    ]

    const columns:TableColumn<billTableData>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            maxWidth:'80px',
            sortable: true,
        },
        {
            name: t('common.name'),
            selector: (row) => row?.name || '',
            sortable: true,
        },
        {
            name: t('common.date'),
            selector: (row) => row?.date || '',
            sortable: true,
            // minWidth : '180px'
        },
        {
            name: t('common.carType'),
            selector: (row) => row?.carType || '',
            sortable: false,
            // minWidth : '480px'
        },
        {
            name: t('common.chassie'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.chassie}</span> || '',
            sortable: false,
        },
        {
            name: t('common.motor'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.motor}</span> || '',
            sortable: false,
        },
        {
            name: t('common.color'),
            cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.color}</span> || '',
            sortable: false,
        },
        {
            name: t('common.actions'),
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
                direction={lang === 'ar' ? 'rtl' as Direction : 'ltr' as Direction}

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
                onRowClicked={(data)=>navigate('viewbill',{state:{data:data,type:'view'}})}
                sortServer
                paginationComponentOptions={
                    {
                        rowsPerPageText : t('common.paginationRowText'),
                        rangeSeparatorText : t('common.paginationSeperateText')
                    }
                }
                // onSort={handleRemoteSort}
                // sortIcon={defState === 0 ? <FaSortAmountUp /> : <FaSortAmountUp className="text-[1px] opacity-0" />}
                // selectableRows
                // selectableRowsHighlight
                // onSelectedRowsChange={(e)=>console.log(e)}
            />
        </div>
    );
}

export default BillsDatatable;