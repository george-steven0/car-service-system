import { FiDelete } from "react-icons/fi"; 
import { BiAddToQueue } from "react-icons/bi"; 
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FormValues} from "../../Components/Types/types";
import { FaRegTimesCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../Components/Redux/TsHooks";
import { useEffect } from "react";
import { getAllCars, getCarBrand } from "../../Components/Redux/Slices/Cars/carSlice";
import { addClient, getAllClients } from "../../Components/Redux/Slices/Clients/clients";
import { resetPage } from "../../Components/Redux/Slices/ResetPagination/resetPagination";
import { TFunction } from "i18next";

export type ModalType = {
    open : boolean,
    close : ()=>void,
    t:TFunction,
    lang? : string | null
}

const AddClientModal = ({open,close,t,lang}:ModalType) => {
    const dispatch = useAppDispatch()
    const {cars} = useAppSelector(state =>state?.cars)
    const {brands} = useAppSelector(state =>state?.cars)

    const paginated = 0

    useEffect(() => {
        dispatch(getAllCars({paginated}))
    }, [dispatch])
        
    const form = useForm<FormValues>({
        defaultValues: {
            name: '',
            phone: '',
            cars: [{ 
                model : "",
                car_type_id : "",
                brand_id : "",
                plate_number : "",
                chase_number : "",
                color : "",
                motor_number : ""
            }],
        },
    })
    const {register,control,handleSubmit,formState,setValue,reset} = form

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'cars',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {errors}:any = formState

    const handleAddClientCar = ()=>{
        append({
            model: "",
            car_type_id : "",
            plate_number: "",
            chase_number: "",
            motor_number: "",
            color:"",
            brand : {
                id: null,
                name : ""
            },
            brand_id : ""
        })
    }

    const handleRemoveClientCar = (index: number)=>{
        remove(index)
    }

    // const style = {
    //     position: 'absolute',
    //     top: '37%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     bgcolor: 'background.paper',
    //     // border: '2px solid #000',
    //     boxShadow: 3,
    //     p: 4,
    //     borderRadius : 5,
    // };

    const modalSubmitHandler = (data:FormValues)=>{
        // console.log(data);
        const page = 1,
            size = 10,
            paginated = 1
        dispatch(addClient(data)).then( (e)=>{
            if(e?.meta?.requestStatus === 'fulfilled'){
                dispatch(getAllClients({page,size,paginated}))
                dispatch(resetPage())
            }
            handleClose()
        } )
    }


    const handleClose = ()=>{
        close()
        reset()
    }

    // console.log(brands);
    
    return ( 
        <>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    dir={lang === 'en' ? 'ltr' : 'rtl'}
                    className={`min-w-[650px] `}
                    sx={{position:'absolute',top:'11%',left:'50%',transform: 'translate(-50%, -10%)',bgcolor:'background.paper',boxShadow:3,p:2,borderRadius:5,height:'auto'}}>
                    <div className="w-full flex justify-between items-start">
                        <h2 className="text-2xl text-mainBlue capitalize font-semibold">{t('client.add')}</h2>

                        <div className="mb-4">
                            <span className="text-red-600 text-xl text-right [&>svg]:ml-auto cursor-pointer" onClick={handleClose}><FaRegTimesCircle /></span>
                        </div>
                    </div>

                    <form className="mt-85 w-full h-full" onSubmit={handleSubmit(modalSubmitHandler)} noValidate>
                        <div className="mt-2 font-bold text-lg text-gray-800 border-b pb-2">
                            {t('bills.client.title')}
                        </div>
                        <section className="px-3 grid grid-cols-1 md:grid-cols-2 gap-5 [&>div>label]:block [&>div>label]:text-[#333] [&>div>label]:font-semibold [&>div>label]:mb-1 [&>div>input]:w-full [&>div>input]:p-3 [&>div>input]:bg-mainLightBlue [&>div>input]:rounded-md [&>div>input]:outline-none [&>div>input]:shadow-sm">
                            
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
                                <label>{t('common.phone')}:</label>
                                <input type="text" {...register('phone',{
                                    required:{
                                        value:true,
                                        message : t('common.required')
                                    },
                                    valueAsNumber : true
                                })} />
                                
                                {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.phone?.message}</p>}
                            </div>

                            <div className="col-span-2 font-bold text-lg text-gray-800 border-b pb-2 flex items-center justify-between">
                                <span>{t('client.car.title')}</span>
                                <Button onClick={handleAddClientCar} className={`flex items-center gap-x-2 text-lg text-green-600 capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}><BiAddToQueue />{t('client.car.add')}</Button>
                            </div>

                            <section className="addClientCarForm  px-3 max-h-[350px] overflow-hidden overflow-y-auto col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5 [&>div>label]:block [&>div>label]:text-[#333] [&>div>label]:font-semibold [&>div>label]:mb-1 [&>div>input]:w-full [&>div>input]:p-3 [&>div>input]:bg-mainLightBlue [&>div>input]:rounded-md [&>div>input]:outline-none [&>div>input]:shadow-sm">
                                {fields?.map( (_,index)=>(
                                    <>
                                        <div className="text-blue-500 col-span-3 m-0 flex items-center justify-between">
                                            <span>{t('common.car')} #  {index+1}</span>
                                            {
                                                index !== 0 ?
                                                <Button onClick={()=>handleRemoveClientCar(index)} className={`flex items-center gap-x-2 text-lg text-danger capitalize ${lang === 'en' ? 'flex-row-reverse' : 'flex-row'}`}><FiDelete /> {t('common.delete')}</Button>
                                                :
                                                <span></span>
                                            }
                                        </div>
                                        <div>
                                            <label>{t('common.carType')}:</label>
                                            <Controller
                                                control={control}
                                                name={`cars.${index}.makeobject`}
                                                rules={{ required: t('common.required') }}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        sx={{'&.MuiAutocomplete-root .MuiOutlinedInput-root' : {p:'5px'}, 'fieldset' : {border:0,outline:0,borderRadius:'6px'}, '&.MuiAutocomplete-root' : {backgroundColor : "#f3f6f9",borderRadius:'6px'}}}
                                                        options={cars?.data || []}
                                                        getOptionLabel={(option) => option?.name || ''}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                // label="Car Model"
                                                                // error={!!errors.cars?.[index]?.make}
                                                                // helperText={errors.cars?.[index]?.make?.message}
                                                            />
                                                        )}
                                                        {...field}
                                                        onChange={(_, data) => {
                                                            if(data){
                                                                field.onChange(data)
                                                                setValue(`cars.${index}.car_type_id`,data?.id || '')
                                                                // setValue(`cars.${index}.make`,data?.name || '')
                                                                dispatch(getCarBrand(data?.id))
                                                            }
                                                            // console.log(event);
                                                            // console.log(data);
                                                            
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.makeobject?.message}</p>}
                                        </div>

                                        <div>
                                            <label>{t('common.brand')}:</label>
                                            <Controller
                                                control={control}
                                                name={`cars.${index}.brand`}
                                                rules={{ required: t('common.required') }}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        sx={{'&.MuiAutocomplete-root .MuiOutlinedInput-root' : {p:'5px'}, 'fieldset' : {border:0,outline:0,borderRadius:'6px'}, '&.MuiAutocomplete-root' : {backgroundColor : "#f3f6f9",borderRadius:'6px'}}}
                                                        options={brands || []}
                                                        getOptionLabel={(option) => option?.name || ''}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                // label="Car Model"
                                                            />
                                                        )}
                                                        {...field}
                                                        onChange={(_, data) => {
                                                            field.onChange(data)
                                                            if(data){
                                                                setValue(`cars.${index}.brand_id`,data?.id || '')
                                                            }
                                                            // console.log(event);
                                                            // console.log(data);
                                                            
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.brand?.message}</p>}
                                        </div>

                                        <div>
                                            <label>{t('common.model')}:</label>
                                            <input type="text" {...register(`cars.${index}.model`,{
                                                required:{
                                                    value:true,
                                                    message : t('common.required')
                                                }
                                            })} />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.model?.message}</p>}
                                        </div>

                                        <div>
                                            <label>{t('common.chassie')}:</label>
                                            <input type="text" {...register(`cars.${index}.chase_number`,{
                                                required:{
                                                    value:true,
                                                    message : t('common.required')
                                                }
                                            })} />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.chase_number?.message}</p>}
                                        </div>

                                        <div>
                                            <label>{t('common.motor')}:</label>
                                            <input type="text" {...register(`cars.${index}.motor_number`,{
                                                required:{
                                                    value:true,
                                                    message : t('common.required')
                                                }
                                            })} />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.motor_number?.message}</p>}
                                        </div>

                                        <div>
                                            <label>{t('common.color')}:</label>
                                            <input type="text" {...register(`cars.${index}.color`,{
                                                required:{
                                                    value:true,
                                                    message : t('common.required')
                                                }
                                            })} />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.color?.message}</p>}
                                        </div>

                                        <div className="col-span-2">
                                            <label>{t('common.plateNumber')}:</label>
                                            <input type="text" {...register(`cars.${index}.plate_number`,{
                                                required:{
                                                    value:true,
                                                    message : t('common.required')
                                                }
                                            })} />
                                            {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.cars?.[index]?.plate_number?.message}</p>}
                                        </div>
                                    </>
                                ) )}
                            </section>

                            
                        </section>

                        <section className="mt-8 text-center">
                            <Button type="submit" className="bg-mainBlue text-white font-semibold min-w-[150px] capitalize">{t('common.save')}</Button>
                        </section>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default AddClientModal;