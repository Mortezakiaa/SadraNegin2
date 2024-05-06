import { useEffect } from 'react';
import { Model } from 'models';
import { useForceUpdate } from './useForceUpdate';
import { toast } from 'react-toastify';
import Sweet from 'sweetalert';
import { SelfToast } from 'components';
import { Control, DeepMap, DeepPartial, FieldError, FieldName, FieldValue, UnpackNestedValue, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from 'react-router-dom';

export const useSelfForm = <IM, M extends Model<any, any>, P = void>(factory: M): [
    M,
    Control<M>,
    (value: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    DeepMap<M, FieldError>,
    UnpackNestedValue<IM>,
    (name: FieldName<M>, value: boolean | UnpackNestedValue<DeepPartial<M>> | string[] | FieldValue<M> | null | undefined, options?: Partial<{ shouldValidate: boolean; shouldDirty: boolean; }> | undefined) => void,
    P
] => {
    const history = useHistory();
    const forceUpdate = useForceUpdate();
    const params: P = useParams<any>();
    const { control, handleSubmit, errors, watch, setValue } = useForm<any>({
        defaultValues: factory.getAll() as any,
        resolver: yupResolver(factory.schema)
    });

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

        // Redirect
        factory.on('quit', (path?: string) => {
            factory.loading = false;
            // history.replace(path ? path : '');
            if (path) {
                history.replace(path);
            }
            // forceUpdate();
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
            factory.removeOn('quit');
            factory.removeOn('success');
            factory.removeOn('error');
            factory.removeOn('info');
            factory.removeOn('warning');
            factory.removeOn('confirm');
        }
    }, [factory, history, forceUpdate]);

    const mainHandleSubmit = handleSubmit(factory.onValid, factory.onInvalid);
    return [factory, control, mainHandleSubmit, errors, watch() as any, setValue, params];
}
