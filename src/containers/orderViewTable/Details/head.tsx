import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';



export const OrderViewTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell style={{ minWidth: '2rem' }} >
                    کد کالا
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '5rem' }} >
                    نام کالا
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    تعداد
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    تعداد حواله شده
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    ارسال شده
                </StyledTableCell>
                
              
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
