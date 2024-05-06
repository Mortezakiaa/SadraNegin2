import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import { INotifItem, SelfTableRow } from './row';
import { OrderViewTableHead } from './head';
import { NotifSearch } from '../../../models/Notification/Search';

interface SelfTableRowDetailsTableProps {
    mainState: NotifSearch;
    lines: INotifItem[];
}

export const SelfTableRowDetailsTable = ({
    mainState,
    lines,
}: SelfTableRowDetailsTableProps) => {
    const classes = useStyles();

    if (lines.length) {
        return (
            <Paper className={`${classes.paper} table`} >
                <TableContainer className={classes.container} >
                    <Table className={classes.table} stickyHeader >
                        <OrderViewTableHead />
                        <TableBody>
                            {lines.map((item, index) => <SelfTableRow key={index} index={index} mainState={mainState} item={item} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
    
    return <Typography variant='subtitle2' component='label' >موردی یافت نشد</Typography>;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: '100%',
        maxWidth: 'calc(100vw - 15rem)',
        marginTop: theme.spacing(4)
    },
    container: {
        maxHeight: '200',
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
    }
}));