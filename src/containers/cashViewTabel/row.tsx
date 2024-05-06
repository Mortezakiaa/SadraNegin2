import React from 'react';
import { withStyles, TableCell, TableRow} from '@material-ui/core';
import {ICashResponse} from '../../models/Cash/Search'
import { red } from '@material-ui/core/colors';
import { IItemProps } from '../../models';

interface SelfTableRowProps {

    item: ICashResponse;
    onClickRow?: (item: IItemProps) => void;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    item,
    onClickRow,
}) => {

    const onClickRowHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClickRow) {
            onClickRow({
                code: item.num1.toString(),
                name: item.nameMoshtari.toString()
            })
        }
    }
 


  

    return (
        <StyledTableRow onClick={onClickRowHandler} >
            {/* <StyledTableCell align='center' >{item.id}</StyledTableCell> */}
            <StyledTableCell align='center' >{item.num1}</StyledTableCell>
            <StyledTableCell align='center' >{item.dateForm}</StyledTableCell>
            <StyledTableCell align='center' >{item.nameMoshtari}</StyledTableCell>
            <StyledTableCell align='center' >{item.babat}</StyledTableCell>
            <StyledTableCell align='center' >{item.cashTypeName}</StyledTableCell>
            <StyledTableCell align='center' >{item.amount}</StyledTableCell>
            <StyledTableCell align='center' >{item.codeMoshtari}</StyledTableCell>
            <StyledTableCell align='center' >{item.sharhLine}</StyledTableCell>
            <StyledTableCell align='center' >{item.shobe}</StyledTableCell>
            <StyledTableCell align='center' >{item.cashTypeCode}</StyledTableCell>
            <StyledTableCell align='center' >{item.numChechFish}</StyledTableCell>
            <StyledTableCell align='center' >{item.dateCheck}</StyledTableCell>
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
        '& :last-child > button': {
            opacity: 0,
            transition: '.3s ease-in-out'
        },
        '&:hover': {
            '& :last-child > button': {
                opacity: 1,
                transition: '.3s ease-in-out'
            },
        }
    },
}))(TableRow);