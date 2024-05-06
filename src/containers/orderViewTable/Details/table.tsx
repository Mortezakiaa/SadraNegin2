import React from 'react';
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableContainer, TextField, Typography } from '@material-ui/core';
import { IRowDetailsLinesProps, OrderSearch } from '../../../models/Order/Search';
import { SelfTableRow } from './row';
import { OrderViewTableHead } from './head';
import { Autocomplete } from '@material-ui/lab';
import { StyledTableCell } from './row'


interface SelfTableRowDetailsTableProps {
    mainState: OrderSearch;
    lines: IRowDetailsLinesProps[];
    onClose: () => void;
}

export const SelfTableRowDetailsTable = ({
    mainState,
    lines,
    onClose
}: SelfTableRowDetailsTableProps) => {
    const classes = useStyles();
    const onClickHandler = () => {
        mainState.updateList();
        mainState.updateHavaleShode();
        setTimeout(() => { onClose(); }, 5000);
    }
    const showAdmin = mainState.admin

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
                    {showAdmin ?
                        <></> : <>
                            <Grid style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <StyledTableCell align='center' >
                                    <Autocomplete
                                        id="anbar"
                                        options={AnbarSadra}
                                        onChange={(event, value) => mainState.setCodeAnbar(value?.code)}
                                        getOptionLabel={(option: IAnbarSadra) => option.name}
                                        style={{ width: 400 }}
                                        renderInput={(params) => <TextField {...params} label="کد انبار " variant="outlined" />}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Autocomplete
                                        id="havale"
                                        options={HavaleSadra}
                                        getOptionLabel={(option: IAnbarSadra) => option.name}
                                        style={{ width: 400 }}
                                        onChange={(event, value) => mainState.setCodeHavaleType(value?.code)}
                                        renderInput={(params) => <TextField {...params} label=" نوع حواله " variant="outlined" />}
                                    />
                                </StyledTableCell>
                            </Grid>
                            <div style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-around" }}  >
                                <Button onClick={onClickHandler} style={{ width: "50%", margin: "0" }} variant="outlined" color="secondary"  >ثبت نهایی</Button>
                            </div>  </>
                    }

                </TableContainer>
            </Paper>
        )
    }

    return <Typography variant='subtitle2' component='label' >موردی یافت نشد</Typography>;
}

interface IAnbarSadra {
    code: number,
    name: string
}
interface IHavaleSadra {
    code: number,
    name: string
}
const AnbarSadra: IAnbarSadra[] = [
    { code: 1, name: 'انبار مواد اولیه' },
    { code: 2, name: 'انبار بطری' },
    { code: 3, name: 'انبار پریفرم ' },
    { code: 4, name: 'انبار بازرگانی' },
    { code: 5, name: 'انبار واسطه پریفرم به بطری' },
    { code: 6, name: 'انبار مصرفی تولید' },
    { code: 7, name: 'انبار درب و دستگیره' },
]
const HavaleSadra: IHavaleSadra[] = [
    { code: 1, name: ' حواله فروش کالا' },
    { code: 2, name: ' حواله جابجایی بین انبار' },
    { code: 3, name: ' حواله برگشت از خرید کالا ' },
    { code: 4, name: ' حواله تولید پریفرم' },
    { code: 5, name: '  حواله تولید بطری' },
    { code: 6, name: ' حواله تولید ضایعات و متفرقه ' },
    { code: 7, name: '   حواله تولید درب و دستگیره' },
    { code: 9, name: '      حواله کالای امانی ' },
]
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: '100%',
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
