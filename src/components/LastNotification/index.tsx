import React from 'react'
import { INotifResponse, NotifSearch} from '../../models/Notification/Search'
interface lastNotificationProps{
  factory : NotifSearch
  rows: INotifResponse[];
}
export function LastNotification ({factory, rows}:lastNotificationProps){
 
    return (
        <div>
             {rows.length ? <>{rows[0].tozihat}</>: <>SaDra</>}
        </div>
    )
}
