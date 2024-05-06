import React from 'react';
import { Button, withStyles, TableCell, TableRow } from '@material-ui/core';
import { IOrderLine, Order } from 'models/Order';
import { DeleteOutlineOutlined, EditOutlined } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

interface SelfTableRowProps {
    mainState: Order;
    item: IOrderLine;
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
            <StyledTableCell align='center' >{item.name}</StyledTableCell>
            <StyledTableCell align='center' >{item.count}</StyledTableCell>
            <StyledTableCell align='center' >{item.fee.toLocaleString()}</StyledTableCell>
            {/* <StyledTableCell align='center' >{item.fianlBeforeDiscount.toLocaleString()}</StyledTableCell> */}
            {/* <StyledTableCell align='center' >{item.discount === 0 ? `-` : `${item.discount}%`}</StyledTableCell> */}
            {/* <StyledTableCell align='center' >{item.discountAmount === 0 ? '-' : item.discountAmount.toLocaleString()}</StyledTableCell> */}
            <StyledTableCell align='center' >{item.final.toLocaleString()}</StyledTableCell>
            {/* <StyledTableCell align='center' >
                {item.img.length ? <img alt={item.name} src={item.img} width='80' height='50' /> : 'بدون عکس'}
            </StyledTableCell> */}
            {/* <StyledTableCell align='center' >{item.tozihat}</StyledTableCell> */}
            <StyledTableCell align='center' style={{ width: '10rem' }} >
                <Button variant='text' onClick={() => mainState.editMode(index)} >
                    <EditOutlined color='primary' />
                </Button>
                <Button variant='text' onClick={() => mainState.removeItemOrderLine(index)} >
                    <DeleteOutlineOutlined color='primary' />
                </Button>
            </StyledTableCell>
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
        }
    },
}))(TableRow);