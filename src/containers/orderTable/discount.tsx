import React, { useState } from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { RedeemOutlined } from '@material-ui/icons';
import { Order } from 'models/Order';
import { SelfModal, SelfNumberBoxWithoutField, SelfTextFieldWithoutField } from 'components';

interface OrderTabelDiscountProps {
    mainState: Order;
}

export const OrderTableDiscount: React.FC<OrderTabelDiscountProps> = ({
    mainState,
}) => {
    const [dis, setDis] = useState<number>(mainState.orderDiscount);
    const classes = useStyles();

    const onShowModalHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.setDiscountOrderTableModal(true);
    }

    const onSubmitHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        mainState.setDrderDiscount(dis);
    }

    return (
        <>
            <Button onClick={onShowModalHandler} className={classes.discount} variant='text' >
                <RedeemOutlined />
            </Button>
            <SelfModal
                open={mainState.discountOrderTableModal}
                onClose={() => mainState.setDiscountOrderTableModal(false)}
                title='اعمال تخفیف بر روی فاکتور'
            >
                <Grid container item style={{ maxWidth: '29.5rem' }} >
                    <Grid>
                        <Typography variant='subtitle1' component='h6'>
                            مبلغ کل :
                        </Typography>
                        <SelfTextFieldWithoutField
                            value={mainState.orderLines.map(i => i.final).reduce((a, b) => a + b).toLocaleString()}
                            label='مبلغ'
                            onChange={() => { }}
                            disabled
                        />
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1' component='h6'>
                            مبلغ تخفیف :
                        </Typography>
                        <SelfNumberBoxWithoutField
                            value={dis}
                            onChange={(e) => setDis(e)}
                            label='تخفیف'
                            required
                            thousandSeprator
                        />
                    </Grid>
                    <Button
                        onClick={onSubmitHandler}
                        variant='contained'
                        color='primary'
                        fullWidth
                    >
                        اعمال
                    </Button>
                </Grid>
            </SelfModal>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    discount: {
        position: 'absolute',
        right: '.8rem',
        bottom: '.8rem',
        minWidth: 'auto',
        width: 45,
        height: 45,
        background: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        borderRadius: '50%',
        boxShadow: `0 0 2px 0 ${theme.palette.primary.main}`,
        zIndex: 5,
        '&:hover': {
            background: `linear-gradient(45deg, #f4433694, ${theme.palette.primary.main} 50%)`,
            boxShadow: `0 0 10px 0 ${theme.palette.primary.main}`,
        }
    }
}));
