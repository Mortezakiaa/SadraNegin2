import React from 'react';
import { Controller, Control, DeepMap, FieldError, FieldName } from 'react-hook-form';
import { FormControl, FormControlProps, InputAdornment, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';
import { Model } from 'models';

interface SelfPercentBoxProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    errors: DeepMap<any, FieldError>;
    onChange?: (e: number | null) => void;
    props?: FormControlProps;
    rules?: any;
    required?: boolean;
}

export function SelfPercentBox<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    errors,
    onChange,
    props: selfProps,
    rules,
    required
}: SelfPercentBoxProps<IM, M>) {
    const classes = useStyles();
    const fieldError = errors[`${fieldName}`];

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, props: any) => {
        e.preventDefault();
        if ((!isNaN(+e.target.value) || e.target.value === '') && e.currentTarget.value.length <= 2) {
            props.onChange(e.target.value);
            if (onChange) {
                onChange(e.target.value as any);
            }
        } else return;
    }

    return (
        <Controller
            name={fieldName}
            render={(props) =>
                <FormControl className={classes.formControl} variant='outlined' {...selfProps} >
                    <InputLabel htmlFor={`outlined-adornment-discount-${fieldName}`}>{label}</InputLabel>
                    <OutlinedInput
                        disabled={mainState.loading}
                        id={`outlined-adornment-discount-${fieldName}`}
                        value={props.value}
                        onChange={(e) => onChangeHandler(e, props)}
                        startAdornment={<InputAdornment position='start' >%</InputAdornment>}
                        labelWidth={60}
                        error={fieldError}
                        required={required || false}
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
        minWidth: 70
    }
}))