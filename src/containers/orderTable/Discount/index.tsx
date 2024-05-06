import React from 'react';
import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, withStyles } from '@material-ui/core';
import { Order } from '../../../models';
import { IOrderLine } from 'models/Order';
import { HighlightOffOutlined } from '@material-ui/icons';

interface DiscountTableContainerProps {
    mainState: Order;
    rows: IOrderLine[];
}

export const DiscountTableContainer: React.FC<DiscountTableContainerProps> = ({
    mainState,
    rows,
}) => {
    const classes = useStyles();

    const onRemoveDiscount = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.setDrderDiscount(0);
    }

    if (mainState.orderDiscount > 0) {
        return (
            <Paper className={`${classes.paper} table`} >
                <Button className={classes.button} onClick={onRemoveDiscount} >
                    <HighlightOffOutlined color='primary' />
                </Button>
                <TableContainer className={classes.container} >
                    <Table className={classes.table} stickyHeader >
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align='center' >
                                    مبلغ کل
                                </StyledTableCell>
                                <StyledTableCell align='center' >
                                    {rows.length ? rows.map(i => i.final).reduce((a, b) => a + b).toLocaleString() : null}
                                </StyledTableCell>
                                </StyledTableRow>
    
                                <StyledTableRow>
                                <StyledTableCell align='center' >
                                    مبلغ تخفیف
                                </StyledTableCell>
                                <StyledTableCell align='center' >
                                    {rows.length ? mainState.orderDiscount.toLocaleString() : null}
                                    {/* {rows.map(i => i.final).reduce((a, b) => a + b)} */}
                                </StyledTableCell>
                                </StyledTableRow>
    
                                <StyledTableRow>
                                <StyledTableCell align='center' >
                                    مبلغ نهایی
                                </StyledTableCell>
                                <StyledTableCell align='center' >
                                    {rows.length ? Math.round(rows.map(i => i.final).reduce((a, b) => a + b) - mainState.orderDiscount).toLocaleString() : null}
                                    {/* {rows.map(i => i.final).reduce((a, b) => a + b)} */}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
    
    return null;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        maxWidth: 'calc(100vw - 2.1rem)',
        marginTop: '1rem',
        '&:hover': {
            '&> button': {
                opacity: 1,
                transition: '.3s ease-in-out'
            }
        }
    },
    container: {
        maxHeight: 440,
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
    button: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        minWidth: 'auto',
        width: 20,
        height: 20,
        opacity: 0,
        borderRadius: '50%',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, .3)',
        transition: '.3s ease-in-out'
    }
}));

const StyledTableCell = withStyles((theme) => ({
    root: {
        fontSize: 14,
        minWidth: '5rem',
        paddingTop: '5px',
        paddingBottom: '5px'
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    },
}))(TableRow);