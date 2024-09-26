import { Link } from "react-router-dom";
import LatestBillItem from "./LatestBillsItem/latestBillsItem";
import Button from '@mui/material/Button';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { latestBillItemType, translationType } from "../../../Components/Types/types";
import { useAppSelector } from "../../../Components/Redux/TsHooks";


const LatestBills: React.FC<translationType>= ({t}) => {
    const {lang} = useAppSelector(state=>state?.lang)

    const latestBillData:latestBillItemType = [
        {id:1,name:'george steven abd el masseh',date:'20-10-2002',type:'bill',car:'cheveorlet'},
        {id:2,name:'ali ahmed el sayed',date:'15-05-2022',type:'bill',car:'bmw'},
        {id:3,name:'mohamed nomaan gomaa',date:'20-01-2012',type:'report',car:'toyota'},
        {id:4,name:'مني علي علي محمد',date:'20-11-2042',type:'bill',car:'lexus'},
        {id:5,name:'مايكل مرقص ناشد',date:'20-08-2102',type:'bill',car:'massarati'},
        {id:6,name:'مينا مجدي اسكندر',date:'17-10-2002',type:'report',car:'daewoo'},
    ]
    return ( 
        <article className="latest-bill-items-wrapper  text-mainDark h-full">

            <section className="bills-counter-wrapper mb-4 w-full bg-[#eaeff5] px-2 py-3 rounded-md mt-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="block p-2 rounded-md bg-mainBlue text-white font-semibold">20</span>
                    <span className="font-semibold">{t('home.latestBills')}</span>
                </div>

                <div>
                    <Button className="capitalize text-mainBlue"><Link to='/dashboard/bills' className="flex items-center gap-x-1 font-semibold">{t('home.manageBills')} <span>{lang === 'en' ? <FaAnglesRight /> : <FaAnglesLeft />}</span></Link></Button>
                </div>

            </section>

            <section className="bill-item-container overflow-hidden overflow-y-auto h-auto max-h-[650px] md:max-h-[450px] lg:max-h-[530px]">
                {latestBillData ?.map( (data)=><LatestBillItem key={data?.id} data={data} /> )}
            </section>
        </article>
    );
}

export default LatestBills;