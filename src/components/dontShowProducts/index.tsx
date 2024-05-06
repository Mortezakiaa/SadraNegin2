import React from 'react';
import { Model } from '../../models';
import { SelfDontShowProducts} from './list';


interface dontShowProductsBoxProps<IM, M extends Model<any, any>> {
    mainState: any;
    label: string;  
}

export function SelfDontShowProductsBox<IM, M extends Model<any, any>>({
    mainState,
}: dontShowProductsBoxProps<IM, M>) {

    return (
            <SelfDontShowProducts<any, any>
                mainState={mainState}/>
            )
}

