import { useForm } from "react-hook-form";
import PersonalInfo from "../../Bills/NewBill/PersoanlInfo/billPersonalInfo";
import { reportData } from "../../../Components/Types/types";
import ReportTable from "../NewReport/ReportTable/reportTable";
import { IconButton } from "@mui/material";
import NotesInfo from "../../Bills/NewBill/NotesInfo/notes";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { MdLocalPrintshop } from "react-icons/md";
import Footer from "../../../Components/Layout/footer";

const ViewReport = () => {
    const {register,control,formState,setValue} = useForm<reportData>({
    })
    
    const {errors} = formState

    const [_,setisPrint] = useState(false)

    const navigate = useNavigate()

    const prevPageHandler = ()=>{
        navigate(-1)
    }
    const componentRef = useRef(null);

    return ( 
        <>
            <ReactToPrint
                trigger={() => <IconButton>
                    <MdLocalPrintshop className='text-mainBlue text-2xl' />
                </IconButton>}
                content={() => componentRef.current}
                onBeforeGetContent={() => { setisPrint(true); return Promise.resolve()}}
                onAfterPrint={() => { setisPrint(false); return Promise.resolve()} }
            />

            <div className="new-report-wrapper text-mainDark relative" dir="rtl" ref={componentRef}>
                <section className="report-Personal_info">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-x-1 mb-4">
                            <span onClick={prevPageHandler} className="cursor-pointer mt-1 prev-icon"><FaAngleRight className='text-2xl text-mainBlue' /></span>
                            <h2 className="text-2xl font-semibold">بيانات العميل</h2>
                        </div>
                    </div>
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

                <section className="pt-10">
                    <Footer />
                </section>

                {/* <section className='mt-6 basis-full'>
                    <Button type="submit" className='text-lg bg-mainBlue text-white min-w-[150px]'>حفظ</Button>
                </section> */}
            </div>
        </>
    );
}

export default ViewReport;