import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReportsDatatable from "./ReportsDatatable/reportDatatable";

type filterItem ={
    label:string,
    param:string
}

const Reports = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const btns = [
        {label:'all',param:'all'},
        {label:'active',param:'active'},
        {label:'cancelled',param:'cancelled'},
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
                <h1 className="font-semibold text-2xl">Reports</h1>
            </section>

            <section className="inp-btns-wrapper mb-4 flex items-center justify-between">
                <div className="filter-tabs-section flex items-center gap-x-2">
                    <div className="px-3 py-[10px] bg-[#fdfeff] rounded-md w-fit">
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

                    <div className="filter-btns-section flex items-center gap-x-2">
                        <div className="month-select-wrapper [&>div]:bg-[#fdfeff] [&>div]:rounded-md">
                            <FormControl 
                                sx={{ minWidth: 120,'& fieldset':{border:0},'&.MuiSelect-outlined MuiInputBase-input':{padding:'14px'} }}
                            >
                                <InputLabel id="demo-select-small-label">Months</InputLabel>
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
                                <InputLabel id="year-select-small-label">Years</InputLabel>
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
                            {/* <SearchInput apiFunc={getBills} placeholder="Search Reports" /> */}
                        </div>

                        <div>
                            <Link to='addreport'><Button className="capitalize text-white bg-mainBlue py-[9.5px]">Add New Report</Button></Link>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bills-dtat-table-wrapper shadow-md px-3 py-4 bg-white rounded-md">
                <ReportsDatatable />
            </section>
        </article>
    );
}

export default Reports;