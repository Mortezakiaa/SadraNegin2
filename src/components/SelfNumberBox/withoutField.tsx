import React from 'react';
import { FormControl, FormControlProps, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';

interface SelfNumberBoxWithoutFieldProps {
    value: number;
    onChange: (text: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    label?: string;
    props?: FormControlProps;
    thousandSeprator?: boolean;
    required?: boolean;
    disabled?: boolean;
    focused?: boolean;
}

export function SelfNumberBoxWithoutField({
    value,
    onChange,
    label,
    props: selfProps,
    thousandSeprator,
    required,
    disabled,
    focused,
}: SelfNumberBoxWithoutFieldProps) {
    const classes = useStyles();

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        if (thousandSeprator) {
            const newValue = parseInt(e.target.value.replace(/,/g, ''));
            if (!isNaN(newValue)) {
                onChange(newValue, e);
            } else {
                onChange(0, e);
            }
        } else {
            const number = +e.target.value;
            if (!isNaN(number)) {
                onChange(number, e);
            } else {
                onChange(0, e);
            }
        }
    }

    return (
        <FormControl focused={focused} className={classes.formControl} variant='outlined' {...selfProps} disabled={disabled} >
            {label ? <InputLabel htmlFor={`outlined-adornment-discount-${label}`}>{label}</InputLabel> : null}
            <OutlinedInput
                id={`outlined-adornment-discount-${label}`}
                type='text'
                autoComplete='off'
                value={thousandSeprator ? value.toLocaleString() : value.toString()}
                onChange={onChangeHandler}
                labelWidth={60}
                required={required}
                autoFocus={focused}
            />
        </FormControl>
    )
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50
    }
}))