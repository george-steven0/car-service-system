import { Button, IconButton } from "@mui/material";
import PersonalInfo from "../NewBill/PersoanlInfo/billPersonalInfo";
import { useFieldArray, useForm } from "react-hook-form";
import { BillFormData } from "../../../Components/Types/types";
import PartsInfo from "../NewBill/PartsInfo/partsInfo";
import LaboursInfo from "../NewBill/LabooursInfo/laboursInfo";
import NotesInfo from "../NewBill/NotesInfo/notes";
import TotalInfo from "../NewBill/TotalBill/totalBillInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import './viewbill.scss'
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import Footer from "../../../Components/Layout/footer";

const ViewBill = React.forwardRef((props, ref) => {
    const [isPrint,setisPrint] = useState(false)
    const location = useLocation()
    // console.log(location?.state?.data);
    
    const {register,control,handleSubmit,formState,setValue,watch,getValues,unregister} = useForm<BillFormData>({
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
        const totalPartsValue = data?.parts?.reduce((sum, item) => sum + parseInt(item?.totalPrice?.toString() || '0'), 0);
        const totalLaboursValue = data?.labours?.reduce((sum, item) => sum + parseInt(item?.price?.toString() || '0'), 0);
        // const total = parseInt(totalPartsValue?.toString() + totalLaboursValue?.toString());
        const total = totalPartsValue && totalLaboursValue ? parseInt(totalPartsValue.toString() + totalLaboursValue.toString()) : 0;
        // console.log(total);
        setValue('totalValue',total)
        return total;
    }
    
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

            <div className="text-mainDark view-bill relative" dir="rtl" ref={componentRef}>
                <section className="Bill-Personal_info">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-x-1 mb-4">
                            <span onClick={prevPageHandler} className="cursor-pointer mt-1 prev-icon"><FaAngleRight className='text-2xl text-mainBlue' /></span>
                            <h2 className="text-2xl font-semibold">بيانات العميل</h2>
                        </div>
                    </div>
                    <PersonalInfo register={register} control={control} errors={errors} />
                </section>

                <section className="bill-spareparts-info-wrapper mt-3">
                    <h2 className="mb-4 text-2xl font-semibold">بيان قطع الغيار</h2>
                    <PartsInfo isPrint={isPrint} register={register} control={control} errors={errors} setValue={setValue} watch={watch} parts={parts} add={addPartsHandler} remove={removePartsHandler} />
                </section>

                <section className="bill-Labours-info-wrapper mt-3">
                    <h2 className="mb-4 text-2xl font-semibold">بيان المصنعيات</h2>
                    <LaboursInfo isPrint={isPrint} register={register} control={control} errors={errors} setValue={setValue} labours={labours} add={addLaboursHandler} remove={removeLaboursHandler} />
                </section>

                <section className="notes-wrapper mt-3">
                    <h2 className="mb-4 text-2xl font-semibold">ملاحظات</h2>
                    <NotesInfo register={register} control={control} errors={errors} setValue={setValue} />
                </section>

                <section className="total-bill-info-wrapper mt-3">
                    <h2 className="mb-4 text-2xl font-semibold">اجمالى الفاتورة</h2>
                    <TotalInfo isPrint={isPrint} register={register} unregister={unregister} control={control} errors={errors} setValue={setValue} watch={watch} calc={calculateTotal} />
                </section>

                {/* {!isPrint ?
                    <div className="my-4">
                        <Button type='submit' className="p-2 bg-mainBlue text-white capitalize min-w-[150px] font-semibold">حفظ الفاتورة</Button>
                    </div>
                : null
                } */}

                <section className="pt-10">
                    <Footer />
                </section>
            </div>
        </>
    );
})

export default ViewBill;