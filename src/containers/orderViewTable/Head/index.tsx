import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';


export const OrderViewTableHead = ({
    withAssets
}: {
    withAssets?: boolean
}) => {
    return (
        <TableHead style={{position: 'sticky', top:0, border:'0px'}}>
            <TableRow>
                <StyledTableCell style={{ minWidth: '9rem' }} >
                    نام مشتری
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    تاریخ
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '5rem' }} >
                    شماره 1
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem' }} >
                    شرح
                </StyledTableCell>
                {withAssets ? <StyledTableCell style={{ minWidth: '3rem' }} >جزئیات</StyledTableCell> : null}
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
