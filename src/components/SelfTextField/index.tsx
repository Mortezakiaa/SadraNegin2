import React from 'react';
import { Controller, Control, DeepMap, FieldError, FieldName } from 'react-hook-form';
import { TextField, TextFieldProps } from '@material-ui/core';
import { Model } from 'models';

interface SelfTextFieldProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    errors: DeepMap<any, FieldError>;
    props?: TextFieldProps;
    rules?: any;
}

export function SelfTextField<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    errors,
    props,
    rules
}: SelfTextFieldProps<IM, M>) {
    const fieldError = errors[`${fieldName}`];
    return (
        <Controller
            name={fieldName}
            as={
                <TextField
                    disabled={mainState.loading}
                    variant="outlined"
                    margin="normal"
                    helperText={fieldError ? fieldError.message : null}
                    label={label}
                    error={fieldError}
                    {...props}
                />
            }
            control={control}
            {...rules}
        />
    )
}