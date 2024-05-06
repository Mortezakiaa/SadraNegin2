import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import {CashSearch,ICashResponse} from '../../models/Cash/Search'
import { CashViewTableHead } from './Head';
import { SelfTableRow } from './row';
import { IItemProps } from '../../models';
import { FilterTableContainer } from 'containers/cashViewTabel/filter';

interface CashViewTableContainerProps {
    mainState: CashSearch;
    rows: ICashResponse[];
    onClickRow?: (item: IItemProps) => void;
    withAssets?: boolean;
}

export function CashViewTableContainer({
    mainState,
    rows,
    onClickRow,
    withAssets,
}: CashViewTableContainerProps) {
    const classes = useStyles();

    return(
        <Paper className={`${classes.paper} table`} >
            <TableContainer className={`self-table ${classes.container}`} >
                <Table className={classes.table} >
                    <CashViewTableHead withAssets={withAssets} />
                    <TableBody>
                        {
                        rows.length ?
                            rows.map(item =>
                                <SelfTableRow
                                    item={item}
                                    onClickRow={onClickRow} 
                                />
                            ) :
                            <tr>
                                <td colSpan={12} style={{ padding: '.5rem 2rem' }} >
                                    <Typography variant='h5' component='h5' style={{ textAlign: 'center' }} >موردی یافت نشد</Typography>
                                </td>
                            </tr>}
                    </TableBody>
                </Table>
            </TableContainer>
            <FilterTableContainer mainState={mainState} />
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