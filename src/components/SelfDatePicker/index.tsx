import React from 'react';
import { Controller, Control, FieldName } from 'react-hook-form';
import { FormControl, FormControlProps, makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Model } from 'models';

interface SelfDatePickerProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    props?: FormControlProps;
    rules?: any;
}

export function SelfDatePicker<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    props: selfProps,
    rules,
}: SelfDatePickerProps<IM, M>) {
    const classes = useStyles();

    return (
        <Controller
            style={{display:"flex", flexDirection:'column'}}
            name={fieldName}
            render={(props) =>
                <FormControl className={classes.formControl} {...selfProps} >
                    <DatePicker
                        autoOk
                        label={label}
                        clearable
                        margin='normal'
                        okLabel='تایید'
                        cancelLabel='لغو'
                        clearLabel='پاک کردن'
                        inputVariant='outlined'
                        orientation='landscape'
                        labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
                        value={props.value}
                        onChange={props.onChange}
                     
                    />
                </FormControl>
            }
            control={control}
            {...rules}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 50
    },
 
}))