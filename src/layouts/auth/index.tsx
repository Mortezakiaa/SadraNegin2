import React from 'react';
import { Redirect } from 'react-router-dom';
import { ILogin, Login } from 'models';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useHelmet, useSelfForm } from 'utilities';
import { SelfForm, SelfNumberBox, SelfTextField } from 'components';

interface LoginPageProps {
    mainFactory: Login;
}

export const LoginPage: React.FC<LoginPageProps> = ({
    mainFactory,
}) => {
    const [mainState, control, handleSubmit, errors] = useSelfForm<ILogin, Login>(mainFactory);
    const classes = useStyles();

    const helmet = useHelmet(
        'SaDra - Login | برنامه وب پیشرفته صدرا - ورود'
        , 'برنامه وب پیشرفته صدرا . صفحه ورود کاربر . نمایش صفحه ورود کاربر به برنامه'
    );

    if (mainState.mainStateManager.Usering.isAthentication) {
        return (
            <Redirect to='' />
        )
    }

    return (
        <Grid container className={classes.main} direction='column' >
            {helmet}
            <Grid item container direction='column' sm={8} md={5} lg={3} >
                <SelfForm<ILogin, Login>
                    mainState={mainState}
                    onSubmit={handleSubmit}
                    customText='ورود'
                >
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typeStyle} >
                            شرکت پلیمر افشانه
                        </Typography>
                    </div>
                    <SelfNumberBox<ILogin, Login>
                        mainState={mainState}
                        control={control}
                        fieldName='code'
                        errors={errors}
                        label='کد کاربری'
                        props={{
                            fullWidth: true,
                        }}
                        rules={{
                            required: true,
                        }}
                    />
                    <SelfTextField<ILogin, Login>
                        mainState={mainState}
                        control={control}
                        fieldName='password'
                        errors={errors}
                        label='رمز عبور'
                        props={{
                            fullWidth: true,
                            autoComplete: 'current-password',
                            type: 'password'
                        }}
                        rules={{
                            required: true
                        }}
                    />
                </SelfForm>
            </Grid>
        </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    typeStyle: {
        margin: theme.spacing(3),
    }
}));