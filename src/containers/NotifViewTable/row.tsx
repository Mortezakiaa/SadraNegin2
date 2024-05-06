import React from 'react';
import { withStyles, TableCell, TableRow} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { IItemProps } from '../../models';
import { INotifResponse, NotifSearch } from '../../models/Notification/Search';

interface SelfTableRowProps {
    mainState :NotifSearch;
    item: INotifResponse;
    onClickRow?: (item: IItemProps) => void;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    mainState,
    item,
    onClickRow,
}) => {

    const onClickRowHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.getRowDetails(item.id);
    }

    

    return (
        <StyledTableRow onClick={onClickRowHandler} >
            <StyledTableCell align='center' >{item.id}</StyledTableCell>
            <StyledTableCell align='center' >{item.sharh}</StyledTableCell>
            <StyledTableCell align='center' >{item.tozihat}</StyledTableCell>
            <StyledTableCell align='center' >{item.date}</StyledTableCell>
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