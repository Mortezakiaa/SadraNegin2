import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { HeadOfProductsFactory, IHeadOfProducts } from 'models/HeadOfProductsFactory';





interface FilterItemProps {
    item: IHeadOfProducts;
    disabled: boolean;
    factory: HeadOfProductsFactory
}

export const FilterItem = ({
    item,
    disabled,
    factory,
}: FilterItemProps) => {
    const classes = useStyles();


  
    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        factory.GoodGetAllChildern(item,true);
    }

    const selectedItem = factory.activeItem?.parent?.parent?.parent?.parent?.parent||
                         factory.activeItem?.parent?.parent?.parent?.parent||
                         factory.activeItem?.parent?.parent?.parent||
                         factory.activeItem?.parent?.parent||
                         factory.activeItem?.parent ||
                         factory.activeItem ||
                         null;

    const selectClass = selectedItem === item ? classes.selected : null ;
    const condition =item.picture === "" ? 
    <img src="http://dorinoco.com/new/wp-content/uploads/2018/12/coffee-table.png" alt="Coffee"/> 
    :<img  style={{width:"50px", height:"50px"}}  src={item.picture} alt={item.name} />
    
    

    return (
        <div className={`${selectClass}`}>
             <Grid  item container className={` ${classes.filter} ${disabled && 'disable'}`} onClick={onClickHandler} >
                {condition}
                <Grid item container className={classes.content} >
                    <Typography variant='overline' component='p' className={classes.name} >{item.name}</Typography>
                    {/* <Typography variant='overline' component='span'>{`${count} کالا`}</Typography> */}
                </Grid>
            </Grid>
        </div> )
}


const useStyles = makeStyles((theme) => ({
    filter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexGrow: 0,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, .2)',
        border: `1px solid ${grey[900]}`,
        margin: '3px .3rem',
        backgroundColor: grey[900],
        borderRadius: 5,
        cursor: 'pointer',
        maxWidth: '8rem',
        minWidth: '8rem',
        maxHeight: '3.6rem',
        minHeight: '3.6rem',
        overflow: 'hidden'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'nowrap',
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: theme.palette.getContrastText(grey[900])
    },
    name: {
        fontSize: 10,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    selected:{border:'1px solid #0017ff', borderRadius:'3px' }
    
}))
