import { Control,FieldErrors, UseFormReturn} from "react-hook-form";
import { BillFormData, labours } from "../../../../Components/Types/types";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type LaboursFormProps = {
    register : UseFormReturn['register'],
    control: Control<BillFormData>,
    errors : FieldErrors<BillFormData>,
    labours : labours[],
    setValue: UseFormReturn['setValue'],
    // watch:UseFormReturn['watch'],
    add : ()=>void,
    remove : (e:number)=>void,
    isPrint?:boolean
}

const LaboursInfo:React.FC<LaboursFormProps> = ({register,labours,add,remove,isPrint}) => {
    const {t} = useTranslation()
    return ( 
        <article className="bill-labours-wrapper p-2 ronded-sm shadow-md bg-white py-3 rounded-md">
            <section className="flex flex-wrap justify-between items-center gap-x-3 w-full gap-y-3 [&>div]:grow [&>div>input]:p-2 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200 [&>div>label]:font-semibold">
                <div className="add-field-btn-wrapper mb-2">
                    {!isPrint ?<Button className="bg-mainBlue capitalize text-sm text-white" onClick={add}>{t('bill.add.labour')}</Button> : null }
                </div>

                {labours?.length !==0 ?
                    <div className="flex border-b pb-1 w-full items-center justify-between font-bold [&>div]:basis-1/2">
                        <div>
                            <label>{t('common.name')}</label>
                        </div>
                        <div>
                            <label>{t('common.price')}</label>
                        </div>
                    </div>

                    : null
                }

                {labours&&labours?.map( (_,index)=>(

                    <div key={index} className="flex gap-x-3 border-b pb-3 w-full items-center justify-between [&>div>label]:block [&>div>label]:text-lg [&>div>label]:font-semibold [&>div>input]:grow [&>div>input]:p-3 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200" >
                        <div className="w-full">
                            {/* <label>الاسم</label> */}
                            <input type="text"
                                placeholder={t('bill.labour.name')}
                                className="grow w-full"
                                {...register(`labours[${index}].name`,{
                                    required:{
                                        value : true,
                                        message : t('common.required')
                                    }
                                })}
                            />
                        </div>

                        <div className="w-full">
                            {/* <label>التكلفه</label> */}
                            <input type="number"
                                placeholder={t('bill.labour.price')}
                                className="grow w-full"
                                {...register(`labours[${index}].price`,{
                                    required:{
                                        value : true,
                                        message : t('common.required')
                                    }
                                })}
                            />
                        </div>
                        <div className="w-fit self-end mb-2">
                            <Button className="text-white text-sm bg-red-700" onClick={()=>remove(index)}>-</Button>
                        </div>
                    </div>
                ) )}
            </section>
        </article>
    );
}

export default LaboursInfo;