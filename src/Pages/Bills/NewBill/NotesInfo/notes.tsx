import { Control,FieldErrors, UseFormReturn} from "react-hook-form";
import { BillFormData } from "../../../../Components/Types/types";
import { useTranslation } from "react-i18next";

type NotesFormProps = {
    register : UseFormReturn['register'],
    control: Control<BillFormData>,
    errors : FieldErrors<BillFormData>,
    setValue: UseFormReturn['setValue'],
    // watch:UseFormReturn['watch'],
}

const NotesInfo:React.FC<NotesFormProps> = ({register}) => {
    const {t} = useTranslation()
    return ( 
        <article className="bill-labours-wrapper p-2 ronded-sm shadow-md bg-white py-3 rounded-md">
            <section className="flex flex-wrap justify-between items-center gap-x-3 w-full gap-y-3 [&>div]:grow [&>div>textarea]:p-2 [&>div>textarea]:rounded-md [&>div>textarea]:bg-mainLightBlue [&>div>textarea]:focus-within:outline-0 [&>div>textarea]:transition-all [&>div>textarea]:duration-200 [&>div>label]:font-semibold">

                <div className="w-full">
                    <textarea 
                        className="grow w-full h-auto min-h-[50px] resize-none"
                        {...register(`notes`)}
                        placeholder={t('common.notes')}
                    />
                </div>
            </section>
        </article>
    );
}

export default NotesInfo;