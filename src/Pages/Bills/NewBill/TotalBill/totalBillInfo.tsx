import { Control, FieldErrors, UseFormReturn, UseFormSetValue } from "react-hook-form";
import { BillFormData } from "../../../../Components/Types/types";
import { useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type TotalFormProps = {
    register : UseFormReturn['register'],
    unregister: UseFormReturn['unregister'],
    control?: Control<BillFormData>,
    errors? : FieldErrors<BillFormData>,
    setValue?: UseFormSetValue<BillFormData> | undefined,
    calc : ()=>number
    watch:UseFormReturn['watch'],
    isPrint? : boolean
}

const TotalInfo:React.FC<TotalFormProps> = ({register,setValue,watch,calc,unregister,isPrint}) => {
    const {t} = useTranslation()
    const [tax, settax] = useState<boolean>(false)
    const toggleTaxInput = ()=>{
        settax(!tax)
        if(setValue){
            if (!tax) {
                unregister('totaltaxbill');
            } else {
                register('totaltaxbill');
            }
        }
    }

    return ( 
        <article className="total-info-wrapper p-2 ronded-sm shadow-md bg-white py-3 rounded-md">
            {!isPrint ? 
                <div className="mb-3 flex items-center gap-x-3">
                    <Button className="text-sm capitalize bg-green-500 text-white font-bold" onClick={calc}>{t('bill.calc')}</Button>
                    <Button className="text-sm capitalize bg-gray-600 text-white font-bold" onClick={toggleTaxInput}>
                        {!tax ? t('bill.taxes') : t('bill.noTaxes')}
                    </Button>
                </div> 
                : null
            }
            <div className="flex flex-wrap gap-x-3 border-b pb-3 w-full items-center justify-between [&>div>label]:block [&>div>label]:bg-[#444] [&>div>label]:text-white [&>div>label]:p-2 [&>div>label]:rounded-md [&>div>label]:text-base [&>div>label]:font-semibold [&>div>input]:grow [&>div>input]:p-3 [&>div>input]:rounded-md [&>div>input]:bg-mainLightBlue [&>div>input]:focus-within:outline-0 [&>div>input]:transition-all [&>div>input]:duration-200" >
                <div className="w-full flex items-center gap-x-3 basis-full">
                    <label>{t('common.total')}</label>
                    <input type="text"
                        placeholder={t('common.total')}
                        className="grow w-full"
                        {...register(`totalValue`)}
                        readOnly
                    />
                </div>

                {
                    tax ? 
                        <>
                            <div className="my-1 w-full flex items-center gap-x-3 basis-full">
                                <label>{t('bill.taxes')} 14%</label>
                                <input type="number" readOnly value={((watch(`totalValue`) * 14) / 100)} />
                            </div>

                            <div className="w-full flex items-center gap-x-3 basis-full">
                                <label>{t('bill.netTotal')}</label>
                                <input type="number"
                                    className="grow"
                                    {...register(`totaltaxbill`)}
                                    value={((watch(`totalValue`) * 1.14).toFixed(2))}
                                    readOnly
                                />
                            </div>
                        </>
                    : null
                }
            </div>
        </article>
    );
}

export default TotalInfo;