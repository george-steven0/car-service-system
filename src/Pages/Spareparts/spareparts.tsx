import { Button } from "@mui/material";
import { useState } from "react";
import SearchInput from "../../Components/Common/SearchInput/searchInput";
import SparepartsDatatable from "./sparepartsDatatable";
import { useAppSelector } from "../../Components/Redux/TsHooks";
import Overlay from "../../Components/Common/Overlay/overlay";
import { getAllSpareparts } from "../../Components/Redux/Slices/Spareparts/sparePartSlice";
import AddSParepart from "./addSparepart";
import { useTranslation } from "react-i18next";
import Title from "../../Components/Common/Title/title";

type filterItem ={
    label:string,
    param:string
}

const Spareparts = () => {
    const {t} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)

    const [activeTab, setActiveTab] = useState<number>(0);
    const [filterType, setfilterType] = useState<string>('');
    const [searchValue,setsearchValue] = useState<string>('')

    const sparepart = useAppSelector(state => state?.sparepart)

    const btns = [
        {label:t('common.all'),param:''},
        {label:t('spareparts.title'),param:'spare_part'},
        {label:t('spareparts.material'),param:'material'},
    ]

    const filterClickHandler = (index:number,item:filterItem)=>{
        setActiveTab(index)
        setfilterType(item?.param)
        // const dateRange = item?.param
        // dispatch(getRidersStatistics({dateRange}))
    }

    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)
    
    const getSearchValue = (searchValue:string) =>{
        setsearchValue(searchValue)
    }
    
    return ( 
        <article className="spareparts-wrapper text-mainDark">
            <section className="bills-title-wrapper mb-5">
                <Title title={t('spareparts.title')} />
            </section>

            <section className={`inp-btns-wrapper mb-4 flex items-center justify-between ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
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
                </div>

                <div className="add-search-wrapper">
                    <div className={`${lang === 'en' ? 'flex-row' : 'flex-row-reverse'} flex items-center gap-x-2`}>

                        <div className="search-wrapper">
                            <SearchInput apiFunc={getAllSpareparts} placeholder={t('common.search.item')} getsearchValue={getSearchValue} />
                        </div>

                        <div>
                            <Button className="capitalize text-white bg-mainBlue py-[9.5px]" onClick={handelModalOpen}>{t('common.add.item')}</Button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bills-dtat-table-wrapper shadow-md px-3 py-4 bg-white rounded-md">
                <SparepartsDatatable type={filterType} data={sparepart} searchValue={searchValue} t={t} lang={lang} />
            </section>

            <section>
                <AddSParepart open={openModal} close={handelModalClose} t={t} lang={lang} />
            </section>

            {sparepart?.loading ? <Overlay /> : null}
        </article>
    );
}

export default Spareparts;