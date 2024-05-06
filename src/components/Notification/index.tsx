import { makeStyles } from '@material-ui/core';
import { NotificationFactory } from 'models/Notification';
import React from 'react'
import {UploadFile} from './UploadFile/index' 




interface NotificationProps{
    factory:NotificationFactory
}


export function Notification({factory}:NotificationProps){

    const classes = useStyles();
  
    const result = 
    <div className={classes.container}>
         <UploadFile factory={factory} />  
    </div>
    return <>{result}</>   
}

   const useStyles = makeStyles((theme) => ({
        notifStyle : {
            width :'100%' ,
            height : '300px' ,
            borderRadius : '2px',
            display:' flex',
            flexDirection: 'column',
            justifyContent:' space-around',
            alignItems: 'center',
       },
       modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
       
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        borderRadius: '10px',
        width: '100%',
        maxWidth: 'calc(100vw - 10rem)',
        minWidth: 270,
        maxHeight: 'calc(100vh - 10rem)',
        overflow: 'hidden',
    },
    container:{
        display:'flex',
        flexDirection: 'column',
        width:'100%',
        padding:'20px'
    }
}))