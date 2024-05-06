import React from 'react';
import { FormControl, FormControlProps, InputAdornment, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';

interface SelfPercentBoxWithoutFieldProps {
    label?: string;
    value: number;
    onChange: (num: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    props?: FormControlProps;
    required?: boolean;
}

export function SelfPercentBoxWithoutField({
    label,
    value,
    onChange,
    onKeyDown,
    props: selfProps,
    required
}: SelfPercentBoxWithoutFieldProps) {
    const classes = useStyles();

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        if (!isNaN(+e.target.value) && e.currentTarget.value.length <= 2) {
            onChange(+e.target.value, e);
        } else return;
    }

    return (
        <FormControl className={classes.formControl} variant='outlined' {...selfProps} >
            {label ? <InputLabel htmlFor='outlined-adornment-discount'>{label}</InputLabel> : null}
            <OutlinedInput
                id='outlined-adornment-discount'
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyDown}
                startAdornment={<InputAdornment position='start' >%</InputAdornment>}
                labelWidth={60}
                required={required}
            />
        </FormControl>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 70
    }
}))