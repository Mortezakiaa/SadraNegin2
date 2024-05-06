import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface SearchProductNameProps {
   
}

export const SearchProductName:React.FC<SearchProductNameProps>=()=> {

   const res= 
    <Grid>
        <Typography variant='h5' component='h6' >لطفا نام کالای مورد نظر خود را جستجو کنید</Typography>
    </Grid> 

    return <>{res}</>
}



