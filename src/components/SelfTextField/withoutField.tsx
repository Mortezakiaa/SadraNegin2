import React from 'react';
import { FormControl, InputLabel, makeStyles, OutlinedInput, FormControlProps } from '@material-ui/core';

interface SelfTextFieldWithoutFieldProps {
    value: string | undefined;
    onChange: (text: string, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    label?: string;
    props?: FormControlProps;
    required?: boolean;
    disabled?: boolean;
    focused?: boolean;
    className?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
}

export function SelfTextFieldWithoutField({
    value,
    onChange,
    label,
    props: selfProps,
    required,
    disabled,
    focused,
    className,
    inputRef,
}: SelfTextFieldWithoutFieldProps) {
    const classes = useStyles();

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        onChange(e.target.value, e);
    }

    return (
        <FormControl fullWidth focused={focused} className={`${classes.formControl} ${className ? className : ''}`} variant='outlined' {...selfProps} disabled={disabled} >
            {label ? <InputLabel htmlFor={`outlined-adornment-discount-${label}`}>{label}</InputLabel> : null}
            <OutlinedInput
                id={`outlined-adornment-discount-${label}`}
                className={classes.inputStyle}
                autoComplete='off'
                value={value}
                ref={inputRef}
                onChange={onChangeHandler}
                labelWidth={55}
                required={required}
                autoFocus={focused}
            />
        </FormControl>
    )
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
    },
    inputStyle: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft:'10px'
    }
}))