import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface EmptyItemProps {
   
}

export const EmptyItem:React.FC<EmptyItemProps>=()=> {

   const res= 
    <Grid>
        <Typography variant='h5' component='h6'>موردی یافت نشد</Typography>
    </Grid> 

    return <>{res}</>
}



