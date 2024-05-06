import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import { OrderSearch, IOrderSearchResponse } from 'models/Order/Search';
import { OrderViewTableHead } from './Head';
import { SelfTableRow } from './row';
import { SelfTableRowDetails } from './Details';
import { IItemProps } from 'models';
import { FilterTableContainer } from './filter';

interface OrderViewTableContainerProps {
    mainState: OrderSearch;
    rows: IOrderSearchResponse[];
    onClickRow?: (item: IItemProps) => void;
    withAssets?: boolean;
}

export function OrderViewTableContainer({
    mainState,
    rows,
    onClickRow,
    withAssets,
}: OrderViewTableContainerProps) {
    const classes = useStyles();

    return (
        <Paper className={`${classes.paper} table`} >
            <FilterTableContainer mainState={mainState} />
            <TableContainer className={`self-table ${classes.container}`} >
                <Table className={classes.table} >
                    <OrderViewTableHead withAssets={withAssets} />
                    <TableBody>
                        {rows.length ?
                            rows.map(item =>
                                <SelfTableRow
                                    key={item.id}
                                    mainState={mainState}
                                    item={item}
                                    onClickRow={onClickRow}
                                    withAssets={withAssets}
                                />
                            ):
                            <tr>
                                <td colSpan={12} style={{ padding: '.5rem 2rem' }} >
                                    <Typography variant='h5' component='h5' style={{ textAlign: 'center' }} >موردی یافت نشد</Typography>
                                </td>
                            </tr>}
                    </TableBody>
                </Table>
            </TableContainer>
            <SelfTableRowDetails mainState={mainState} />
            
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: '100%',
        maxWidth: 'calc(100vw - 7rem)'
    },
    container: {
        minHeight: '15rem',
        maxHeight: 'calc(100vh - 16rem)',
    },
    table: {
        '& th, td': {
            '&:not(:last-child)': {
                borderInlineEnd: `1px solid rgba(0, 0, 0, .1)`
            },
            '&:last-child': {
                zIndex: '0'
            }
        },
    },
}));