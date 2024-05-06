import React, { useState } from 'react';
import { OrderSearch, IOrderSearchFilter } from 'models/Order/Search';
import { Grid,  TextField } from '@material-ui/core';

interface FilterTableContainerProps {
    mainState: OrderSearch;
}

export const FilterTableContainer = ({
    mainState,
}: FilterTableContainerProps) => {
    const [filter, setFilter] = useState<IOrderSearchFilter>(mainState.filter)


    return (
        <>


            <Grid container item style={{ justifyContent: 'center', width: '100%' }} >
                <form style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '20px' }}>
                    <TextField
                        id="outlined-basic"
                        label="نام مشتری"
                        variant="outlined"
                        type="text"
                        name="filter1"
                        value={filter.nameMoshtari}
                        onChange={e => setFilter({ ...filter, nameMoshtari: e.target.value })}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                mainState.setFilter(filter)
                            }
                        }} />
                </form>
            </Grid>

        </>
    )
}



