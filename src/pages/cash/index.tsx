import React from 'react';
import { Button, Container } from '@material-ui/core';
import { apiAxios, Cash, ICash } from 'models';
import { useHelmet, useSelfForm } from 'utilities';
import { SelfAutoComplete, SelfDatePicker, SelfForm, SelfNumberBox, SelfNumberBoxWithoutField, SelfTextField } from 'components';
import { CustomerShortCut } from 'pages/customer/shortCut';
import { OrderListShortCut } from 'pages/orderList/shortCut';
import { BackspaceOutlined } from '@material-ui/icons';

interface OrderContainerProps {
    factory: Cash;
}

const OrderContainer: React.FC<OrderContainerProps> = ({
    factory,
}) => {
    const [mainState, control, handleSubmit, errors, formValues, onValueChange] = useSelfForm<ICash, Cash>(factory);
    let helmet = useHelmet(
        'Sadra PWA - Cash | برنامه وب پیشرفته صدرا - پرداخت وجه'
        , 'نمایش صفحه پرداخت وجه '
    );

    return (
        <>
            {helmet}
            <Container className='self-container' >
                <SelfForm<ICash, Cash>
                    mainState={mainState}
                    onSubmit={handleSubmit}
                    title='پرداخت وجه'
                    className='grid row'
                    disabled={mainState.disabled}
                >
                    <SelfAutoComplete<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='orderId'
                        label='سفارش'
                        customLabel={formValues.orderId ? { code: '', name: formValues.orderId.name } : null}
                        disabled
                        buttons={
                            <>
                                <OrderListShortCut
                                    mainStateManager={mainState.mainStateManager}
                                    disabledPrevForm={mainState.disabledFormHandler}
                                    open={mainState.orderListShortCutOpen}
                                    setOpen={mainState.setOrderListShortCutOpen}
                                    onSelect={(item) => onValueChange('orderId', item)}
                                />
                                {formValues.orderId && formValues.orderId.code ? <Button variant='outlined' onClick={() => onValueChange('orderId', null)} >
                                    <BackspaceOutlined color='inherit' />
                                </Button> : null}
                            </>
                        }
                    />
                    {mainState.get('orderNum') !== 0 ? <SelfNumberBoxWithoutField
                        value={mainState.get('orderNum')}
                        onChange={() => { }}
                        label='شماره سفارش'
                        disabled
                    /> : null}
                    <SelfDatePicker<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='dateForm'
                        label='تاریخ فرم'
                        rules={{
                            required: true
                        }}
                    />
                    {/* <SelfTextField<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='shobe'
                        errors={errors}
                        label='شعبه'
                        rules={{
                            required: true
                        }}
                    /> */}
                    <SelfTextField<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='sharhForm'
                        errors={errors}
                        label='شرح فرم'
                        rules={{
                            required: true
                        }}
                    />
                    <SelfAutoComplete<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='cashType'
                        label='نوع پرداخت'
                        defaultItems={mainState.cashType}
                        required
                        rules={{
                            required: true
                        }}
                    />
                    <SelfAutoComplete<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='codeBank'
                        label='کد بانک'
                        defaultItems={mainState.codeBank}
                        required
                        rules={{
                            required: true
                        }}
                    />
                    <SelfNumberBox<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='amount'
                        errors={errors}
                        label='مبلغ'
                        required
                        thousandSeparator
                        rules={{
                            required: true
                        }}
                    />
                    <SelfTextField<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='babat'
                        errors={errors}
                        label='بابت'
                        rules={{
                            required: true
                        }}
                    />
                    <SelfTextField<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='sharhLine'
                        errors={errors}
                        label='شرح ردیف'
                        rules={{
                            required: true
                        }}
                    />
                    <SelfAutoComplete<ICash, Cash>
                        mainState={mainState}
                        control={control}
                        fieldName='codeMoshtari'
                        itemAddress={{
                            instance: apiAxios('Customer'),
                            address: 'GetAll'
                        }}
                        search
                        label='کد مشتری'
                        required
                        rules={{
                            required: true
                        }}
                        buttons={
                            <CustomerShortCut
                                mainState={mainState.mainStateManager}
                                disabledPrevForm={mainState.disabledFormHandler}
                                open={mainState.customerShortCutOpen}
                                setOpen={mainState.setCustomerShortCutOpen}
                            />
                        }
                    />
                    {formValues.cashType ? <>
                        <SelfTextField<ICash, Cash>
                            mainState={mainState}
                            control={control}
                            fieldName='numChechFish'
                            errors={errors}
                            label={formValues.cashType.code === '12' ? 'شماره چک' : 'شماره فیش'}
                            rules={{
                                required: true
                            }}
                        />
                        <SelfDatePicker<ICash, Cash>
                            mainState={mainState}
                            control={control}
                            fieldName='dateCheck'
                            label={formValues.cashType.code === '12' ? 'تاریخ چک' : 'تاریخ فیش'}
                            rules={{
                                required: true
                            }}
                        />
                    </> : null}
                </SelfForm>
            </Container>
        </>
    )
}

export default OrderContainer;