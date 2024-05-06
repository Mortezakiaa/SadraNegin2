import React, { ReactNode, useState } from 'react';
import { Controller, Control, FieldName } from 'react-hook-form';
import { FormControl, FormControlProps, makeStyles, TextField } from '@material-ui/core';
import { IResponse, Model } from 'models';
import { Autocomplete, AutocompleteChangeReason } from '@material-ui/lab';
import { AxiosInstance } from 'axios';
import { IItemProps } from 'models';

type IInstance = { instance: AxiosInstance, address: string };
export type itemAddress = string | IInstance;
interface SelfAutoCompleteProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    itemAddress?: itemAddress;
    onChange?: (e: IItemProps | null) => void;
    defaultItems?: IItemProps[];
    children?: ReactNode;
    search?: boolean;
    props?: FormControlProps;
    rules?: any;
    required?: boolean;
    buttons?: any;
    disabled?: boolean;
    customLabel?: IItemProps | null;
}

export function SelfAutoComplete<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    itemAddress,
    onChange,
    defaultItems,
    children,
    search,
    props: selfProps,
    rules,
    required,
    buttons,
    disabled,
    customLabel,
}: SelfAutoCompleteProps<IM, M>) {
    const [items, setItems] = useState<IItemProps[]>(defaultItems ? defaultItems : []);
    const classes = useStyles();

    const onFocusHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!items.length && itemAddress) {
            if (typeof itemAddress === 'string') {
                mainState.apiSyncGet(itemAddress, mainState.empty())
                    .then(res => {setItems(res.data as any)
                    })
            } else {
                itemAddress.instance.get<any, IResponse<IItemProps[]>>(itemAddress.address, {})
                    .then(res => {setItems(res.data)})
                    .catch(err => mainState.trigger('error', err))
            }
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, newValue: IItemProps | null, reason: AutocompleteChangeReason, props: any) => {
        e.preventDefault();
        props.onChange(reason === 'clear' ? null : newValue);
        if (onChange) {
            onChange(newValue);
        }
    }

    const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (itemAddress) {
            if (typeof itemAddress === 'string') {
                mainState.apiSyncPost(itemAddress, null as any, {
                    filter: e.target.value
                })
                    .then(res => setItems(res.data))
            } else {
                itemAddress.instance.post<any, IResponse<IItemProps[]>>(itemAddress.address, null, {
                    params: {
                        filter: e.target.value
                    }
                })
                    .then(res => setItems(res.data))
                    .catch(err => mainState.trigger('error', err))
            }
        }
    }

    return (
        <Controller
            name={fieldName}
            render={(props) =>
                <FormControl className={`${buttons ? 'control-row' : ''} ${classes.formControl}`} {...selfProps} >
                    {buttons}
                    <Autocomplete
                        className={classes.container}
                        onFocus={onFocusHandler}
                        disabled={disabled || mainState.loading}
                        value={customLabel ? customLabel : props.value}
                        options={items}
                        getOptionLabel={option => `${option.code} - ${option.name}`}
                        getOptionSelected={(option, value) => option.code === value.code}
                        onChange={(e, newValue, reson) => onChangeHandler(e as any, newValue, reson, props)}
                        loading={!items.length}
                        renderInput={(param) => (
                            <>
                                <TextField
                                    {...param}
                                    onChange={search ? onSearchHandler : undefined as any}
                                    placeholder={label}
                                    variant='outlined'
                                    required={required || false}
                                    disabled={disabled ? true : param.disabled}
                                    size='medium'
                                />
                            </>
                        )}
                    />
                    {children}
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
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
}))
