import { Box, Button, Modal } from "@mui/material";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { FaRegTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useAppDispatch } from "../../../Components/Redux/TsHooks";
import { editCar, getAllCars } from "../../../Components/Redux/Slices/Cars/carSlice";
import { resetPage } from "../../../Components/Redux/Slices/ResetPagination/resetPagination";
import { BiCommentAdd } from "react-icons/bi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TFunction } from "i18next";

export type ModalType = {
    open : boolean,
    close : ()=>void,
    data : {
        id : number,
        name: string,
        types : {
            carType : string
        }[]
    },
    t:TFunction,
    lang?:string
}

type FormData = {
    name: string,
    types : {
        carType : string
    }[]
}

const EditCarModal = ({open,close,data,t,lang}:ModalType) => {
    const dispatch = useAppDispatch()
    const form = useForm<FormData>({
        defaultValues : {
            name : data?.name,
            types : data?.types
        }
    })
    const {register,handleSubmit,formState,setValue,control} = form
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {errors}:any = formState

    const {fields,append,remove} = useFieldArray({
        control,
        name : "types" // this name must be same as the one in the FormData Type carType
    })

    const addCarType = ()=>{
        append([{
            carType : ''
        }])
    }

    const removeCarType = (index:number)=>{
        remove(index)
    }

    const id = data?.id

    useEffect( ()=>{
        if(data){
            setValue('name',data?.name || '')
            setValue('types',data?.types || [])
        }
    }, [data, setValue] )

    const modalSubmitHandler: SubmitHandler<FormData> = (data:{name:string})=>{
        if(id){
            dispatch(editCar({data,id})).then( (e)=>{
                const page = 1,
                size = 10,
                paginated = 1
                if(e?.meta?.requestStatus === 'fulfilled'){
                    dispatch(getAllCars({page,size,paginated}))
                    dispatch(resetPage())
                }
                close()
            } )
        }
    }
    
    // console.log(data);
    
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
                        <h2 className="text-xl text-mainBlue capitalize font-semibold">{t('cars.edit')}</h2>

                        <div className="mb-4">
                            <span className="text-red-600 text-xl text-right [&>svg]:ml-auto cursor-pointer" onClick={close}><FaRegTimesCircle /></span>
                        </div>
                    </div>

                    <form className="mt-8 w-full h-full" onSubmit={handleSubmit(modalSubmitHandler)} noValidate>
                        <section className="grid grid-cols-1 gap-5 [&>div>label]:block [&>div>label]:text-[#333] [&>div>label]:font-semibold [&>div>label]:mb-1 [&>div>input]:w-full [&>div>input]:p-2 [&>div>input]:bg-mainLightBlue [&>div>input]:rounded-md [&>div>input]:outline-none [&>div>input]:shadow-sm">
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

                        </section>

                        <hr className="my-2"/>
                        <section className="text-center">
                            <Button onClick={addCarType} className="text-green-600 bg-green-500 mb-3 bg-opacity-25 font-bold flex items-center gap-x-1 mr-auto capitalize">
                                <BiCommentAdd />
                                {t('common.add.type')}
                            </Button>
                        </section>

                        <section className="addCarTypesCont px-2 items-center justify-center grid grid-cols-2 gap-5 max-h-[300px] overflow-hidden overflow-y-auto">
                            {fields?.map( (_,index)=>(
                                <div className="[&>div>label]:block [&>div>label]:text-[#333] [&>div>label]:font-semibold [&>div>label]:mb-1 [&>div>input]:w-full [&>div>input]:p-2 [&>input]:bg-mainLightBlue [&>input]:w-full [&>input]:rounded-md [&>input]:outline-none [&>input]:shadow-sm [&>input]:p-2">
                                    <div className="text-left flex justify-between items-center">
                                        <label>{t('common.brand')}:</label>
                                        {index === 0 ? null : <Button onClick={()=>removeCarType(index)} className="text-danger bg-danger bg-opacity-25 flex justify-between items-center gap-x-1 p-1 mb-2 capitalize"><RiDeleteBack2Line /> {t('common.delete')}</Button>}
                                    </div>
                                    <input type="text" {...register(`types.${index}.carType`,{
                                        required:{
                                            value:true,
                                            message : t('common.required')
                                        }
                                    })} />
                                    {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.types?.[index]?.carType?.message}</p>}     
                                </div>
                            ) )}
                        </section>

                        <section className="mt-8 text-center">
                            <Button type="submit" className="bg-mainBlue text-white font-semibold min-w-[150px]">{t('common.edit')}</Button>
                        </section>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default EditCarModal;