import { FaAngleDown } from "react-icons/fa"; 
import { FaAngleLeft } from "react-icons/fa"; 
import { FaAngleRight } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../Components/Redux/TsHooks";
import { Button, Menu, MenuItem } from "@mui/material";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { Car, FormValues } from '../../Components/Types/types';
import EditClientModal from "./editClient";
import { tableStyle } from "../../Components/Common/TableStyle/tableStyle";
import { deleteClient, getAllClients, getClientById } from "../../Components/Redux/Slices/Clients/clients";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { WarningModal } from "../../Components/Common/Modals/modals";
import { useRemoteSort } from "../../Components/Common/SortHook/sortHook";
import { resetPage } from "../../Components/Redux/Slices/ResetPagination/resetPagination";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

const ActionCell = ({data,t,lang}:{data:FormValues,t:TFunction,lang:string})=>{
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
        const page = 1,
            size = 10,
            paginated = 1
        if(id){
            dispatch(deleteClient(id)).then( (e)=>{
                if(e?.meta?.requestStatus === 'fulfilled'){
                    dispatch(getAllClients({page,size,paginated}))
                    dispatch(resetPage())
                }
                close()
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
            >
                <MenuItem className='mb-2' onClick={handelModalOpen}>
                    <Button className={`text-mainBlue flex items-center gap-2 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>{t('common.edit')} <AiFillEdit className="text-xl" /></Button>
                </MenuItem>

                <MenuItem onClick={handelWarningOpen}>
                    <Button className={`text-danger flex items-center gap-2 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>{t('common.delete')} <MdDeleteSweep className="text-xl" /></Button>
                </MenuItem>
            </Menu>

            <EditClientModal open={openModal} close={handelModalClose} data={data} />
            <WarningModal open={openWarning} close={handelWarningClose} data={data} deleteFunc={handleDelete} />

        </div>
    );
}

type expandleProps = {
    client : {
        cars : {
            id?:number|string
            make: string;
            model: string;
            plate_number?: string;
            chase_number?: string | number;
            motor_number?: string | number;
            color:string,
        }[]
    }
}

const ExpandedComponent = ({ data }:{data:FormValues}) => {
    const {t} = useTranslation()
    const id = data?.id
    const dispatch = useAppDispatch()
    const [clientData, setClientData] = useState<expandleProps | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(getClientById(id)).then((response) => {
                setClientData(response?.payload);
            });
        }
    }, [dispatch, id]);

    // console.log(clientData?.client?.cars);
    
    
    return(
        <div className="mb-2">
            <div className="bg-mainLightBlue p-2">
                <div className="col-span-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-2 text-mainBlue pb-2 border-b-2 border-mainBlue">
                    <p>#</p>
                    <p>{t('common.brand')}</p>
                    <p>{t('common.model')}</p>
                    <p>{t('common.chassie')}</p>
                    <p>{t('common.motor')}</p>
                    <p>{t('common.plateNumber')}</p>
                    <p>{t('common.color')}</p>
                </div>
                {clientData?.client?.cars?.map( (car,index)=>(
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-mainLightBlue p-2 pb-1 border-b mb-1">
                        <p>{index + 1}</p>
                        <p>{car?.make}</p>
                        <p>{car?.model}</p>
                        <p>{car?.chase_number}</p>
                        <p>{car?.motor_number}</p>
                        <p>{car?.plate_number}</p>
                        <p>{car?.color}</p>
                    </div>
                ) )}
            </div>
            
        </div>
    )
};


type clientsPropType = {
    data : {
        loading : boolean,
        // clients : { data : { id:number, name:string, phone : string | number}[] | []},
        clients : { 
                data : { id:number, name:string, phone : string | number,cars: Car[]; }[],
                meta: {
                    current_page?: string | number,
                    from?: string | number,
                    last_page?: string | number,
                    path?:string | number ,
                    per_page?: string | number,
                    to?: string | number,
                    total?: number
                } 
            } | { 
                data: [],
                meta: {
                    current_page?: string | number,
                    from?: string | number,
                    last_page?: string | number,
                    path?:string | number ,
                    per_page?: string | number,
                    to?: string | number,
                    total?: number
                }  } ,
        clientById : {id:number | string, name:string, phone:string, cars:Car[]} | null 
        errors? : [] | unknown | undefined | null
    },
    searchValue? : string
    t : TFunction,
    lang ?: string
    
}

const ClientsTable = ({data,searchValue,t,lang}:clientsPropType) => {
    const [page,setpage] = useState<number>(1)
    const [size,setsize] = useState<number>(10)
    const [paginated,setpaginated] = useState<number>(1)

    const dispatch = useAppDispatch()

    const {currentPage} = useAppSelector((state) => state?.resetPagination);
    const {toggle} = useAppSelector((state) => state?.resetPagination);

    useEffect(() => {
        setpage(currentPage)
    }, [toggle])

    // const customStyles:TableStyles = {
    //     headRow: {
    //         style: {
    //         border: 'none',
    //         backgroundColor : '#fff'

    //         },
    //     },
    //     headCells: {
    //         style: {
    //             color: '#B5B5C3',
    //             fontSize: '14px',
    //             position : 'relative',
    //             justifyContent : 'center'
    //         },
    //     },
    //     rows: {
    //         highlightOnHoverStyle: {
    //             backgroundColor: '#442b7e12',
    //             borderBottomColor: '#FFFFFF',
    //             borderRadius: '5px',
    //             outline: '1px solid #FFFFFF',
    //         },
    //         style : {
    //             cursor : 'pointer'
    //         }
    //     },
    //     pagination: {
    //         style: {
    //             border: 'none',
    //         },
    //     },
    //     cells: {
    //         style:{
    //             padding : '5px 0px',
    //             fontSize : '12px',
    //             justifyContent : 'center',
    //             fontWeight : '500',
    //             // cursor : 'pointer'
    //         }
    //     }
    // };


    const columns:TableColumn<FormValues>[] = [
        {
            name: 'ID',
            selector: (row) => row.id || '',
            // width:'80px',
            sortable: false,
        },
        {
            name: t('common.name'),
            selector: (row) => row?.name || '',
            sortable: false,
        },
        {
            name: t('common.phone'),
            selector: (row) => row?.phone || '',
            sortable: false,
        },
        // {
        //     name: 'Car',
        //     selector: (row) => row?.car || '',
        //     sortable: true,
        //     // minWidth : '180px'
        // },
        // {
        //     name: 'Chassie',
        //     selector: (row) => row?.chassie || '',
        //     sortable: false,
        //     // minWidth : '480px'
        // },
        // {
        //     name: 'Motor',
        //     cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.motor}</span> || '',
        //     sortable: false,
        // },
        // {
        //     name: 'Color',
        //     cell: (row) => <span data-tag="allowRowEvents" className="capitalize">{row?.color}</span> || '',
        //     sortable: false,
        // },
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

    const {handleRemoteSort, icon} = useRemoteSort(getAllClients, dispatch, page, size, paginated, searchValue);
        
    return ( 
        <div>
            <DataTable
                direction={lang === 'ar' ? 'rtl' : 'ltr'}
                columns={columns}
                data={data?.clients?.data || []}
                pagination
                paginationPerPage = {size}
                paginationRowsPerPageOptions = {[10,50,100]}
                paginationServer
                paginationTotalRows={data?.clients?.meta?.total }
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowChange}
                customStyles={tableStyle}
                highlightOnHover
                // onRowClicked={(data)=>navigate('viewbill',{state:{data:data,type:'view'}})}
                sortServer
                sortIcon={icon}
                onSort={handleRemoteSort}
                expandableRows 
                expandableRowsComponent={ExpandedComponent}
                expandableIcon={{
                    collapsed : lang === 'en' ? <FaAngleRight /> : <FaAngleLeft />,
                    expanded : <FaAngleDown />
                }}
                paginationDefaultPage={page}
                keyField="clients-table"
                paginationResetDefaultPage = {true}
                paginationComponentOptions={
                    {
                        rowsPerPageText : t('common.paginationRowText'),
                        rangeSeparatorText : t('common.paginationSeperateText')
                    }
                }
                // selectableRows
                // selectableRowsHighlight
                // onSelectedRowsChange={(e)=>console.log(e)}
            />
        </div>
    );
}

export default ClientsTable;