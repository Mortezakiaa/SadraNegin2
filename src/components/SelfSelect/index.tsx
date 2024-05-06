import React, { useState } from 'react';
import { Controller, Control, FieldName, DeepMap, FieldError } from 'react-hook-form';
import { SelectProps, MenuItem, Select, CircularProgress } from '@material-ui/core';
import { IResponse, Model } from 'models';
import { AxiosInstance } from 'axios';
import { IItemProps } from 'models';

type IInstance = { instance: AxiosInstance, address: string };
type itemAddress = string | IInstance;
interface SelfSelectProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    errors: DeepMap<any, FieldError>;
    itemAddress: itemAddress;
    props?: SelectProps;
    rules?: any;
}

export function SelfSelect<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    errors,
    itemAddress,
    props: selfProps,
    rules
}: SelfSelectProps<IM, M>) {
    const [items, setItems] = useState<IItemProps[]>([]);
    const fieldError = errors[`${fieldName}`];

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        if (!items.length) {
            if (typeof itemAddress === 'string') {
                mainState.apiSyncPost(itemAddress, mainState.empty())
                    .then(res => setItems(res.data))
            } else {
                itemAddress.instance.post<any, IResponse<IItemProps[]>>(itemAddress.address)
                    .then(res => setItems(res.data))
                    .catch(err => mainState.trigger('error', err))
            }
        }
    }

    return (
        <Controller
            name={fieldName}
            render={props =>
                <>
                    <Select
                        disabled={mainState.loading}
                        onFocus={onFocusHandler}
                        onChange={e => props.onChange(e.target.value)}
                        label={label}
                        error={fieldError}
                        style={{
                            width: 300,
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 48 * 4.5 + 8,
                                    width: 250
                                }
                            }
                        }}
                        fullWidth
                        {...selfProps}
                    >
                        {items && items.length ?
                            items.map(item =>
                                <MenuItem key={item.code} value={item.code} >
                                    {item.name}
                                </MenuItem>
                            )
                            : <CircularProgress />}
                    </Select>
                </>
            }
            control={control}
            {...rules}
        />
    )
}