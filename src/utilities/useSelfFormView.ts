import { useEffect } from 'react';
import { Model } from '../models';
import { useForceUpdate } from './useForceUpdate';
import { toast } from 'react-toastify';
import Sweet from 'sweetalert';
import { SelfToast } from '../components';

export const useSelfFormView = <IM, M extends Model<any, any>>(factory: M): [
    M,
] => {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        factory.on('change', () => {
            forceUpdate();
        });
        factory.on('waitLoading', () => {
            factory.loading = true;
            forceUpdate();
        });
        factory.on('wasLoaded', () => {
            factory.loading = false;
            forceUpdate();
        });

        // Toast
        factory.on('success', (message: string) => {
            factory.loading = false;
            toast.success(SelfToast({
                severity: 'success',
                message
            }));
            forceUpdate();
        });
        factory.on('error', (message: string) => {
            factory.loading = false;
            toast.error(SelfToast({
                severity: 'error',
                message
            }));
            forceUpdate();
        });
        factory.on('info', (message: string) => {
            factory.loading = false;
            toast.info(SelfToast({
                severity: 'info',
                message
            }));
            forceUpdate();
        });
        factory.on('warning', (message: string) => {
            factory.loading = false;
            toast.warn(SelfToast({
                severity: 'warning',
                message
            }));
            forceUpdate();
        });

        // Alert
        factory.on('confirm', (
            title: string,
            text: string,
            submit: (value: any) => void,
            cancel: (value: any) => void
        ) => {
            Sweet({
                title,
                text,
                icon: 'warning',
                buttons: ['صرفنظر', 'تایید'],
                dangerMode: true,
            })
                .then((value) => {
                    if (value) {
                        submit(value);
                    } else {
                        cancel(value);
                    }
                })
        })


        return () => {
            factory.removeOn('change');
            factory.removeOn('waitLoading');
            factory.removeOn('wasLoaded');
            factory.removeOn('success');
            factory.removeOn('error');
            factory.removeOn('info');
            factory.removeOn('warning');
            factory.removeOn('confirm');
        }
    }, [factory, forceUpdate]);


    return [factory];
}