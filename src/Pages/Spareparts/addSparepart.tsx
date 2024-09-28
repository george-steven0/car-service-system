import { Box, Button, MenuItem, Modal, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { sparepartTableData } from "../../Components/Types/types";
import { FaRegTimesCircle } from "react-icons/fa";
import { useAppDispatch } from "../../Components/Redux/TsHooks";
import { addSparepart, getAllSpareparts } from "../../Components/Redux/Slices/Spareparts/sparePartSlice";
import { resetPage } from "../../Components/Redux/Slices/ResetPagination/resetPagination";
import { TFunction } from "i18next";

export type ModalType = {
    open : boolean,
    close : ()=>void,
    t:TFunction,
    lang?:string | null | undefined
}
const AddSParepart = ({open,close,t,lang}:ModalType) => {
    const dispatch = useAppDispatch()
    const form = useForm()
    const {register,control,handleSubmit,formState} = form
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {errors}:any = formState

    const modalSubmitHandler = async (data:sparepartTableData)=>{
        const page = 1,
            size = 10,
            paginated = 1

        await dispatch(addSparepart(data)).then( (e)=>{
            if(e?.meta?.requestStatus === 'fulfilled'){
                dispatch(getAllSpareparts({page,size,paginated}))
                dispatch(resetPage());
            }
            close()
        } )
    }
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
                        <h2 className="text-xl text-mainBlue capitalize font-semibold">{t('common.add.item')}</h2>

                        <div className="mb-4">
                            <span className="text-red-600 text-xl text-right [&>svg]:ml-auto cursor-pointer" onClick={close}><FaRegTimesCircle /></span>
                        </div>
                    </div>

                    <form className="mt-8 w-full h-full" onSubmit={handleSubmit(modalSubmitHandler)} noValidate>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 [&>div>label]:block [&>div>label]:text-[#333] [&>div>label]:font-semibold [&>div>label]:mb-1 [&>div>input]:w-full [&>div>input]:p-2 [&>div>input]:bg-mainLightBlue [&>div>input]:rounded-md [&>div>input]:outline-none [&>div>input]:shadow-sm">
                            <div>
                                <label>{t('common.name')}:</label>
                                <input type="text" {...register('name',{
                                    required:{
                                        value:true,
                                        message : t('common.required')
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.name?.message}</p>}
                            </div>

                            <div>
                                <label>{t('common.code')}:</label>
                                <input type="text" {...register('code',{
                                    required:{
                                        value:true,
                                        message : t('common.required')
                                    }
                                })} />
                                
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.code?.message}</p>}
                            </div>

                            <div>
                                <label>{t('common.qnt')}:</label>
                                <input type="text" {...register('stock',{
                                    required:{
                                        value:true,
                                        message : t('common.required')
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.stock?.message}</p>}
                            </div>

                            <div>
                                <label>{t('common.type')}:</label>
                                <Controller
                                    name="type"
                                    rules={{required : t('common.required')}}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            onChange={field.onChange}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="w-full bg-mainLightBlue"
                                            sx={{'& .MuiOutlinedInput-input':{padding:'8px 13px'},'& fieldset' : {border:0}}}
                                        >
                                            <MenuItem value={'material'}>{t('spareparts.material')}</MenuItem>
                                            <MenuItem value={'spare_part'}>{t('spareparts.title')}</MenuItem>
                                        </Select>
                                    )}
                                />

                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.type?.message}</p>}
                            </div>

                            <div>
                                <label>{t('common.buy.price')}:</label>
                                <input type="text" {...register('buy_price',{
                                    required:{
                                        value:true,
                                        message : t('common.required')
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.buy_price?.message}</p>}
                            </div>

                            <div>
                                <label>{t('common.sell.price')}:</label>
                                <input type="text" {...register('price',{
                                    required:{
                                        value:true,
                                        message : t('common.required')
                                    }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.price?.message}</p>}
                            </div>


                            <div className="col-span-full">
                                <label>{t('common.notes')}:</label>
                                <textarea className="h-full w-full resize-none bg-mainLightBlue rounded-md outline-none p-3 max-h-[75px]" {...register('notes',{
                                    // required:{
                                    //     value:true,
                                    //     message : t('common.required')
                                    // }
                                })} />
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.notes?.message}</p>}
                            </div>
                        </section>

                        <section className="mt-4 text-center">
                            <Button type="submit" className="bg-mainBlue text-white font-semibold min-w-[150px] capitalize">{t('common.save')}</Button>
                        </section>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default AddSParepart;