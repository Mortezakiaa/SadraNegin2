import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import { NotifViewTableHead } from './Head';
import { SelfTableRow } from './row';
import { IItemProps } from '../../models';
import { INotifResponse, NotifSearch } from '../../models/Notification/Search';
import { SelfTableRowDetails } from 'containers/NotifViewTable/Details';

interface NotifViewTableContainerProps {
    mainState: NotifSearch;
    rows: INotifResponse[];
    onClickRow?: (item: IItemProps) => void;
    withAssets?: boolean;
}

export function NotifViewTableContainer({
    mainState,
    rows,
    onClickRow,
    withAssets,
}: NotifViewTableContainerProps) {
    const classes = useStyles();

  

    return (
        <Paper className={`${classes.paper} table`} >
            <TableContainer className={`self-table ${classes.container}`} >
                <Table className={classes.table} >
                    <NotifViewTableHead withAssets={withAssets} />
                    <TableBody>
                        {rows.length ?
                            rows.map((item, index) =>
                                <SelfTableRow
                                    key={index}
                                    mainState={mainState}
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
                    {/* <div>{rows[0]?.sharh}</div> */}
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