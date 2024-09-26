import { useFieldArray, useForm } from "react-hook-form";
import PersonalInfo from "../../Bills/NewBill/PersoanlInfo/billPersonalInfo";
import { reportData } from "../../../Components/Types/types";
import ReportTable from "./ReportTable/reportTable";
import { Button } from "@mui/material";
import NotesInfo from "../../Bills/NewBill/NotesInfo/notes";

const AddReport = () => {
    const {register,control,handleSubmit,formState,setValue,watch,getValues,unregister} = useForm<reportData>({
    })
    
    const {errors} = formState

    const handleReportSubmit = (data:reportData)=>{
        console.log(data); 
    }

    return ( 
        <form className="new-report-wrapper text-mainDark" dir="rtl" noValidate onSubmit={handleSubmit(handleReportSubmit)}>
            <section className="report-Personal_info">
                <h2 className="mb-4 text-2xl font-semibold">بيانات العميل</h2>
                <PersonalInfo register={register} control={control} errors={errors} />
            </section>

            <section className="report-table mt-4">
                <h2 className="mb-4 text-2xl font-semibold">تقرير الاعطال</h2>
                <ReportTable register={register} control={control} errors={errors} />
            </section>

            <section className="notes-wrapper mt-3">
                <h2 className="mb-4 text-2xl font-semibold">ملاحظات</h2>
                <NotesInfo register={register} control={control} errors={errors} setValue={setValue} />
            </section>

            <section className='mt-6 basis-full'>
                <Button type="submit" className='text-lg bg-mainBlue text-white min-w-[150px]'>حفظ</Button>
            </section>
        </form>
    );
}

export default AddReport;