import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';


export const OrderTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell style={{ width: '1rem', maxWidth: '1rem', minWidth: '1rem' }} >
                    *
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '12rem' }} >
                    نام کالا
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '3rem', width: '3rem' }} >
                    تعداد
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem', width: '7rem' }} >
                    فی
                </StyledTableCell>
                {/* <StyledTableCell style={{ minWidth: '10rem' }} >
                    قیمت قبل تخفیف
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem', width: '7rem' }} >
                    درصد تخفیف
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem', width: '7rem' }} >
                    قیمت تخفیف
                </StyledTableCell> */}
                <StyledTableCell style={{ minWidth: '7rem' }} >
                    قیمت نهایی
                </StyledTableCell>
                {/* <StyledTableCell style={{ minWidth: '7rem' }} >
                    عکس
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '15rem' }} >
                    توضیحات
                </StyledTableCell> */}
                <StyledTableCell style={{ minWidth: '10rem' }} ></StyledTableCell>
            </TableRow>
        </TableHead>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        textAlign: 'center',
        backgroundColor: blue[900],
        color: theme.palette.getContrastText(blue[700]),
        
    },
    body: {
        textAlign: 'center',
        fontSize: 14,
        color:'#fff'
    },
}))(TableCell);
