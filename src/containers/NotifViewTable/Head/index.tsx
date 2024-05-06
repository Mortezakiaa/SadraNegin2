import React from 'react';
import { TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';


export const NotifViewTableHead = ({
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
                    شناسه 
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    شرح
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '6rem' }} >
                    توضیحات
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '4rem' }} >
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
