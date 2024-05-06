import React from 'react';
import { Model } from 'models';
import { SelfBackDrop } from 'components/Backdrop';
import { SelfSubmit } from './submit';
import { ToastContainer } from 'react-toastify';

interface SelfFormProps<M> {
    mainState: M;
    onSubmit?: (value: any) => Promise<void>;
    title?: string;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    customText?: string;
}

export function SelfForm<IM, M extends Model<any, any>>({
    mainState,
    onSubmit,
    title,
    className,
    disabled,
    children,
    customText,
}: SelfFormProps<M>) {
    return (
        <form className={`self-form ${className ? className : ''}`} onSubmit={!disabled ? onSubmit : undefined} autoComplete='off' >
            <fieldset disabled={mainState.loading || disabled} >
                {title ? <legend>{title}</legend> : null}
                {children}
                {onSubmit ? <SelfSubmit disabled={mainState.loading || disabled} custom={customText} /> : null}
            </fieldset>
            {mainState.loading && <SelfBackDrop show progress />}
            <ToastContainer
                position='top-right'
                autoClose={5000}
                pauseOnHover
                draggable
                closeOnClick
                newestOnTop
            />
        </form>
    )
}