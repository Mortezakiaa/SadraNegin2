import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { HeadOfProductsFactory, IHeadOfProducts } from 'models/HeadOfProductsFactory';

interface SelfListItemProps {
    factory:HeadOfProductsFactory;
    title: string;
    img?: string;
    onClick?: () => void;
    style?: CSSProperties;
    item:IHeadOfProducts
}

export const SelfListItem: React.FC<SelfListItemProps> = ({
    title,
    img,
    onClick,
    style,
    factory,
    item
}) => {

    const classes = useStyles();
    const finalStyle = factory.finalItem === item ?  classes.finalItemStyle : ''


    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        }
    }
    return (
        <Card className={`${classes.root} ${finalStyle} self-card`}  onClick={onClickHandler} >
            {img && img.length ? <CardActionArea>
                <CardMedia className={classes.media} image={img} title={title} />
            </CardActionArea> : null}
            <CardContent>
                <Typography
                    gutterBottom
                    variant='subtitle2'
                    component='p'
                    className={classes.type}
                >
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: 222,
        // maxHeight: 222,
        margin: theme.spacing(1)
    },
    media: {
        height: 140
    },
    type: {
        overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap'
    },
    finalItemStyle:{
        border:'2px solid #1a237e'
    }
}))




