import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';


export const UserViewTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell style={{ minWidth: '3rem' }} >
                    کد کاربر
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    نام کاربر
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
