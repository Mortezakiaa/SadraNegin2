import React from 'react';
import { INotifResponse} from 'models/Notification/Search';
import { useHelmet} from 'utilities';
import { makeStyles } from '@material-ui/core';
import { HomeFactory } from 'models/Home';



interface homeProps{
    factory: HomeFactory;
    rows: INotifResponse[];
  }

function HomeContainer ({factory}:homeProps){
    let helmet = useHelmet(
        'SaDra  - Home | برنامه وب پیشرفته صدرا - خانه'
        , 'نمایش صفحه اصلی برنامه صدرا'
    );
    const classes = useStyles()
  

    return (
        <>
            {helmet}
            <div className={`${classes.homeContainer}`}>
                {/* <img src="	https://snpasargad.com/fa/wp-content/uploads/2021/04/about.jpg" alt="Sadra" /> */}
            </div>
        </>
    )
}

export default HomeContainer;

const useStyles = makeStyles((theme) => ({
    homeContainer: {
       display:'flex',
       width:'100%',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-start',

    
    }
}))