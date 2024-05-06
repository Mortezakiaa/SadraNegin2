import React from 'react';
import { useHelmet, useSelfForm } from 'utilities';
import {INotif, NotificationFactory} from 'models/Notification';
import {Notification} from 'components/Notification'


interface NotificationContainerProps {
    factory:NotificationFactory
}

function NotificationContainer ({factory}:NotificationContainerProps){
    let helmet = useHelmet(
        'Sadra PWA - Home | برنامه وب پیشرفته صدرا - خانه'
        , 'نمایش صفحه اصلی برنامه صدرا'
    );

    const [mainState] = useSelfForm<INotif,NotificationFactory>(factory);
    return (
        <>
            {helmet}
            <Notification factory={mainState} />
        </>
    )
}


export default NotificationContainer;