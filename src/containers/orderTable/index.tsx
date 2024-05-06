import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { IOrderLine, Order } from 'models/Order';
import { OrderTableHead } from './Head';
import { SelfTableRow } from './row';
import { SelfTableEdit } from './edit';


interface OrderTableContainerProps {
    mainState: Order;
    rows: IOrderLine[];
}

export function OrderTableContainer({
    mainState,
    rows,
}: OrderTableContainerProps) {
    const classes = useStyles();

    if (mainState.orderLines.length) {
        return (
            <Paper className={`${classes.paper} table`} >
                <TableContainer className={classes.container} >
                    <Table className={classes.table + ' crop-end'} >
                        <OrderTableHead />
                        <TableBody>
                            {rows.map((item, index) => {
                                if (item.edit) {
                                    return <SelfTableEdit key={index} index={index} mainState={mainState} item={item} />;
                                } else {
                                    return <SelfTableRow key={index} index={index} mainState={mainState} item={item} />;
                                }
                            })}
                        </TableBody>
                        {/* {rows.length ? <OrderTableFoot rows={rows} /> : null} */}
                    </Table>
                </TableContainer>
                {/* {rows.length ? <OrderTableDiscount mainState={mainState} /> : null} */}
            </Paper>
        )
    }

    return null;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: '100%',
        maxWidth: 'calc(100vw - 7rem)'
    },
    container: {
        maxHeight: 440,
    },
    table: {
        '& th, td': {
            '&:not(:last-child)': {
                borderInlineEnd: `1px solid rgba(0, 0, 0, .1)`
            },
        },
        // '& th': {
        //     zIndex: 0
        // }
    }
}));