import React from 'react';
import { Container } from '@material-ui/core';
import { SelfAutoComplete, SelfForm } from 'components';
import { Rule, IRule, apiAxios } from 'models';
import { userAccessTypes } from 'models/Rule';
import { useHelmet, useSelfForm } from 'utilities';

interface RuleContainerProps {
    factory: Rule;
}

const RuleContainer: React.FC<RuleContainerProps> = ({
    factory,
}) => {
    const [mainState, control, handleSubmit, , , setValue] = useSelfForm<IRule, Rule>(factory);
    let helmet = useHelmet(
        'Sadra PWA - Order | برنامه وب پیشرفته صدرا - سفارشات'
        , 'نمایش لیست دسترسی کاربران'
    );

    return (
        <>
            {helmet}
            <Container className='self-container' >
                <SelfForm<IRule, Rule>
                    mainState={mainState}
                    title='لیست دسترسی کاربران'
                    onSubmit={handleSubmit}
                >
                    <SelfAutoComplete<IRule, Rule>
                        mainState={mainState}
                        control={control}
                        fieldName='codeKarbar'
                        itemAddress={{
                            instance: apiAxios('Login'),
                            address: 'GetAll'
                        }}
                        onChange={(item) => mainState.getRule(item, setValue)}
                        label='کاربر'
                        required
                        rules={{
                            required: true
                        }}
                    />
                    <SelfAutoComplete<IRule, Rule>
                        mainState={mainState}
                        control={control}
                        fieldName='sefareshat_Delete'
                        label='دسترسی'
                        defaultItems={userAccessTypes}
                        required
                        rules={{
                            required: true
                        }}
                    />
                </SelfForm>
            </Container>
        </>
    )
}

export default RuleContainer;