import { Button, FormControl, Container, Grid } from '@material-ui/core';
import React from 'react';
import { SelfAutoComplete, SelfListModalBox, SelfForm, SelfNumberBox, SelfTextField, SelfDatePicker } from 'components';
import { OrderTableContainer } from 'containers';
import { DiscountTableContainer } from 'containers/orderTable/Discount/index';
import { Order, IOrder, apiAxios } from 'models';
import { useHelmet, useSelfForm } from 'utilities';
import { CustomerShortCut } from 'pages/customer/shortCut';


interface OrderContainerProps {
    factory: Order;
}

const OrderContainer: React.FC<OrderContainerProps> = ({
    factory,
}) => {
    const [mainState, control, handleSubmit, errors, watch] = useSelfForm<IOrder, Order>(factory);

    let helmet = useHelmet(
        'Sadra PWA - Order | برنامه وب پیشرفته صدرا - سفارشات'
        , 'نمایش سفارشات شرکت صدرا. با توجه به فیلتر درخواستی'
    );

    
    return (
        <>
            {helmet}
            <Container className='self-container' >
                <SelfForm<IOrder, Order>
                    mainState={mainState}
                    onSubmit={handleSubmit}
                    title='ثبت سفارش جدید'
                    disabled={mainState.disabled}
                    className='grid row'
                >
                    <SelfAutoComplete<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='customerCode'
                        itemAddress={{
                            instance: apiAxios('Customer'),
                            address: 'Markaz1Search'
                        }}
                        search
                        label='مشتریان'
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
                     <SelfAutoComplete<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='typeInsert'
                        itemAddress={{
                            instance: apiAxios('Customer'),
                            address: 'Markaz2Search'
                        }}
                        search
                        label='انواع ورود'
                        required
                        rules={{
                            required: true
                        }}
                    />
                    <SelfAutoComplete<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='company'
                        itemAddress={{
                            instance: apiAxios('Customer'),
                            address: 'Markaz3Search'
                        }}
                        search
                        label='شرکت ها'
                        required
                        rules={{
                            required: true
                        }}
                    />
                    {/* <SelfAutoComplete<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='codeFaktorType'
                        label='نوع فاکتور'
                        itemAddress={{
                            instance: apiAxios('OrderType'),
                            address: 'GetAll'
                        }}
                        required
                        rules={{
                            required: true
                        }}
                    /> */}

                    {/* <SelfCodeAnbar<Order>
                        mainState={mainState}
                        control={control}
                        fieldName='codeAnbar'
                    />
                    */}
                    <SelfNumberBox<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='num2'
                        errors={errors}
                        label='شماره '
                    />
                    <SelfDatePicker<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='date2'
                        label='تاریخ تحویل'
                        rules={{
                            required: true
                        }}
                    />
                    {/* <SelfTextField<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='sharh'
                        errors={errors}
                        label='نام فروشنده'
                        rules={{
                            required: true
                        }}
                    /> */}
                    <SelfTextField<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='tozihat'
                        errors={errors}
                        label='توضیحات'
                    />
                    <SelfListModalBox<IOrder, Order>
                        mainState={mainState}
                        control={control}
                        fieldName='..'
                        value={mainState.selectedProduct}
                        onChange={(e) => mainState.setSelectedProduct = e}
                        getItem={mainState.goodGetAll}
                        label='محصولات'
                        controlProps={{
                            defaultValue: ''
                        }}
                    />
                    {/* <SelfInventory<Order>  mainState={mainState}  />   */}
                    {mainState.selectedProduct &&
                        <Grid item container alignItems='center' justify='space-between' >
                            <SelfNumberBox<IOrder, Order>
                                mainState={mainState}
                                control={control}
                                fieldName='.'
                                errors={errors}
                                label='تعداد'
                                onChange={(e) => mainState.setNumberOfProduct = e}
                                controlProps={{
                                    defaultValue: ''
                                }}
                                rules={{
                                    required: true
                                }}
                            />
                            <SelfNumberBox<IOrder, Order>
                                mainState={mainState}
                                control={control}
                                fieldName='...'
                                errors={errors}
                                label='قیمت'
                                onChange={(e) => mainState.setNumberOfFee = e}
                                controlProps={{
                                    defaultValue: ''
                                }}
                                rules={{
                                    required: true
                                }}
                            />
                            <FormControl >
                                <Button
                                    disabled={mainState.numberOfProduct === null || mainState.numberOfFee === null}
                                    variant='outlined'
                                    onClick={() => mainState.addToOrderLines(watch)}
                                >
                                    اضافه
                                </Button>
                            </FormControl>
                        </Grid>
                    }
                    <Grid item container id='grid-view-printable' >
                        <OrderTableContainer mainState={mainState} rows={mainState.orderLines} />
                        <br />
                        <DiscountTableContainer mainState={mainState} rows={mainState.orderLines} />
                    </Grid>
                </SelfForm>
            </Container>
        </>
    )
}

export default OrderContainer;
