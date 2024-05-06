import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';

interface Header{
    withAssets?: boolean
}


export const StoreViewTableHead = ({withAssets}: Header) => {
    return ( <> 
    
    <TableHead style={{position: 'sticky', top:0, border:'0px'}}>
            <TableRow>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    نوع 
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    رنگ
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    تعداد سفارش
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                   موجودی انبار قطعات تریگرافشانه
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
                    مانده قابل سفارش از انبار قطعات تریگرافشانه
                </StyledTableCell>
            </TableRow>
        </TableHead>
        </> ) }
    
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
