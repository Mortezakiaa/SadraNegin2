import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { SelfForm } from '../../components'
import { INotifSearch, NotifSearch } from '../../models/Notification/Search'
import { useSelfForm } from 'utilities'
import {NotifViewTableContainer} from 'containers/NotifViewTable'
interface notificationListProps{
    factory : NotifSearch
}

export default function NotificationList ({factory}:notificationListProps){
    const [mainState] = useSelfForm<INotifSearch,NotifSearch>(factory);
    useEffect(() => { 
        mainState.getList()
    }, [mainState]);

  
    return (
        <>
            <Grid item container direction='column' className='self-container' >
                <SelfForm<INotifSearch,NotifSearch>
                    mainState={mainState}
                    title='لیست اطلاعیه ها'
                >  
                <NotifViewTableContainer
                        mainState={mainState}
                        rows={mainState.NotifList}
                        withAssets
                />
                </SelfForm>
            </Grid>
        </>
    )
}
