import { Button } from "@mui/material";
import { useState } from "react";
import SearchInput from "../../Components/Common/SearchInput/searchInput";
import ClientsTable from "./clientsTable";
import AddClientModal from "./addClient";
import { getAllClients } from "../../Components/Redux/Slices/Clients/clients";
import { useAppSelector } from "../../Components/Redux/TsHooks";
import Overlay from "../../Components/Common/Overlay/overlay";
import { useTranslation } from "react-i18next";
import Title from "../../Components/Common/Title/title";


const Clients = () => {
    const [searchValue,setsearchValue] = useState<string>('')
    const [openModal, setopenModal] = useState(false)
    const handelModalOpen = ()=>setopenModal(true)
    const handelModalClose = ()=>setopenModal(false)

    const {t} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)

    const clients = useAppSelector( (state)=>state?.clients )
    
    const getSearchValue = (searchValue:string) =>{
        setsearchValue(searchValue)
    }
    
    return ( 
        <article className="spareparts-wrapper text-mainDark">
            <section className="bills-title-wrapper mb-5">
                <Title title={t('client.title')} />
            </section>

            <section className={`inp-btns-wrapper mb-4 flex items-center ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className="add-search-wrapper">
                    <div className={`flex items-center gap-x-2 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>

                        <div className="search-wrapper">
                            <SearchInput apiFunc={getAllClients} placeholder={t('client.search')} getsearchValue={getSearchValue} />
                        </div>

                        <div>
                            <Button className="capitalize text-white bg-mainBlue py-[9.5px]" onClick={handelModalOpen}>{t('client.add')}</Button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bills-dtat-table-wrapper shadow-md px-3 py-4 bg-white rounded-md">
                <ClientsTable data={clients} searchValue={searchValue} t={t} lang={lang} />
            </section>

            <section>
                <AddClientModal open={openModal} close={handelModalClose} t={t} lang={lang} />
            </section>

            {clients?.loading ? <Overlay /> : null}
        </article>
    );
}

export default Clients;