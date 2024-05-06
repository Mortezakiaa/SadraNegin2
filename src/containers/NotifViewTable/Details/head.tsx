import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';


export const OrderViewTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell style={{ width: '1rem', maxWidth: '1rem', minWidth: '1rem' }} >
                    *
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '3rem' }} >
                    شناسه
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    توضیحات
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    فایل ها
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '10rem' }} >
                    تاریخ
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
