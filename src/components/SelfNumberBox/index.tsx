import React from 'react';
import { Controller, Control, DeepMap, FieldError, FieldName } from 'react-hook-form';
import { FormControl, FormControlProps } from '@material-ui/core';
import { Model } from 'models';

interface SelfNumberBoxProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    errors: DeepMap<any, FieldError>;
    thousandSeparator?: boolean;
    onChange?: (e: number | null) => void;
    props?: FormControlProps;
    rules?: any;
    controlProps?: any;
    required?: boolean;
}

export function SelfNumberBox<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    errors,
    thousandSeparator,
    onChange,
    props: selfProps,
    rules,
    controlProps,
    required,
}: SelfNumberBoxProps<IM, M>) {
    const fieldError = errors[`${fieldName}`];

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, props: any) => {
        e.preventDefault();
        const number = String(e.target.value).replace(/,/g, '');
        if (!isNaN(+number)) {
            if (+number >= 0) {
                props.onChange(+number);
                if (onChange) {
                    onChange(+number);
                    console.log('OnChange Exist!');
                }
            } else {
                props.onChange('');
                if (onChange) {
                    onChange(null);
                }
            }
        }
    }

    return (
        <Controller
            name={fieldName}
            render={(props) =>
                <SubFormControl
                    fieldName={fieldName}
                    thousandSeparator={thousandSeparator}
                    onChangeHandler={onChangeHandler}
                    required={required}
                    selfProps={selfProps}
                    props={props}
                    fieldError={fieldError}
                    mainState={mainState}
                    label={label}
                />
            }
            control={control}
            defaultValue={controlProps ? controlProps.defaultValue : ''}
            {...controlProps}
            {...rules}
        />
    )
}

const SubFormControl: React.FC<{
    mainState: any;
    fieldName: FieldName<any>;
    props: any;
    selfProps: any;
    onChangeHandler: any;
    thousandSeparator: any;
    required: any;
    fieldError: any;
    label: any;

}> = ({ mainState,
    fieldName,
    thousandSeparator,
    onChangeHandler,
    required,
    selfProps,
    props,
    fieldError,
    label,
}) => {

        const merged = {
            ...props,
            ...selfProps
        }

        return (
            <FormControl className='self-number-box-wrapper' {...merged} >
                <label htmlFor={`temp-${fieldName}`} className={`self-number-box-label ${props.value ? 'by-value' : ''}`} >{required ? '*' : null}{label}</label>
                <input
                    id={`temp-${fieldName}`}
                    type='tel'
                    className='self-number-box'
                    disabled={mainState.loading}
                    onChange={(e) => onChangeHandler(e, props)}
                    value={thousandSeparator ? props.value.toLocaleString() : props.value}
                    required={required || false}
                />
                <span>{fieldError && fieldError.message}</span>
            </FormControl>
        );
    }
