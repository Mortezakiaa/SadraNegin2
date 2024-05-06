import React from 'react';
import { withStyles, TableCell, TableRow } from '@material-ui/core';
import { IRowDetailsLinesProps } from '../../../models/Store/Search';
import { red } from '@material-ui/core/colors';

interface SelfTableRowProps {

    item: IRowDetailsLinesProps;
    index: number;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    item,
    index,
}) => {

    return (
        <StyledTableRow>
            <StyledTableCell align='center' >{item.num1}</StyledTableCell>
            <StyledTableCell align='center' >{item.date}</StyledTableCell>
            <StyledTableCell align='center' >{item.nameMoshtari}</StyledTableCell>
            <StyledTableCell align='center' >{item.sharh_Head}</StyledTableCell>
            <StyledTableCell align='center' >{item.sharh_Line}</StyledTableCell>
            {/* تعداد کل سفارش */}
            <StyledTableCell align='center' >{item.tedad2}</StyledTableCell>
            {/* تعداد ارسالی */}
            <StyledTableCell align='center'>{item.tedad1HavaleShode}</StyledTableCell>
            {/* تعداد مانده */}
            <StyledTableCell align='center'>{Math.round((item.tedad2) as any - (item.tedad1HavaleShode) as any)}</StyledTableCell>
            {/* <StyledTableCell align='center' >{item.tedad1}</StyledTableCell> */}
        </StyledTableRow>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: red[400],
        color: theme.palette.getContrastText(red[400]),
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);