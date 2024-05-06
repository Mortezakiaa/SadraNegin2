import { Container} from '@material-ui/core';
import React from 'react';
import { SelfListModalBox, SelfForm} from '../../components';
import {SelfInventory} from '../../components/Inventory'
import { useHelmet, useSelfForm } from '../../utilities';
import { Repository,IRepository } from 'models/Repository';
import { SelfCodeAnbar } from 'components/SelfCodeAnbar';


interface RepositoryContainerProps {
    factory: Repository;
}

const RepositoryContainer: React.FC< RepositoryContainerProps> = ({
    factory,
}) => {
    const [mainState, control] = useSelfForm<IRepository, Repository>(factory);
    let helmet = useHelmet(
        'Sadra PWA - Order | برنامه وب پیشرفته صدرا - سفارشات'
        , 'نمایش سفارشات شرکت صدرا. با توجه به فیلتر درخواستی'
    );

    return (
        <>
            {helmet}
            <Container className='self-container' >
                <SelfForm<IRepository, Repository>
                    mainState={mainState}
                    title='موجودی انبار'
                    className='grid row '
                   
                >
                  
                    <SelfCodeAnbar<Repository>
                        mainState={mainState}
                        control={control}
                        fieldName='codeAnbar'
                    />
                    <SelfListModalBox<IRepository,Repository>
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
                   <SelfInventory<Repository>   mainState={mainState}  />  
                </SelfForm>

            
                
                
            </Container>
        </>
    )
}

export default RepositoryContainer;

