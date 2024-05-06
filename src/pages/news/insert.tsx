import React from "react";
import { useHelmet, useSelfForm } from "utilities";
import { News, INews } from 'models';
import { Container } from "@material-ui/core";
import { SelfForm } from "components";

interface InsertNewsPageProps {
    factory: News;
}

const InsertNewsPage = ({
    factory,
}: InsertNewsPageProps) => {
    const [mainState, , handleSubmit] = useSelfForm<INews, News>(factory);
    let helmet = useHelmet(
        'ُSadra PWA - News | برنامه وب پیشرفته صدرا - اخبار'
        , 'نمایش اخبار و اطلاعات بروز شرکت صدرا'
    );

    return (
        <>
            {helmet}
            <Container className='self-container' >
                <SelfForm<INews, News>
                    mainState={mainState}
                    onSubmit={handleSubmit}
                    title='ایجاد خبر جدید'
                    // disabled={mainState.disabled}
                    className='grid row'
                >

                </SelfForm>
            </Container>
        </>
    )
}

export default InsertNewsPage;