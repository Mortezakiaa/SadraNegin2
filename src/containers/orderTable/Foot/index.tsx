import React from 'react';
import { TableCell, TableRow, withStyles, TableFooter } from '@material-ui/core';
import { IOrderLine } from 'models/Order';

interface OrderTableFootProps {
    rows: IOrderLine[];
}

export const OrderTableFoot: React.FC<OrderTableFootProps> = ({
    rows,
}) => {
    return (
        <TableFooter>
            <TableRow>
                <StyledTableCell colSpan={2} />
                <StyledTableCell style={{ minWidth: '3rem', width: '3rem' }} >
                    {rows.map(i => i.count).reduce((a, b) => a + b)}
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem', width: '7rem' }} >
                    {rows.map(i => i.fee).reduce((a, b) => a + b).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '10rem' }} >
                    {rows.map(i => i.fianlBeforeDiscount).reduce((a, b) => a + b).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem', width: '7rem' }} >
                    -
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem', width: '7rem' }} >
                    {rows.map(i => i.discountAmount).reduce((a, b) => a + b).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell style={{ minWidth: '7rem' }} >
                    {rows.map(i => i.final).reduce((a, b) => a + b).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align='center' colSpan={3} style={{ width: '10rem' }} ></StyledTableCell>
            </TableRow>
        </TableFooter>
    )
}

const StyledTableCell = withStyles((theme) => ({
    footer: {
        textAlign: 'center',
        fontSize: 14
    }
}))(TableCell);
