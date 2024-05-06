import React, { ReactNode, useState } from 'react';
import { Controller, Control, FieldName } from 'react-hook-form';
import { Button, FormControl, FormControlProps, makeStyles, TextField } from '@material-ui/core';
import { Model } from 'models';
import { IItemByPictureProps as IHeadOfProducts } from 'models';
import { SelfModalList } from './list';
import { BackspaceOutlined, DnsOutlined } from '@material-ui/icons';

interface SelfListModalBoxProps<IM, M extends Model<any, any>> {
    mainState: M;
    fieldName: FieldName<M>;
    label: string;
    control: Control<any>;
    value: IHeadOfProducts | null;
    onChange: (e: IHeadOfProducts | null) => void;
    getItem: (code: string, setItem: (items: IHeadOfProducts[]) => void) => void;
    children?: ReactNode;
    props?: FormControlProps;
    rules?: any;
    controlProps?: any;
}

export function SelfListModalBox<IM, M extends Model<any, any>>({
    mainState,
    fieldName,
    label,
    control,
    value,
    onChange,
    getItem,
    children,
    props: selfProps,
    rules,
    controlProps,
}: SelfListModalBoxProps<IM, M>) {
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();

    const showModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);
    }

    const onClickItemHandler = (e: IHeadOfProducts | null) => {
        if (onChange) {
            onChange(e);
        }
        setOpen(false);
    }

    return (
        <Controller
            name={fieldName}
            render={(props) =>
                <FormControl className={classes.formControl} {...selfProps} >
                    <Button className={classes.button} onClick={showModal} >
                        <DnsOutlined color='inherit' />
                    </Button>
                    <TextField
                        disabled
                        fullWidth
                        // onChange={(e) => onChangeHandler(e, props)}
                        placeholder={label}
                        variant="outlined"
                        margin="normal"
                        label={value?.name}
                        {...props}
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}

                    />
                    {value &&
                        <Button className={classes.button} onClick={() => onClickItemHandler(null)} >
                            <BackspaceOutlined color='inherit' />
                        </Button>
                    }
                    <SelfModalList<IM, M>
                        mainState={mainState}
                        open={open}
                        setOpen={setOpen} 
                        onClick ={onClickItemHandler}
                    />
                    
                    {children}
                </FormControl>
            }
            control={control}
            {...controlProps}
            {...rules}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        flexDirection: 'row',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 50
    },
    button: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
}))