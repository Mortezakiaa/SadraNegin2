import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';


export const OrderViewTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell style={{ minWidth: '7rem' }} >
                    شماره تبت
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '3rem' }} >
                    تاریخ
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '10rem' }} >
                    نام مشتری
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    شرح
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '5rem' }} >
                    توضیحات
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    تعداد کل سفارش
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '9rem' }} >
                    تعداد ارسالی
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '9rem' }} >
                    باقی مانده ارسالی
                </StyledTableCell>
                {/* <StyledTableCell style={{ minWidth: '9rem' }} >
                    تعداد1
                </StyledTableCell> */}
            </TableRow>
        </TableHead>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
    },
    body: {
        textAlign: 'center',
        fontSize: 14,
    },
}))(TableCell);
