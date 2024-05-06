import React from 'react';
import { FormControl, FormControlProps, makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { momentToDate } from 'models/Order';

interface SelfDatePickerWithoutFieldProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    label: string;
    props?: FormControlProps;
}

export function SelfDatePickerWithoutField({
    value,
    onChange,
    label,
    props: selfProps,
}: SelfDatePickerWithoutFieldProps) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} {...selfProps} >
            <DatePicker
                autoOk
                label={label}
                clearable
                margin='none'
                okLabel='تایید'
                cancelLabel='لغو'
                clearLabel='پاک کردن'
                inputVariant='outlined'
                orientation='landscape'
                labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
                value={value}
                onChange={(date) => onChange(momentToDate(date))}
            />
        </FormControl>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 50
    }
}))