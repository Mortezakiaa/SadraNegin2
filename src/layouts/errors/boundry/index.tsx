import React from 'react';
import Catch from "./catch";
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { useHelmet } from 'utilities';


type Props = {
    children: React.ReactNode;
};

export const SelfErrorBoundry = Catch(function MyErrorBoundary(props: Props, errorHandler: () => void, error?: Error) {
    const helmet = useHelmet(
        'Sadra PWA - ERROR | برنامه وب پیشرفته صدرا - خطا'
        , 'برنامه وب پیشرفته صدرا . یک Sadra در سیستم باعث بروز مشکل شده است'
    );

    if (error) {
        return (
            <Grid container className='error-screen' sm={5} md={4} lg={4} >
                {helmet}
                {/* <img src={LOGO} alt='LOGO' /> */}
                <Typography variant='subtitle1' component='h5' align='center' >
                    یک خطای ناخواسته در سیستم باعث بروز مشکل شده است.لطفا با بخش پشتیبانی تماس بگیرید
                </Typography>
                <Divider orientation='horizontal' variant='fullWidth' style={{ width: '100%' }} />
                <Typography variant='caption' component='h6' align='center' color='primary' >
                    {error.message}
                </Typography>
                <Button variant='outlined' onClick={errorHandler} style={{ marginTop: '2rem' }} >
                    تلاش دوباره
                </Button>
            </Grid>
        )
    } else {
        return <>{props.children}</>
    }
});