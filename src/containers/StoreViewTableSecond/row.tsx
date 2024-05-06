import React from 'react';
import { IItemStoreProps } from '../../models/Store/index';
import { withStyles, TableCell, TableRow, makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { StoreSearch7 } from '../../models/Store/Search';


interface SelfTableRowProps {
    item: IItemStoreProps;
    mainState: StoreSearch7;
    withAssets?: boolean;
    onClickRow?: (item: IItemStoreProps) => void;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    item,
    mainState,

}) => {


    const onClickRowHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.getRowDetails(item.code);
    }



    // const color = item.name.includes('سفید'||'کرمی'||'قهوه ای'||'زرد'||'آبی'||'قرمز'||'زرد'||'آبی'||'قرمز')
    return (
        <StyledTableRow onClick={onClickRowHandler} >
            <StyledColor item={item} />
        </StyledTableRow>
    )
}


interface StyledColorProps {
    item: IItemStoreProps;
}

const StyledColor: React.FC<StyledColorProps> = ({ item }) => {
    
    const classes = useStyles();
    const tedadMande = item.tedadSefaresh - item.tedadHavaleShode;
    if (item.mande < 0) {
        return (
            <>
                <StyledTableCell align='center' className={classes.color}>{item.name}</StyledTableCell>
                <StyledTableCell align='center' className={classes.color}>{item.color}</StyledTableCell>
                <StyledTableCell align='center' className={classes.color}>{Math.round(tedadMande)}</StyledTableCell>
                <StyledTableCell align='center' className={classes.color}>{item.kardexAnbar11}</StyledTableCell>
                <StyledTableCell align='center' className={classes.color}>{Math.floor(item.mande)}</StyledTableCell>
            </>
        )
    } else {
        return (
            <>
                <StyledTableCell align='center'>{item.name}</StyledTableCell>
                <StyledTableCell align='center'>{item.color}</StyledTableCell>
                <StyledTableCell align='center'>{Math.round(tedadMande)}</StyledTableCell>
                <StyledTableCell align='center'>{item.kardexAnbar11}</StyledTableCell>
                <StyledTableCell align='center'>{Math.floor(item.mande)}</StyledTableCell>
            </>
        )
    }
}


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: indigo[400],
        color: theme.palette.getContrastText(indigo[400]),
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
const useStyles = makeStyles((theme) => ({
    color: {
        backgroundColor: '#e34c4c87',
    }
}));