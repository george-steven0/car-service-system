import { Box, Button, IconButton, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaRegTimesCircle } from "react-icons/fa";
import { useAppSelector } from "../../Redux/TsHooks";

type warningModalType<T> = {
    open : boolean,
    close : ()=>void,
    data? : T,
    deleteFunc : ()=>void
}

export const WarningModal = <T,>({open,close,deleteFunc} :warningModalType<T>) => {
    const {t} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)
    return ( 
        <>
            <Modal
                open={open}
                onClose={()=>{
                    close()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    dir={lang === 'en' ? 'ltr' : 'rtl'}
                    className={`min-w-[650px] `}
                    sx={{position:'absolute',top:'11%',left:'50%',transform: 'translate(-50%, -10%)',bgcolor:'background.paper',boxShadow:3,p:4,borderRadius:5,height:'auto'}}>
                    <div className="w-full flex justify-between items-start">
                        <div className="mb-4 text-right ml-auto">
                            <IconButton className="text-red-600 text-xl [&>svg]:ml-auto cursor-pointer" onClick={close}><FaRegTimesCircle /></IconButton>
                        </div>
                    </div>

                    <div>
                        <p className="text-center mb-4 capitalize font-semibold text-red-600">{t('common.delete.item')}</p>
                    </div>
                    <form className="mt-8 w-full h-full" noValidate>
                        <section className="mt-8 text-right">
                            <Button onClick={deleteFunc} className="bg-red-600 text-white font-semibold min-w-[150px] capitalize text-center m-auto">{t('common.delete')}</Button>
                        </section>
                    </form>
                </Box>
            </Modal>
        </>
     );
}
 
WarningModal;