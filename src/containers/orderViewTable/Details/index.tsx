import React from 'react';
import { OrderSearch } from '../../../models';
import {  SelfModal } from '../../../components';
import { SelfTableRowDetailsTable } from './table';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

interface SelfTableRowDetailsProps {
    mainState: OrderSearch;
}

export const SelfTableRowDetails = ({mainState}: SelfTableRowDetailsProps) => {
    const classes = useStyles();

    const onCloseHandler = () => {
        mainState.setShowRowDetails(false);
        mainState.rowDetails = null;
    }

    if (mainState.rowDetails) {
      
        const head =['نام مشتری','تاریخ','شرح','شماره1' ]
    
        
        return (
            <>
                <SelfModal
                    open={mainState.showRowDetails}
                    onClose={onCloseHandler}
                    title='نمایش جزییات سفارش'
                >
                <Paper className={`${classes.paper} table`} >
                <TableContainer className={`self-table ${classes.container}`} >
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                            {head.map((header,index) => (
                                <TableCell key={index} className={classes.headCell}>
                                {header}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow hover   tabIndex={-1}>
                            
                                <TableCell  style={{ fontSize: '12px',textAlign: 'center'}}>
                                    {mainState.rowDetails?.customerName}
                                </TableCell>
                                <TableCell style={{ fontSize: '12px',textAlign: 'center'}}>
                                    {mainState.rowDetails?.date}
                                </TableCell>
                                <TableCell style={{ fontSize: '12px',textAlign: 'center'}}>
                                    {mainState.rowDetails?.sharh}
                                </TableCell>
                                <TableCell  style={{ fontSize: '12px',textAlign: 'center'}}>
                                    {mainState.rowDetails?.num1}
                                </TableCell>
                            
                            </TableRow>
                        </TableBody>
                        
                        </Table>
                    </TableContainer>
                
                    <SelfTableRowDetailsTable onClose={onCloseHandler} mainState={mainState} lines={mainState.rowDetails.lines}/>
                </Paper>
                </SelfModal>
            </>
        )
    }

    return null;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 'calc(100vh - 10rem)',
        overflow: 'auto'
    },
    lableBoxContainer: { 
        width:'100%', 
        fontSize:'16px', 
        display:"flex",
        backgroundColor: '#0317ff12',
        borderRadius: '3px',
        marginBottom: '5px',
        flexWrap: 'wrap', 
    },
    table: {
        '& th, td': {
            '&:not(:last-child)': {
                // borderInlineEnd: `1px solid rgba(0, 0, 0, .1)`
            },
            '&:last-child': {
                zIndex: '0'
            }
        },
    },
    paper: {
        position: 'relative',
        width: '100%',
        maxWidth: 'calc(100vw - 7rem)'
    },
    root: {
        width: '100%',
      },
    headCell:{
        fontWeight: 800,
        fontSize: '12px',
        backgroundColor:'#d07d7726',
        textAlign: 'center'
    },

}))
