import { TableStyles } from "react-data-table-component";

export const tableStyle:TableStyles = {
    headRow: {
        style: {
        border: 'none',
        backgroundColor : '#fff'

        },
    },
    headCells: {
        style: {
            color: '#B5B5C3',
            fontSize: '14px',
            position : 'relative',
            // justifyContent : 'center'
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: '#442b7e12',
            borderBottomColor: '#FFFFFF',
            borderRadius: '5px',
            outline: '1px solid #FFFFFF',
        },
        style : {
            cursor : 'pointer'
        }
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
    cells: {
        style:{
            // padding : '5px 0px',
            marginBottom : "5px",
            fontSize : '12px',
            // justifyContent : 'center',
            fontWeight : '500',
            // cursor : 'pointer'
        }
    }
};