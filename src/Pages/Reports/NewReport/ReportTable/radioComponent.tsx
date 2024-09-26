import { Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { reportData } from "../../../../Components/Types/types";

type radioType = {
    register : UseFormRegister<reportData>,
    control?: Control<FieldValues>;
    errors? : FieldErrors<reportData>,
    item : {
        id:number,
        nameAr:string,
        status:string
    }

}
const RadioComponent:React.FC<radioType> = ({item,register}) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target?.value);
        console.log(event?.target);
        
    };

    const handleClick = ()=>{
        console.log(item?.id);
        
    }
    return ( 
        <RadioGroup defaultValue="outlined" onClick={handleClick} onChange={handleChange} value={value} name={item?.nameAr} className="w-full flex-row justify-around row-auto [&>span]:p-[5px]">
            <Radio value="good"  className="w-fit" />
            <Radio value="normal" className="w-fit" />
            <Radio value="bad" className="w-fit" />
        </RadioGroup>
    );
}

export default RadioComponent;