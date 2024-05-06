import { Container } from '@material-ui/core';
import { IStoreSearch, StoreSearch, StoreSearch35 } from 'models/Store/Search';
import React, { useEffect} from 'react';
import { SelfForm } from '../../components';
import { StoreViewTableContainer } from '../../containers/StoreViewTable';
import { useHelmet, useSelfForm } from '../../utilities';

interface RuleContainerProps {
    factory: StoreSearch;
}

const RuleContainer: React.FC<RuleContainerProps> = ({
    factory,
}) => {
    const [mainState] = useSelfForm<IStoreSearch,StoreSearch>(factory);
    let helmet = useHelmet(
        'صدرا - List | برنامه وب پیشرفته صدرا - موجودی انبار'
        , 'نمایش لیست دسترسی کاربران'
    );
    
useEffect(() => {
    mainState.getList();
},[mainState])
    return (
        <>
            {helmet}
            <Container className='self-container'>
                <SelfForm<IStoreSearch, StoreSearch35> mainState={mainState} title='موجودی انبار تریگر افشانه' >
                    <StoreViewTableContainer factory={mainState} list={mainState.StoreList} withAssets={false}/>
                </SelfForm>
            </Container>
        </>
    )
}

export default RuleContainer;