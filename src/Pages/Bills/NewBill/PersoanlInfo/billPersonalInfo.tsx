import { Control, Controller, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { BillFormData, carProp, personalInfo } from "../../../../Components/Types/types";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../Components/Redux/TsHooks";

type PerosnalInfoPropsType = {
    register : UseFormRegister<BillFormData>,
    control?: Control<FieldValues>;
    errors? : FieldErrors<BillFormData>,
    getValues?:UseFormGetValues<BillFormData> | undefined,
    setValue?: UseFormSetValue<BillFormData> | undefined,
    trigger?: UseFormTrigger<BillFormData> | undefined
}
const PersonalInfo:React.FC<PerosnalInfoPropsType> = ({register,errors,control,getValues,setValue,trigger}) => {
    const {t} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)

    const [selectedOption, setSelectedOption] = useState<personalInfo | null>(null);
    const [selectCar, setselectCar] = useState<carProp | null >(null);

    const clientData = [
        {id:1,name:'george steven',phoneNumber:'01285325645',cars : [
            {id:1,color:'red',brand:'bmw',model:'2024',paletNumber:'ع ج ا 7552', chassis:'25568564565',motor:'4545487' }
        ] }
    ]

    useEffect(() => {
        if (setValue && selectedOption) {
            setValue('name',selectedOption?.name)
            setValue('phoneNumber',selectedOption?.phoneNumber)
            setValue('cars',selectedOption?.cars)
            // setValue('brand', selectCar?.brand)
            setValue('model',selectCar?.model)
            setValue('paletNumber',selectCar?.paletNumber)
            setValue('chassis',selectCar?.chassis)
            setValue('motor',selectCar?.motor)
            setValue('color',selectCar?.color)
            trigger && trigger();
        }
    }, [selectedOption,setValue,getValues])
    
// console.log(errors);
// console.log(getValues());

    const date = new Date()
    const defaultDate = date?.toISOString().slice(0, 10) 
    
    // console.log(clientData);
    
    return ( 
        <div className="personal-details p-2 ronded-sm shadow-md bg-white py-6 px-5 rounded-md" dir={lang === 'en' ? 'ltr' : 'rtl'}>
            <section className="flex flex-wrap justify-between items-center gap-x-3 w-full gap-y-3 [&>div]:grow  [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">
                
                <div className="flex flex-wrap items-center gap-x-2 grow  [&>div]:grow w-full [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:border [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0  [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold [&>div>input]:text-[#333333] [&>input]:border [&>input]:focus-within:border-mainBlue">
                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block ">
                        <label> {t('common.name')}: </label>
                        
                        <Controller
                            name="client"
                            control={control}
                            defaultValue=""
                            rules={{required:t('common.required')}}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    dir={lang === 'en' ? 'ltr' : 'rtl'}
                                    options={clientData}
                                    getOptionLabel={(option) => option.name || ''}
                                    isOptionEqualToValue={(option: personalInfo, value: personalInfo) => option.id === value.id}
                                    className="grow bg-mainLightBlue"
                                    disablePortal
                                    id="client-select"
                                    sx={{ width: 'auto','& .MuiInputBase-colorPrimary' : {color:'#333333'},'& .MuiAutocomplete-inputRoot' : {py:'0px'}, '& .MuiOutlinedInput-root':{p:'.1rem'},'& .MuiOutlinedInput-notchedOutline' : {border:'1px solid #e5e7eb'} }}
                                    renderInput={(params) => <TextField {...params} label={t('bill.client.name')} />}
                                    onChange={(_, data) => {
                                        field.onChange(data)
                                        setSelectedOption(data);
                                        if(data !== null && setValue){
                                            setValue('name',data?.name)
                                        }
                                    }}
                                    // onClear={()=>setSelectedOption({})}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.client?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block">
                        <label> {t('common.phone')}: </label>
                        <input type="text" 
                            className="grow"
                            placeholder={t('common.phone')}
                            {...register('phoneNumber',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                            value={selectedOption?.phoneNumber}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.phoneNumber?.message}</p>}
                    </div>
                </div>

                <div className="pt-3 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-4 gap-x-3 [&>div]:w-full [&>div>input]:grow [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.brand')} : </label>

                        <Controller
                            name="brand"
                            control={control}
                            defaultValue=""
                            rules={{required:t('common.required')}}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    placeholder={t('common.brand')}
                                    options={selectedOption?.cars ?? []}
                                    getOptionLabel={(option) => option?.brand || ''}
                                    isOptionEqualToValue={(option: personalInfo, value: personalInfo) => option.id === value.id}
                                    className="grow bg-mainLightBlue"
                                    disablePortal
                                    id="client-select"
                                    sx={{ width: 'auto','& .MuiInputBase-colorPrimary' : {color:'#333333'},'& .MuiAutocomplete-inputRoot' : {py:'0px'}, '& .MuiOutlinedInput-root':{p:'.1rem'},'& .MuiOutlinedInput-notchedOutline' : {border:'1px solid #e5e7eb'} }}
                                    renderInput={(params) => <TextField dir="rtl" {...params} label={t('brand')} />}
                                    onChange={(_, data) => {
                                        field.onChange(data)
                                        if(data !== null){
                                            setselectCar(data);                                        
                                        }
                                        if(data !== null && setValue){
                                            setValue('brand', data?.brand)
                                        }
                                    }}
                                    // onClear={()=>setSelectedOption({})}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />

                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.brand?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.model')} : </label>
                        <input type="text" 
                            className=""
                            placeholder={t('common.model')}
                            {...register('model',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                            value={selectCar?.model}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.model?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.plateNumber')} : </label>
                        <input type="text" 
                            className=""
                            placeholder={t('common.plateNumber')}
                            {...register('paletNumber',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                            value={selectCar?.paletNumber}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.paletNumber?.message}</p>}
                    </div>

                    <hr className="col-span-3" />

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.chassie')} : </label>
                        <input type="text" 
                            className=""
                            placeholder={t('common.chassie')}
                            {...register('chassis',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                            value={selectCar?.chassis}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.chassis?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.motor')} : </label>
                        <input type="text" 
                            className=""
                            placeholder={t('common.motor')}
                            {...register('motor',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                            value={selectCar?.motor}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.motor?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.odometer')} : </label>
                        <input type="text" 
                            className=""
                            placeholder={t('common.odometer')}
                            {...register('odometer',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.odometer?.message}</p>}
                    </div>

                    <hr className="col-span-3" />

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('common.color')} : </label>
                        <input type="text" 
                            className=""
                            placeholder={t('common.color')}
                            {...register('color',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                            value={selectCar?.color}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.color?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('bill.client.inDate')} : </label>
                        <input type="date" 
                            className=""
                            defaultValue={defaultDate}
                            placeholder={t('bill.client.inDate')}
                            {...register('inDate',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.inDate?.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 [&>*]:block [&>input]:border [&>input]:focus-within:border-mainBlue">
                        <label> {t('bill.client.outDate')} : </label>
                        <input type="date" 
                            className=""
                            defaultValue={defaultDate}
                            placeholder={t('bill.client.outDate')}
                            {...register('outDate',{
                                required:{
                                    value:true,
                                    message:t('common.required')
                                }
                            })}
                        />
                        {errors && <p className="text-red-500 text-xs w-full text-left mt-1">{errors?.outDate?.message}</p>}
                    </div>

                </div>

                
            </section>
        </div>
    );
}

export default PersonalInfo;