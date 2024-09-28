import './reportTable.scss'
import RadioComponent from "./radioComponent";
import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { reportData } from '../../../../Components/Types/types';
type reportTableList = {
    id:number,
    nameAr:string,
    status:string
}[]

type reportPropsType = {
    register : UseFormRegister<reportData>,
    control?: Control<FieldValues>;
    errors? : FieldErrors<reportData>,
    getValues?:UseFormGetValues<reportData>,
    setValue?: UseFormSetValue<reportData> | undefined,
}
const ReportTable:React.FC<reportPropsType> = ({register,control,setValue}) => {

    const reportPartList:reportTableList = [
        {id:1,nameAr:'المحرك',status:'good'},
        {id:2,nameAr:'التكيف',status:'normal'},
        {id:3,nameAr:'الدبرياج',status:'bad'},
        {id:4,nameAr:'كشف كومبيوتر',status:'good'},
        {id:5,nameAr:'الايرباج',status:'good'},
        {id:6,nameAr:'لمبة محرك',status:'bad'},
        {id:7,nameAr:'ABS',status:'normal'},
        {id:8,nameAr:'العدادات',status:'good'},
        {id:9,nameAr:'احزمه الامان',status:'bad'},
        {id:10,nameAr:'الفتيس',status:'good'},
        {id:11,nameAr:'التعليقالامامى',status:'good'},
        {id:12,nameAr:'التعليق الخلفى',status:'bad'},
        {id:13,nameAr:'طلاء السيارة',status:'bad'},
        {id:14,nameAr:'هيكل السيارة',status:'bad'},
        {id:15,nameAr:'زجاج امامى',status:'normal'},
        {id:16,nameAr:'زجاج خلفى',status:'good'},
        {id:17,nameAr:'كبوت',status:'good'},
        {id:18,nameAr:'شنطة',status:'normal'},
        {id:19,nameAr:'اكصدام امامى',status:'good'},
        {id:20,nameAr:'اكصدام خلفى',status:'good'},
        {id:21,nameAr:'رفارف',status:'good'},
        {id:22,nameAr:'ابواب',status:'good'},
        {id:23,nameAr:'سقف',status:'good'},
        {id:24,nameAr:'فوانيس امامية',status:'good'},
        {id:25,nameAr:'فوانيس خلفية',status:'good'},
        {id:26,nameAr:'شاسية',status:'good'},
        {id:27,nameAr:'الاستين',status:'good'},
        {id:28,nameAr:'الاطارات',status:'bad'},
    ]

    return ( 
        <article className="report-table-wrapper p-2 ronded-sm shadow-md bg-white py-6 px-5 rounded-md">
            <section className="report-table-form flex flex-wrap justify-between items-start gap-x-2">
                <div className="table-one basis-[48%]">
                    <div className="grid-custom-table shadow-md rounded-md">
                        <section className="grid-table-header bg-gray-300 rounded-md rounded-bl-none rounded-br-none w-full grid grid-cols-4 justify-between items-center font-semibold p-2 border-b border-white text-center">
                            <div>اسم العنصر</div>
                            <div>جيد</div>
                            <div>متوسط</div>
                            <div>سيئة</div>
                        </section>

                        <section className="grid-table-body w-full font-semibold p-2">
                            <div  className="grid grid-cols-4 justify-between items-center border-white text-center [&>div]:py-2">
                                {reportPartList?.slice(0,14)?.map( (item,_)=>(
                                    <div className="item-row col-span-4 grid grid-cols-4 border-b" key={item?.id}>
                                        <div>
                                            <span>{item?.nameAr}</span>
                                        </div>

                                        <div className="col-span-3">
                                            <RadioComponent register={register} item={item} />
                                        </div>
                                    </div>
                                ) )}
                                
                            </div>
                        </section>
                    </div>
                </div>

                <div className="table-two basis-[48%]">
                    <div className="grid-custom-table shadow-md rounded-md">
                        <section className="grid-table-header bg-gray-300 rounded-md rounded-bl-none rounded-br-none w-full grid grid-cols-4 justify-between items-center font-semibold p-2 border-b border-white text-center">
                            <div>اسم العنصر</div>
                            <div>جيد</div>
                            <div>متوسط</div>
                            <div>سيئة</div>
                        </section>

                        <section className="grid-table-body w-full font-semibold p-2">
                            <div  className="grid grid-cols-4 justify-between items-center border-white text-center [&>div]:py-2">
                                {reportPartList?.slice(14,28)?.map( (item,_)=>(
                                    <div className="item-row col-span-4 grid grid-cols-4 border-b" key={item?.id}>
                                        <div>
                                            <span>{item?.nameAr}</span>
                                        </div>

                                        <div className="col-span-3">
                                            <RadioComponent register={register} item={item} />
                                        </div>
                                    </div>
                                ) )}
                                
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </article>
    );
}

export default ReportTable;