import { Grid } from '@material-ui/core';
import React from 'react';
import {  SelfForm, SelfNumberBox, SelfTextField } from 'components';
import { Customer, ICustomer } from 'models';
import { useHelmet, useSelfForm } from 'utilities';


interface ICustomerContainerProps {
    factory: Customer;
}

const CustomerContainer = ({
    factory
}: ICustomerContainerProps) => {
    const [mainState, control, handleSubmit, errors] = useSelfForm<ICustomer, Customer>(factory);

    let helmet = useHelmet(
        'Sadra PWA - Customer | برنامه وب پیشرفته صدرا - مشتریان'
        , 'نمایش مشتریان شرکت صدرا'
    );
    return (
        <>
            {helmet}
            <Grid item container direction='column' >
                <SelfForm<ICustomer, Customer>
                    mainState={mainState}
                    onSubmit={handleSubmit}
                >
                    <SelfTextField<ICustomer, Customer>
                        mainState={mainState}
                        control={control}
                        fieldName='name'
                        errors={errors}
                        label='نام مشتری'
                        props={{
                            fullWidth: true,
                        }}
                        rules={{
                            required: true
                        }}
                    />
                    <SelfTextField<ICustomer, Customer>
                        mainState={mainState}
                        control={control}
                        fieldName='address'
                        errors={errors}
                        label='آدرس'
                        props={{
                            fullWidth: true,
                        }}
                    />
                    <SelfNumberBox<ICustomer, Customer>
                        mainState={mainState}
                        control={control}
                        fieldName='tell'
                        errors={errors}
                        label='تلفن'
                        props={{
                            fullWidth: true,
                        }}
                    />
                    <SelfNumberBox<ICustomer, Customer>
                        mainState={mainState}
                        control={control}
                        fieldName='mobile'
                        errors={errors}
                        label='تلفن همراه'
                        required
                        props={{
                            fullWidth: true,
                            required: true
                        }}
                        rules={{
                            required: true
                        }}
                    />
                </SelfForm>
            </Grid>
        </>
    )
}

export default CustomerContainer;