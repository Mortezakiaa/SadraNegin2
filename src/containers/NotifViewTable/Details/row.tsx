import React from 'react';
import { withStyles, TableCell, TableRow } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { NotifSearch } from '../../../models/Notification/Search';
export interface INotifItem{
        id:number,
        date: string ,
        sharh: string,
        tozihat: string,
        lines: {
            id:number;
            tozihat :string;
            name : string;
            fileType : string
        }[]
      };

interface SelfTableRowProps {
    mainState: NotifSearch;
    item:INotifItem;
    index: number;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    mainState,
    item,
    index,
}) => {

    return (
        <StyledTableRow>
            <StyledTableCell align='center' >{index + 1}</StyledTableCell>
            <StyledTableCell align='center' >{item.id}</StyledTableCell>
            <StyledTableCell align='center' >{item.sharh}</StyledTableCell>
            <StyledTableCell align='center' >{item.tozihat}</StyledTableCell>
            <StyledTableCell align='center' >{item.date}</StyledTableCell>
        </StyledTableRow>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: blue[400],
        color: theme.palette.getContrastText(blue[400]),
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