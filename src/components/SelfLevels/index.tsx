import React from 'react';
import { Grid} from '@material-ui/core';
import {Level} from './level'
import { makeStyles } from '@material-ui/core';
import { HeadOfProductsFactory } from '../../models/HeadOfProductsFactory';



interface SelfLevelsProps {
    factory:HeadOfProductsFactory  
}

export function SelfLevels({
    factory
   
}: SelfLevelsProps){ 

    const classes = useStyles();

    const level1:any = <Level factory={factory} exac={()=>factory.activeItem?.parent}/>
    const level2:any = <Level factory={factory} exac={()=>factory.activeItem?.parent?.parent }/>
    const level3:any = <Level factory={factory} exac={()=>factory.activeItem?.parent?.parent?.parent}/>
    const level4:any = <Level factory={factory} exac={()=>factory.activeItem?.parent?.parent?.parent?.parent}/>
    const level5:any = <Level factory={factory} exac={()=>factory.activeItem?.parent?.parent?.parent?.parent?.parent}/>


    return <Grid className={classes.levelsNav} item container >
                {level5}
                {level4}
                {level3}
                {level2}
                {level1}
            </Grid>

    }

    const useStyles = makeStyles((theme) => (
        {levelsNav :{
            display:'flex' ,
            alignItems: 'center',
            height: '40px',
            marginBottom: '5px',
            paddingRight: '15px',
        }} ))
 

            
            




