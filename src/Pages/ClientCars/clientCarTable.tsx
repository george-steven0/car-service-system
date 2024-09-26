import { useState } from "react";
import DataTable, { TableColumn, TableStyles } from "react-data-table-component";
import {useRemoteSort} from '../../Components/Common/SortHook/sortHook'
import { FaSortAmountUp } from "react-icons/fa";
import { getBills } from "../../Components/Redux/Slices/Bills/bills";
import { useAppDispatch } from "../../Components/Redux/TsHooks";
import { useNavigate } from "react-router-dom";
import { Button, ListItemButton, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { carsTable } from "../../Components/Types/types";
import EditClientCarModal from "./Modals/editClientCar";
// import EditCarModal from "./Modals/editCar";

const ActionCell = ({data}:{data:carsTable})=>{
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

    return (
        <div className='action-wrapper relative'>
            <ListItemButton className='rounded-md' onClick={handleClick}><span><BiDotsHorizontalRounded className='text-xl' /></span></ListItemButton>
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
                <MenuItem className='text-[#545151c2] bg-mainLightBlue rounded-md hover:bg-mainLightBlue' onClick={handelModalOpen}>
                    <Button>تعديل</Button>
                </MenuItem>
            </Menu>

            <EditClientCarModal open={openModal} close={handelModalClose} data={data} />
        </div>
    );
}

const ClientCarTable = () => {
    const navigate = useNavigate()
    const [page,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)
    const [searchValue,setsearchValue] = useState<string>('')
    const dispatch = useAppDispatch()

    const {handleRemoteSort, defState} = useRemoteSort(getBills,dispatch,page,size,searchValue)

    const customStyles:TableStyles = {
        headRow: {
            style: {
            border: 'none',
            backgroundColor : '#fff'

            },
        },
        headCells: {
            style: {
                color: '#B5B5C3',
                fontSize: '14px',
                position : 'relative',
                justifyContent : 'center'
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: '#442b7e12',
                borderBottomColor: '#FFFFFF',
                borderRadius: '5px',
                outline: '1px solid #FFFFFF',
            },
            style : {
                cursor : 'pointer'
            }
        },
        pagination: {
            style: {
                border: 'none',
            },
        },
        cells: {
            style:{
                padding : '5px 0px',
                fontSize : '12px',
                justifyContent : 'center',
                fontWeight : '500',
                // cursor : 'pointer'
            }
        }
    };

    const data:carsTable[] = [
        {id:1,name:'chevorlet',},
        {id:2,name:'BMW',},
    ]

    const columns:TableColumn<carsTable>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            maxWidth:'180px',
            sortable: true,
        },
        {
            name: 'Client Name',
            selector: (row) => row?.name || '',
            sortable: true,
            grow:1
        },
        {
            name: 'Car Name',
            selector: (row) => row?.name || '',
            sortable: true,
            grow:1
        },
        {
            name: 'Actions',
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
                columns={columns}
                data={data}
                pagination
                paginationPerPage = {size}
                paginationRowsPerPageOptions = {[10,50,100]}
                paginationServer
                // paginationTotalRows={couriers?.couriers?.meta?.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowChange}
                customStyles={customStyles}
                highlightOnHover
                // onRowClicked={(data)=>navigate('viewbill',{state:{data:data,type:'view'}})}
                sortServer
                onSort={handleRemoteSort}
                sortIcon={defState === 0 ? <FaSortAmountUp /> : <FaSortAmountUp className="text-[1px] opacity-0" />}
                // selectableRows
                // selectableRowsHighlight
                // onSelectedRowsChange={(e)=>console.log(e)}
            />
        </div>
    );
}

export default ClientCarTable;