import { Container } from '@material-ui/core';
import { IStoreSearch, StoreSearch, StoreSearch7 } from '../../models/Store/Search';
import React, { useEffect} from 'react';
import { SelfForm } from '../../components';
import { StoreViewTableSecondContainer } from '../../containers/StoreViewTableSecond';
import { useHelmet, useSelfForm } from '../../utilities';

interface RuleContainerProps {
    factory: StoreSearch;
}

const StoreSecondContainer: React.FC<RuleContainerProps> = ({
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
                <SelfForm<IStoreSearch, StoreSearch7> mainState={mainState} title='موجودی انبار قطعات تریگرافشانه' >
                    <StoreViewTableSecondContainer factory={mainState} list={mainState.StoreList} withAssets={false}/>
                </SelfForm>
            </Container>
        </>
    )
}

export default StoreSecondContainer;