import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';


export const CashViewTableHead = ({
    withAssets
}: {
    withAssets?: boolean
}) => {
    return (
        <TableHead>
            <TableRow>
                {/* <StyledTableCell style={{ minWidth: '3rem' }} >
                    ID
                </StyledTableCell> */}
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    شماره 
                </StyledTableCell>

                <StyledTableCell style={{ minWidth: '8rem' }} >
                    تاریخ
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem', width: '6rem' }} >
                   نام مشتری
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '12rem', width: '12rem' }} >
                    بابت
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '5rem' }} >
                    نوع عملیات 
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '9rem' }} >
                    مبلغ  
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    کد مشتری
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem' }} >
                    شرح
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '8rem' }} >
                     شعبه
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '12rem' }} >
                    کد عملیات  
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '20rem' }} >
                     شماره چک/فیش
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '20rem' }} >
                     تاریخ چک
                </StyledTableCell>
                {withAssets ? <StyledTableCell style={{ minWidth: '15rem' }} ></StyledTableCell> : null}
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
