import React from 'react';
import { withStyles, TableCell, TableRow, Button } from '@material-ui/core';
import { OrderSearch, IOrderSearchResponse } from 'models/Order/Search';
import { red } from '@material-ui/core/colors';
import { VisibilityOutlined } from '@material-ui/icons';
import { IItemProps } from 'models';

interface SelfTableRowProps {
    mainState: OrderSearch;
    item: IOrderSearchResponse;
    withAssets?: boolean;
    onClickRow?: (item: IItemProps) => void;
}

export const SelfTableRow: React.FC<SelfTableRowProps> = ({
    mainState,
    item,
    withAssets,
    onClickRow
}) => {

    const onClickRowHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClickRow) {
            onClickRow({
                code: item.id.toString(),
                name: item.customerName.toString()
            })
        }
    }

    // const onDeleteRowHandler = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     mainState.trigger('confirm',
    //         `آیا مایل به حذف سفارش با شماره ${item.id} میباشید`,
    //         'در صورت حذف رکورد حذف شده قابلیت بازگردانی ندارد',
    //         () => mainState.deleteRow(item.id),
    //         () => { }
    //     )
    // }

    // const onPrintHandler = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     mainState.printRow(item.id);
    // }

    const onShowDetailRowHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.getRowDetails(item.id);
        mainState.orderId=item.id;
    }

    

    return (
        <StyledTableRow onClick={onClickRowHandler} >
            <StyledTableCell align='center' >{item.customerName}</StyledTableCell>
            <StyledTableCell align='center' >{item.date}</StyledTableCell>
            <StyledTableCell align='center' >{item.num1}</StyledTableCell>
            <StyledTableCell align='center' >{item.sharh}</StyledTableCell>
            {withAssets ? <StyledTableCell align='center' >
                {/* <Button variant='text' onClick={onPrintHandler} >
                    <Print color='secondary' />
                </Button> */}
                <Button variant='text' onClick={onShowDetailRowHandler} >
                  <VisibilityOutlined color='secondary' />
                </Button>
                {/* <Button variant='text' onClick={onDeleteRowHandler} >
                    <DeleteOutlineOutlined color='secondary' />
                </Button> */}
              
            </StyledTableCell> : null}
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
            // opacity : 0,
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