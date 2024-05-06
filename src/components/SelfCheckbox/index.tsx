import React from 'react';
import { Controller, Control, FieldName } from 'react-hook-form';
import { Checkbox, CheckboxProps, FormControlLabel } from '@material-ui/core';
import { Model } from 'models';

interface SelfCheckBoxProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    props?: CheckboxProps;
    rules?: any;
}

export function SelfCheckBox<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    props: selfProps,
    rules
}: SelfCheckBoxProps<IM, M>) {
    return (
        <Controller
            name={fieldName}
            render={props =>
                <FormControlLabel
                    control={
                        <Checkbox
                            disabled={mainState.loading}
                            onChange={e => props.onChange(e.target.checked)}
                            checked={props.value}
                            color="primary"
                            {...selfProps}
                        />
                    }
                    label={label}
                />
            }
            control={control}
            {...rules}
        />
    )
}