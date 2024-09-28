import { useState, useEffect } from 'react';
import { DispatchFunction, apiParamsType } from '../../Types/types';
import { TableColumn } from 'react-data-table-component';
import { BsDot, BsSortDown, BsSortUp } from 'react-icons/bs';


export interface RemoteSortHook<T> {
    (apiFunction: (args:apiParamsType)=>void, dispatch: DispatchFunction, page?: number, size?: number, paginated?:number, searchValue?: string , type?: string, selectedDate?: Date): {
        handleRemoteSort: (column: TableColumn<T>) => void;
        icon: JSX.Element;
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRemoteSort:RemoteSortHook<any> = (apiFunction, dispatch, page, size,paginated,searchValue,type) => {
    const [sortCount, setSortCount] = useState(0);
    const [col, setCol] = useState<string|null|undefined>(null);
    const [dir, setDir] = useState<string|null|undefined>(null);
    const [icon, seticon] = useState<JSX.Element>(<BsSortUp />);

    // const handleRemoteSort = <T,>(column:TableColumn<T>,dir?:SortOrder) => {
    const handleRemoteSort = <T,>(column:TableColumn<T>) => {
        const colName = column?.name;
        if (typeof colName === 'string' || colName === null || colName === undefined) {
            if (col === colName && sortCount === 0) {
                setDir('DESC');
                setSortCount(1);
                seticon(<BsSortDown />)
            } else if (col === colName && sortCount === 1) {
                setDir(null);
                setCol(null);
                setSortCount(0);
                seticon(<BsDot className="text-[1px] opacity-0" />)
                // Here, you would reset your data to its original state
            } else {
                setCol(colName);
                setDir('ASC');
                setSortCount(0);
                seticon(<BsSortUp />)
            }
        }
    };

    useEffect(() => {
        dispatch(apiFunction({ page, size, col, dir, paginated, searchValue,type }));
    }, [apiFunction, col, dir, dispatch, page, paginated, searchValue, size, type]);

    return { handleRemoteSort,icon };
};
