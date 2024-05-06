import React from 'react';
import { FormControl, makeStyles, FormControlProps } from '@material-ui/core';

interface SelfLabelBoxProps {
    value: string;
    label: string;
    props?: FormControlProps;
}

export function SelfLabelBox({
    value,
    label,
    props: selfProps,
}: SelfLabelBoxProps) {
    const classes = useStyles();

    return (
        <FormControl fullWidth className={classes.formControl} {...selfProps} >
            <label className={classes.label} >
                <span>{label + ' :'}</span>
                <span>{value}</span>
            </label>
        </FormControl>
    )
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        margin: theme.spacing(1),
        Width: '15%',
    },
    label: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width:"100%",
        '& :first-child': {
            fontWeight: 'bold'
        }
    }
}))