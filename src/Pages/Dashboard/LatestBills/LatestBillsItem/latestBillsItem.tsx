import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { latestBillItemDataType } from "../../../../Components/Types/types";
import { Tooltip } from "@mui/material";

const LatestBillItem = ({data}:latestBillItemDataType) => {
    // console.log(data);
    
    return ( 
        <div className="latest-bill-item-wrapper mb-3 pb-3 border-b cursor-pointer">
            <div className="flex justify-between items-center capitalize text-mainLightDark font-semibold bg-slate-100 p-2 rounded-md">
                <div className="item-left-wrapper flex items-center gap-x-2">
                    <div className="[&>svg]:w-8 [&>svg]:h-8">
                        {data?.type ==='bill' ? <FaRegMoneyBillAlt /> : <TbReportAnalytics />}
                    </div>

                    <div>
                        <Tooltip
                            placement="top"
                            className="text-lg capitalize"
                            title={data?.name}
                        >
                            <p className="text-sm mb-1 max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">{data?.name}</p>
                        </Tooltip>
                        <p className="text-[12px] text-[#a5a5a5]">{data?.date}</p>
                    </div>
                </div>

                <div className="item-right-wrapper">
                    {data?.car}
                </div>
            </div>
        </div>
    );
}

export default LatestBillItem;