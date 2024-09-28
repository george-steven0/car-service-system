import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import BillsDatatable from "./BillsDatatable/billDatatable";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../Components/Redux/TsHooks";

type filterItem ={
    label:string,
    param:string
}

// function ActionCell({ data }) {
//     // const [openModal, setopenModal] = useState(false)
//     // const handelOpen = ()=>setopenModal(true)
//     // const handelClose = ()=>setopenModal(false)
//     // console.log(data);

//     const [anchorEl, setAnchorEl] = useState(null);

//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     // console.log(data); 

//     return (
//         <div className='action-wrapper relative'>
//             <ListItemButton className='rounded-md' onClick={handleClick}><span><BiDotsHorizontalRounded className='text-xl' /></span></ListItemButton>
//             <Menu
//                 id="datatable-action-menu"
//                 aria-labelledby="datatable-action-button"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//                 }}
//                 transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//                 }}
//                 PaperProps={{ style: { boxShadow: 'none',padding:0 } }}
//                 className='shadow-md p-0'
//             >
//                 <div className='[&>li]:mb-2 [&>li>svg]:mr-2 [&>li>svg]:text-xl rounded-md overflow-hidden capitalize'>
//                     {/* <MenuItem className='text-mainGreen hover:bg-[#5cac7d42]'><BsTelephone /> +9225621123</MenuItem> */}
//                     <MenuItem className='text-[#545151c2] hover:bg-[#442b7e42]'><Link to='details' state={{id:data?.id,type:'status'}} className='w-full flex items-center gap-x-3'><FaEye className='text-xl' /> View Details</Link></MenuItem>
//                     {/* <MenuItem className='text-[#6993FF] hover:bg-[#6994ff42]'><FaStore />restaurant profile </MenuItem> */}
//                     {/* <MenuItem className='text-mainYellow hover:bg-[#d9ad5642]'><FaBarcode />restaurant menu</MenuItem> */}
//                     {/* <MenuItem className='text-[#3699FF] hover:bg-[#369bff42]'><Link to='/dashboard/restaurant/orders' state={{id:data?.id, name:data?.name}} className='w-full flex items-center gap-x-3' ><RiMoneyDollarCircleLine className='text-2xl' />completed orders</Link></MenuItem> */}
//                     {/* <MenuItem className='text-mainRed hover:bg-[#c6345b42]'><FaStoreAltSlash />deactivate</MenuItem> */}
//                 </div>
//             </Menu>

//             {/* <EditrestaurantModal open={openModal} close={handelClose} data={data} img={kfc} /> */}
//         </div>
//     );
// }

const Bills = () => {
    const {t} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)
    const [activeTab, setActiveTab] = useState<number>(0);

    const btns = [
        {label:t('common.all'),param:'all'},
        {label:t('common.active'),param:'active'},
        {label:t('common.cancelled'),param:'cancelled'},
    ]

    const filterClickHandler = (index:number,_:filterItem)=>{
        setActiveTab(index)
        // const dateRange = item?.param
        // dispatch(getRidersStatistics({dateRange}))
    }

    const [month, setmonth] = useState('');

    const handleMonthChange = (event: SelectChangeEvent) => {
        setmonth(event.target.value);
    };

    const [year, setyear] = useState('');

    const handleYearChange = (event: SelectChangeEvent) => {
        setyear(event.target.value);
    };

    
    return ( 
        <article className="text-mainDark rounded-md">
            <section className="bills-title-wrapper mb-5">
                <h1 className="font-semibold text-2xl">{t('nav.bills')}</h1>
            </section>

            <section className="inp-btns-wrapper mb-4 flex items-center justify-between" dir='ltr'>
                <div className={`filter-tabs-section flex items-center gap-x-2 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`px-3 py-[10px] bg-[#fdfeff] rounded-md w-fit flex items-center ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                        {btns?.map((item,index)=>{
                            return(
                                <Button key={index} className={`capitalize text-sm text-[#333] px-4 py-2 lg:px-2 xl:px-4 rounded-sm transition-all duration-300 ${activeTab === index ? 'bg-[#3399ff12] text-mainBlue' : null}`}
                                    onClick={()=>filterClickHandler(index,item)}
                                >
                                    {item.label}
                                </Button>
                            )
                        })}
                    </div>

                    <div className={`filter-btns-section flex items-center gap-x-2 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className="month-select-wrapper [&>div]:bg-[#fdfeff] [&>div]:rounded-md">
                            <FormControl 
                                sx={{ minWidth: 120,'& fieldset':{border:0},'&.MuiSelect-outlined MuiInputBase-input':{padding:'14px'} }}
                            >
                                <InputLabel id="demo-select-small-label">{t('common.months')}</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={month}
                                    label="Months"
                                    onChange={handleMonthChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="year-select-wrapper [&>div]:bg-[#fdfeff] [&>div]:rounded-md">
                            <FormControl 
                                sx={{ minWidth: 120,'& fieldset':{border:0},'&.MuiSelect-outlined MuiInputBase-input':{padding:'14px'} }}
                            >
                                <InputLabel id="year-select-small-label">{t('common.years')}</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={year}
                                    label="Years"
                                    onChange={handleYearChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className="add-search-wrapper">
                    <div className="flex items-center gap-x-2">

                        <div className="search-wrapper">
                            {/* <SearchInput apiFunc={getBills} placeholder={t('bills.search')} /> */}
                        </div>

                        <div>
                            <Link to='addbill'><Button className="capitalize text-white bg-mainBlue py-[9.5px]">{t('bills.add')}</Button></Link>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bills-dtat-table-wrapper shadow-md px-3 py-4 bg-white rounded-md">
                <BillsDatatable t={t} />
            </section>
        </article>
    );
}

export default Bills;