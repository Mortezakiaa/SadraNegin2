import React from 'react';
import { withStyles, TableCell, TableRow } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Rule, IUserRuleProps } from 'models';

interface SelfTableRowProps {
    mainState: Rule;
    item: IUserRuleProps;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    mainState,
    item,
}) => {

    return (
        <StyledTableRow>
            <StyledTableCell align='center' >{item.CodeKarbar}</StyledTableCell>
            <StyledTableCell align='center' >{item.NameKarbar}</StyledTableCell>
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