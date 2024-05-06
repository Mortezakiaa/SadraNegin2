import React, { useState } from 'react';
import { StoreSearch, StoreSearchFilter } from '../../../models/Store/Search';
import { Grid, TextField, Switch, FormControlLabel } from '@material-ui/core';


interface FilterTableContainerProps {
    mainState: StoreSearch;
}

export const FilterTableContainer = ({
    mainState,
}: FilterTableContainerProps) => {
    const [filter, setFilter] = useState<StoreSearchFilter>({
        type: '',
        color: '',
        dahane: '',
        name:'',
        sortManfi: false,
    });

    const onChangeSortModeHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setFilter({ ...filter, sortManfi: checked });
        mainState.getList({ ...filter, sortManfi: checked })
    }

    return (
        <>
            <Grid container item style={{ justifyContent: 'center', width: '100%' }} >
                <form style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '20px' }}>
                    {/* <FormControlLabel control={
                        <Switch
                            checked={filter.sortManfi}
                            onChange={onChangeSortModeHandler}
                        />
                    } label="ترتیب منفی" /> */}
                    {/* <TextField
                        id="outlined-basic"
                        label="فیلتر نوع"
                        variant="outlined"
                        type="text"
                        name="filter2"
                        value={filter.type}
                        onChange={e => setFilter({ ...filter, type: e.target.value })}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                mainState.getList({ ...filter })
                            }
                        }} /> */}
                    <TextField
                        id="outlined-basic"
                        label="فیلتر نام کالا"
                        variant="outlined"
                        type="text"
                        name="filter"
                        value={filter.name}
                        onChange={e => setFilter({ ...filter, name: e.target.value })}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                mainState.getList({ ...filter })
                            }
                        }} />
                </form>
            </Grid>

        </>
    )
}

