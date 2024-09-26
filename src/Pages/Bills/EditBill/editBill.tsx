import { Button } from "@mui/material";
import PersonalInfo from "../NewBill/PersoanlInfo/billPersonalInfo";
import { useFieldArray, useForm } from "react-hook-form";
import { BillFormData } from "../../../Components/Types/types";
import PartsInfo from "../NewBill/PartsInfo/partsInfo";
import LaboursInfo from "../NewBill/LabooursInfo/laboursInfo";
import NotesInfo from "../NewBill/NotesInfo/notes";
import TotalInfo from "../NewBill/TotalBill/totalBillInfo";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../Components/Redux/TsHooks";
import Title from "../../../Components/Common/Title/title";

const EditBill = () => {
    const {t} = useTranslation()
    const {lang} = useAppSelector(state=>state?.lang)

    const {register,control,handleSubmit,formState,setValue,watch,getValues,unregister,trigger} = useForm<BillFormData>({
        // defaultValues: {
        //     parts: [
        //         { name: "part name", code: "code",price:20 },
        //         // { name: "part2", code: "value2" }
        //     ]
        // }
    })
    const {errors} = formState
    
    const { fields: parts, append : appenedParts, remove: removeParts } = useFieldArray({
        control,
        name: 'parts',
    });

    const { fields: labours, append : appenedLabours, remove: removeLabours } = useFieldArray({
        control,
        name: 'labours',
    });

    // console.log('parts',parts);
    // console.log('labours',labours);
    
    /* For SpareParts */
    const addPartsHandler = ()=>{
        appenedParts({})
    }
    const removePartsHandler = (index:number)=>{
        removeParts(index)
    }

    /* For Labours */
    const addLaboursHandler = ()=>{
        appenedLabours({})
    }
    const removeLaboursHandler = (index:number)=>{
        removeLabours(index)
    }

    const calculateTotal = () => {
        const data = getValues();
        const totalPartsValue = data?.parts?.reduce((sum, item) => sum + parseInt(item?.totalPrice?.toString() || '0'), 0) || 0;
        const totalLaboursValue = data?.labours?.reduce((sum, item) => sum + parseInt(item?.price?.toString() || '0'), 0) || 0;
        const total =  totalPartsValue + totalLaboursValue
        setValue('totalValue',total)
        return total;
    }

    const handleBillSubmit = (data:BillFormData)=>{
        
        if(data?.totalValue === 0 || data?.totalValue === '0'){
            toast.error('الاجمالى لا يمكن ان يكون ب 0')
        }else if(!data?.totalValue){
            toast.error('اضغط علي احسب الفاتورة قبل الحفظ')
        }else {
            // console.log(data); 
        }
    }

    
    return ( 
        <form className="text-mainDark" dir={lang === 'en' ? 'ltr' : 'rtl'} noValidate onSubmit={handleSubmit(handleBillSubmit)}>
            <section className="Bill-Personal_info">
                <Title title={t('bills.client.title')} />
                <PersonalInfo register={register} control={control} errors={errors} getValues={getValues} setValue={setValue} trigger={trigger} />
            </section>

            <section className="bill-spareparts-info-wrapper mt-3">
                <Title title={t('bill.sparepart.title')} />
                <PartsInfo register={register} control={control} errors={errors} setValue={setValue} watch={watch} parts={parts} add={addPartsHandler} remove={removePartsHandler} />
            </section>

            <section className="bill-Labours-info-wrapper mt-3">
                <Title title={t('bill.labour.title')} />
                <LaboursInfo register={register} control={control} errors={errors} setValue={setValue} labours={labours} add={addLaboursHandler} remove={removeLaboursHandler} />
            </section>

            <section className="notes-wrapper mt-3">
            
                <Title title={t('common.notes')} />
                <NotesInfo register={register} control={control} errors={errors} setValue={setValue} />
            </section>

            <section className="total-bill-info-wrapper mt-3">
                <Title title={t('bill.total')} />
                <TotalInfo register={register} unregister={unregister} control={control} errors={errors} setValue={setValue} watch={watch} calc={calculateTotal} />
            </section>

            <div className="my-4">
                <Button type='submit' className="p-2 bg-mainBlue text-white capitalize min-w-[150px] font-semibold">{t('bill.save')}</Button>
            </div>
        </form>
    );
}

export default EditBill;