import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import { UserViewTableHead } from './Head';
import { SelfTableRow } from './row';
import { Rule, IUserRuleProps } from 'models';

interface UserViewTableContainerProps {
    mainState: Rule;
    rows: IUserRuleProps[];
}

export function UserViewTableContainer({
    mainState,
    rows,
}: UserViewTableContainerProps) {
    const classes = useStyles();

    return (
        <Paper className={`${classes.paper} table`} >
            <TableContainer className={`self-table ${classes.container}`} >
                <Table className={classes.table} >
                    <UserViewTableHead />
                    <TableBody>
                        {rows.length ?
                            rows.map((item, index) =>
                                <SelfTableRow
                                    key={index}
                                    mainState={mainState}
                                    item={item}
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