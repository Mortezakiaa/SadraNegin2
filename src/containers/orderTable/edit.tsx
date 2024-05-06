import React, { useState } from 'react';
import { Button, withStyles, TableCell, TableRow, TextField } from '@material-ui/core';
import { IOrderLine, Order } from 'models/Order';
import { blue, red } from '@material-ui/core/colors';
import { DoneOutline, HighlightOffOutlined } from '@material-ui/icons';


export interface IEditOrderLine {
    count: number;
    fee: number;
    discount: number;
    tozihat: string;
}

interface SelfTableEditProps {
    mainState: Order;
    item: IOrderLine;
    index: number;
}

export const SelfTableEdit: React.FC<SelfTableEditProps> = ({
    mainState,
    item,
    index,
}) => {
    const [values, setValues] = useState<IEditOrderLine>({
        count: item.count,
        fee: item.fee,
        discount: item.discount,
        tozihat: item.tozihat
    });

    const setValuesHandler = (e: React.ChangeEvent, key: keyof IEditOrderLine, value: number | string) => {
        e.preventDefault();
        const newValues = { ...values };
        //@ts-ignore
        newValues[key] = value;
        setValues(newValues);
    }

    const onKeyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            mainState.setNewOrderValue(index, values);
        }
    }

    return (
        <StyledTableRow>
            <StyledTableCell align='center' >{index + 1}</StyledTableCell>
            <StyledTableCell align='center' >{item.name}</StyledTableCell>
            <StyledTableCell align='center' >
                <TextField
                    value={values.count.toString()}
                    onChange={(e) => setValuesHandler(e, 'count', +e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    style={{
                        width: '3rem'
                    }}
                />
            </StyledTableCell>
            <StyledTableCell align='center' >
                <TextField
                    value={values.fee.toString()}
                    onChange={(e) => setValuesHandler(e, 'fee', +e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    style={{
                        width: '5rem'
                    }}
                />
            </StyledTableCell>
            {/* <StyledTableCell align='center' >{item.discountAmount}</StyledTableCell>
            <StyledTableCell align='center' >
                <SelfPercentBoxWithoutField
                    value={values.discount}
                    onChange={(num, e) => setValuesHandler(e, 'discount', num)}
                    onKeyDown={onKeyDownHandler}
                    label='%'
                    props={{
                        style: {
                            width: '3rem'
                        }
                    }}
                />
            </StyledTableCell> */}
            {/* <StyledTableCell align='center' >{item.fianlBeforeDiscount}</StyledTableCell> */}
            <StyledTableCell align='center' >{item.final}</StyledTableCell>
            {/* <StyledTableCell align='center' >
                {item.img.length ? <img alt={item.name} src={item.img} width='80' height='50' /> : 'بدون عکس'}
            </StyledTableCell> */}
            {/* <StyledTableCell align='center'>
                <TextField
                    value={values.tozihat}
                    onChange={(e) => setValuesHandler(e, 'tozihat', e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    style={{
                        width: '15rem'
                    }}
                />
            </StyledTableCell> */}
            <StyledTableCell align='center' >
                <Button variant='text' onClick={() => mainState.setNewOrderValue(index, values)} >
                    <DoneOutline color='inherit' />
                </Button>
                <Button variant='text' onClick={() => mainState.disableEditMode()} >
                    <HighlightOffOutlined color='inherit' />
                </Button>
            </StyledTableCell>
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
        backgroundColor: red[100]
    },
}))(TableRow);