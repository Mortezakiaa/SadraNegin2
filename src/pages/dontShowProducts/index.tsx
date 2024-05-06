import { Container } from '@material-ui/core';
import React from 'react';
import { SelfForm} from '../../components';
import { useHelmet, useSelfForm } from '../../utilities';
import { HeadOfProductsFactory } from '../../models/HeadOfProductsFactory';
import {SelfDontShowProductsBox} from '../../components/dontShowProducts/index'



interface dontShowProductsProps {
    factory: HeadOfProductsFactory;
}


const DontShowProducts: React.FC<dontShowProductsProps> = ({
    factory,
}) => {
    const [mainState] = useSelfForm(factory);
    let helmet = useHelmet(
        'Sadra PWA - Order | برنامه وب پیشرفته صدرا - سفارشات'
        , 'نمایش سفارشات شرکت صدرا. با توجه به فیلتر درخواستی'
    );

    //error
    return (
        <>
            {helmet}
            <Container className='self-container' >
                <SelfForm
                    mainState={mainState}
                    title='عدم نمایش محصولات'
                >             
                <SelfDontShowProductsBox
                    mainState={mainState}
                    label='محصولات' 
                />
              </SelfForm>
            </Container>
        </>
    )
}
export default DontShowProducts