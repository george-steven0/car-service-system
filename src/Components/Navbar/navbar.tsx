import { MdSwapHoriz } from "react-icons/md"; 
import { TbLanguage } from "react-icons/tb"; 
import { TbLanguageKatakana } from "react-icons/tb"; 
import { FaLanguage } from "react-icons/fa"; 

import { FaCarSide, FaHome } from "react-icons/fa";
import { navbarLinksType, navbarPropsType } from "../Types/types";
import { TfiSettings } from "react-icons/tfi";
import { TbReportMoney } from "react-icons/tb";
import logo from '../../Assets/imgs/logo.png'
import logoCollpase from '../../Assets/imgs/logoCollpased.png'
import { RiBillLine } from "react-icons/ri";
import { Button, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { MdAccountBalance } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../Redux/TsHooks";


const Navbar = ({collapse}:navbarPropsType) => {
    const [currentLang, setcurrentLang] = useState(localStorage.getItem('lang') === 'en' ? false : true)
    const {t,i18n} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)

    const links:navbarLinksType = [
        {id:1,name:t('nav.home'),nameAr:'الرئيسية',icon:<FaHome />,path:'/dashboard/home'},
        {id:2,name:t('nav.bills'),nameAr:'فواتير',icon:<TbReportMoney />,path:'/dashboard/bills'},
        {id:5,name:t('nav.clients'),nameAr:'العملاء',icon:<PiUsersThree />,path:'/dashboard/clients'},
        {id:4,name:t('nav.spareparts'),nameAr:'قطع الغيار',icon:<TfiSettings />,path:'/dashboard/spareparts'},
        // {id:6,name:'client cars',nameAr:'سيارات العميل',icon:<GrCar />,path:'/dashboard/clientcars'},
        {id:3,name:t('nav.reports'),nameAr:'تقارير',icon:<RiBillLine />,path:'/dashboard/reports'},
        {id:6,name:t('nav.cars'),nameAr:'السيارات',icon:<FaCarSide /> ,path:'/dashboard/cars'},
        {id:7,name:t('nav.accounts'),nameAr:'الحسابات',icon:<MdAccountBalance />,path:'/dashboard/accounts'},
    ]

    const changeLanguage = ()=>{
        const current:string = currentLang ? 'en' : 'ar'
        i18n.changeLanguage(current)
        setcurrentLang(!currentLang)
        // console.log(lang?.target.value);
    }
        
    return ( 
        <article className="navbar-wrapper mt-10 relative">
            <div className="logo-wrapper w-full text-center">
                <img src={collapse ? logoCollpase : logo} className={`${collapse ? 'w-16 rounded-[50%]' : 'w-24'} m-auto`} />
            </div>
            <ul className="mt-7">
                {links?.map( (item)=>(
                    <>
                        <li key={item?.id} className={` capitalize cursor-pointer transition-all duration-300 hover:bg-[#3399FF] mb-4 group`}>
                            <Tooltip
                                placement="top"
                                className="text-lg capitalize"
                                title={item?.nameAr}
                            >
                                <NavLink to={item?.path} className={`px-1 md:px-2 py-[6px] flex items-center ${collapse ? 'justify-center' : 'justify-start'} gap-x-1 md:gap-x-3 w-full h-full text-[#333] group-hover:text-[#fff]`}>
                                    <span className={` text-mainBlue group-hover:text-white ${collapse ? ' md:[&>svg]:w-7 md:[&>svg]:h-7' : 'md:[&>svg]:w-6 md:[&>svg]:h-6 [&>svg]:w-4 [&>svg]:h-4'}`}>{item?.icon}</span>
                                    {collapse ? null : <span className={`text-[11px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[30px] sm:max-w-max block md:text-sm`}>{item?.name}</span> }
                                </NavLink>
                            </Tooltip>
                        </li>
                    </>
                    
                ) )}

                <li className="w-full hover:bg-[#3399FF] group transition-all cursor-pointer" onClick={changeLanguage}>
                    <Tooltip
                        placement="top"
                        title={`Convert to ${lang === 'en' ? 'Arabic' : 'English'}`}
                    >
                        <Button className="flex items-center gap-x-2">
                            <span className="flex items-center gap-x-1">
                                <TbLanguage className={`text-mainBlue group-hover:text-white w-6 h-6`} />
                                {collapse ? null :<MdSwapHoriz className={`text-mainBlue group-hover:text-white w-6 h-6`} />}
                            </span>
                            {collapse ? null : <span className="text-mainBlue group-hover:text-white">{lang === 'ar' ? 'EN' : 'AR'}</span>}
                        </Button>
                    </Tooltip>
                </li>
            </ul>
        </article>
    );
}

export default Navbar;