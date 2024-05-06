import React, { useState } from 'react';
import { withStyles, TableCell, TableRow, Input, makeStyles } from '@material-ui/core';
import { OrderSearch, IRowDetailsLinesProps } from '../../../models/Order/Search';
import { red } from '@material-ui/core/colors';



interface SelfTableRowProps {
    mainState: OrderSearch;
    item: IRowDetailsLinesProps;
    index: number;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    mainState,
    item,
    index,
}) => {

    const classes = useStyles();
    const [CountStyle, setCountStyle] = useState('')


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();
        item.eTedad = +e.target.value;
        item.count - item.tedadHavaleShode >= item.eTedad ? setCountStyle(classes.success) : setCountStyle(classes.wrong);
        mainState.trigger('change');

    }

    // const res = item.count - item.tedadHavaleShode;
    // const classes =item.eTedad <= res  ? {color:"" } :  {color : "red"}
    // const onClickHandler = (id: number) => {
    //     mainState.trigger('change');
    // }


    if ((item.count - item.tedadHavaleShode) === 0) {

        return (
            <>
            </>
        )
    } else {
        return (
            <StyledTableRow>
                <StyledTableCell align='center' >{item.codeKala}</StyledTableCell>
                <StyledTableCell align='center' >{item.nameKala}</StyledTableCell>
                <StyledTableCell align='center' >{item.count}</StyledTableCell>
                <StyledTableCell align='center' >{item.tedadHavaleShode}</StyledTableCell>
                <StyledTableCell align='center' ><Input className={`${CountStyle}`} type='number' defaultValue='' onChange={onChangeHandler} placeholder={`قابل ارسال${item.count - item.tedadHavaleShode}`} /> </StyledTableCell>
            </StyledTableRow>
        )
    }
}
// className={classes}

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: red[400],
        color: theme.palette.getContrastText(red[400]),
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        width: 222,
        // maxHeight: 222,
        margin: theme.spacing(1)
    },
    media: {
        height: 140
    },
    success: {
        color: 'green'
    },
    wrong: {
        color: 'red'
    }
}))

