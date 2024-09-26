import { TFunction } from "i18next";
import { ReactElement } from "react"


export interface translationType {
    t: TFunction;
}

// Redux Types
export type authType = {
    auth:boolean
}

export type apiParamsType = {
    page?:number,
    size?:number,
    searchValue?:string,
    col?:string|null,
    dir?:string|null,
    paginated? : number,
    type? : string,
    selectedDate?: Date;
}

export type DispatchFunction = <T>(action: T) => T;

export interface HttpError extends Error {
    response?: {
        data?: {
            errors?: [];
        };
    };
}

export type billState = {
    bills : {
        id?:number,
        name?:string
    }[]
}

// App Types

export type navbarPropsType = {
    collapse:boolean
}

export type navbarLinksType =  {
    id:number,
    name:string,
    nameAr:string,
    icon:ReactElement,
    path:string
}[]

export type billItemData = {
    id:number,
    name:string,
    date:string,
    type:string,
    car:string
}

export type latestBillItemDataType ={
    data : billItemData
}

export type latestBillItemType = billItemData[]

export type billTableData = {
    id?: number;
    name?: string;
    date?: string;
    carType?: string;
    chassie?: string;
    motor?: string;
    color?: string;
}
export type partsData = {
    id?:number,
    name?:string,
    code?:number|string,
    price?:number,
    amount?: number|string,
    totalPrice? : number | string
}
export type labours = {
    id?:number,
    name?:string,
    price?:number,
}

export interface carProp  {
    brand?:string,
    model?:string | number,
    paletNumber?: string,
    chassis?: number | string,
    motor?: number | string,
    color?:string,
}
export interface personalInfo extends carProp {
    id?:number,
    label?:string,
    client?:string,
    name?:string,
    phoneNumber? : number | string
    odometer?:number | string,
    inDate? :string,
    outDate? : string,
    cars? : carProp[]
}
export interface BillFormData extends personalInfo {
    parts? : partsData[]
    labours? : labours[],
    totalValue? : number | string,
    totaltaxbill? : number
}

// reports page
type reportParts = {
    id:number,
    name:string,
    status:string
}[]
export interface reportData extends personalInfo {
    notes? : string,
    reportParts? : reportParts[]
}


// spareparts

export type sparepartTableData = {
    id?: number,
    name?: string,
    code?:string,
    stock?:number | string,
    price?:number | string,
    date?:string,
    notes?:string,
    type? : string,
    buy_price? : number | string
}

// client
export type clients = {
    id:number
    name:string
    phone:string | number
    cars: Car[]; // Add the cars property
    chassie?:string
    motor?:string
    color?:string
}

// cars

export type carsData = {
    id?:number
    name?:string
}

export type carObject = {
    cars : { 
        data : carsData[],
        meta?: {
            current_page?: string | number,
            from?: string | number,
            last_page?: string | number,
            path?:string | number ,
            per_page?: string | number,
            to?: string | number,
            total?: number
        },
        // searchValue?:string
    } | null | undefined,
}

// client Cars

export type Car = {
    id?:number|string
    make: string;
    makeobject? : string
    model: string;
    car_type_id : string | number;
    plate_number?: string;
    chase_number?: string | number;
    motor_number?: string | number;
    color:string,
    carType? : {
        id?:string | number,
        name?: string;
    }
};

export type FormValues = {
    id?:number|string
    name: string | '';
    phone: string | number;
    cars: Car[];
};