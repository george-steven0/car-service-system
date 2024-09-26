import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../../Pages/Dashboard/home";
import { useEffect, useState } from "react";
import Navbar from "../../Navbar/navbar";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Button, IconButton } from "@mui/material";
import { IoMdLogOut } from "react-icons/io";
import Bills from "../../../Pages/Bills/bills";
import AddNewBill from "../../../Pages/Bills/NewBill/addBill";
import Reports from "../../../Pages/Reports/reports";
import AddReport from "../../../Pages/Reports/NewReport/addReport";
import Spareparts from "../../../Pages/Spareparts/spareparts";
import Clients from "../../../Pages/Clients/clients";
import Cars from "../../../Pages/Cars/cars";
import EditBill from "../../../Pages/Bills/EditBill/editBill";
import EditReport from "../../../Pages/Reports/EditReport/editReport";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../Redux/TsHooks";
import { changeLang } from "../../Redux/Slices/Language/languageSlice";
// import ClientCars from "../../../Pages/ClientCars/clientCars";

const AppRoutes = () => {
    const {t} = useTranslation()
    const [collapse, setcollapse] = useState<boolean>(false)
    const [close, setclose] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const {lang} = useAppSelector(state=>state?.lang)

    const handleCloseNavbar = ()=>{
        setclose(!close)
    }

    useEffect(() => {
        if(window?.innerWidth >760){
            setclose(true)
        }
    }, [])

    const currentLang = localStorage.getItem('lang')
    
    useEffect(() => {
        dispatch(changeLang(currentLang))
    }, [dispatch,currentLang])
        

    const toggleCollapsedNav = ()=>{
        setcollapse(!collapse)
    }
    return (
        <article className="app-routes-wrapper w-full h-full bg-[#f1f1f1]" dir={lang === 'en' ? 'ltr' : 'rtl'}>
            <div className="flex justify-between items-start w-full h-full relative">
                <section className={`navbar-wrapper h-full transition-all duration-300 ${close ? 'block' : 'hidden'} ${collapse ? 'basis-[5%]' : 'basis-[12%]'}`}>

                    <div className={`h-full bg-[#fff] absolute z-20 md:relative shadow-lg overflow-hidden overflow-y-auto py-2 w-full`}>
                        <div className={`absolute top-3 right-2 [&>svg]:w-7 [&>svg]:h-7 cursor-pointer hidden md:block`} onClick={toggleCollapsedNav}>
                            {collapse ? <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />}
                        </div>
                        
                        <div className="transition-all duration-300 min-h-[86vh]">
                            <Navbar collapse={collapse}/>
                        </div>

                        <div className="">
                            <Button className={`capitalize flex gap-x-2 text-red-500 font-semibold ${collapse ? ' md:[&>svg]:w-7 md:[&>svg]:h-7' : 'md:[&>svg]:w-6 md:[&>svg]:h-6 [&>svg]:w-4 [&>svg]:h-4'}`}>
                                <IoMdLogOut />
                                {collapse ? null : <span className="text-base">{t('nav.logout')}</span>}
                            </Button>
                        </div>
                    </div>
                </section>
                <section className={`pages-wrapper  text-white overflow-hidden overflow-y-auto p-2 w-full h-full max-h-full transition-all duration-300 basis-full ${collapse ? 'md:basis-[95%]' : 'md:basis-[88%]'} `}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
                        <Route path="/dashboard/home" element={<Home />} />
                        <Route path="/dashboard/bills" element={<Bills />} />
                        <Route path="/dashboard/bills/addbill" element={<AddNewBill />} />
                        <Route path="/dashboard/bills/editbill" element={<EditBill />} />
                        <Route path="/dashboard/reports" element={<Reports />} />
                        <Route path="/dashboard/reports/addreport" element={<AddReport />} />
                        <Route path="/dashboard/reports/editreport" element={<EditReport />} />
                        <Route path="/dashboard/spareparts" element={<Spareparts />} />
                        <Route path="/dashboard/clients" element={<Clients />} />
                        {/* <Route path="/dashboard/clientcars" element={<ClientCars />} /> */}
                        <Route path="/dashboard/cars" element={<Cars />} />
                    </Routes>
                </section>
            </div>
            <IconButton className="block absolute md:hidden top-0 left-1 z-40" onClick={handleCloseNavbar}><IoMenu /></IconButton>
        </article>
    );
}

export default AppRoutes;