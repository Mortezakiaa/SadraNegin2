import React from 'react';
import { Container } from '@material-ui/core';
import {  SelfForm } from '../../components';
import { useHelmet, useSelfForm } from '../../utilities';
import { Depot, IItemDepotProps } from '../../models/Depot';

interface RuleContainerProps {
    factory: Depot;
}

const RuleContainer: React.FC<RuleContainerProps> = ({
    factory,
}) => {
    const [mainState] = useSelfForm<IItemDepotProps, Depot>(factory);
    let helmet = useHelmet(
        'صدرا - List | برنامه وب پیشرفته صدرا - موجودی انبار صدرا'
        , 'نمایش لیست دسترسی کاربران'
    );

    return (
        <>
            {helmet}
            <Container className='self-container'>
                <SelfForm<IItemDepotProps, Depot> mainState={mainState} title='موجودی انبار پرفیوم صدرا' >
                
                <div className="flexStyleAll">

                    <div className="bigStyle">
                        <div className="mediumStyle" >
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                        </div>
                        <div className="titrStyle" ></div>
                        <div className="" ></div>
                    </div>

                    <div className="bigStyle">
                    <div className="mediumStyle" >
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                        </div>                    </div>
                    <div className="bigStyle">
                    <div className="mediumStyle" >
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                        </div>                    </div>
                    <div className="bigStyle">
                    <div className="mediumStyle" >
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                        </div>                    </div>
                    <div className="bigStyle">
                    <div className="mediumStyle" >
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                            <div className="smallGrid" ></div>
                        </div>                    </div>

                </div>

                </SelfForm>
            </Container>
            
        </>
    )
}

export default RuleContainer;


// const columns = [{
//     dataField: 'type',
//     text: ' نوع '
//   }, {
//     dataField: 'color',
//     text: ' رنگ'
//   }, {
//     dataField: 'num',
//     text: ' تعداد'
//   }];
  

// const data: IItemDepotProps[] = [
//     {
//         name: ' دهانه 28',
//         type: 11,
//         color: 'شفاف',
//         num: 750,
//     },
//     {
//         name: ' دهانه 28',
//         type: 14,
//         color: 'ش کوتاه',
//         num: 75,
//     },
//     {
//         name: ' دهانه 28',
//         type: 14,
//         color: ' ش بلند',
//         num: -10,
//     },
//     {
//         name: ' دهانه 28',
//         type: 14,
//         color: 'سفید بلند',
//         num: 0,
//     },
//     {        
//         name: ' دهانه 28',
//         type: 14,
//         color: 'سفید کوتاه',
//         num: 0,
//     },
//     {
//         name: ' دهانه 28',
//         type: 15,
//         color: 'شفاف',
//         num: -100,
//     },
//     {
//         name: ' دهانه 28',
//         type: 17,
//         color: 'شفاف',
//         num: -27,
//     },
//     {
//         name: ' دهانه 28',
//         type: 17,
//         color: 'سفید',
//         num: 0,
//     },
//     {
//         name: ' دهانه 28',
//         type: 19,
//         color: 'شفاف',
//         num: 52,
//     },
//     {
//         name: ' دهانه 28',
//         type: 21,
//         color: 'شفاف',
//         num: -350,
//     },
//     {
//         name: ' دهانه 28',
//         type: 23,
//         color: 'شفاف',
//         num: -134,
//     },
//     {
//         name: ' دهانه 28',
//         type: 23,
//         color: 'سفید',
//         num: 0,
//     },
//     {
//         name: ' دهانه 28',
//         type: 25,
//         color: 'شفاف',
//         num: 552,
//     },
//     {
//         name: ' دهانه 28',
//         type: 26.5,
//         color: 'شفاف',
//         num: 15,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 86,
//         color: 'شفاف',
//         num: 0,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 96,
//         color: 'شفاف',
//         num: 0,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 112,
//         color: 'شفاف',
//         num: 89,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 130,
//         color: 'شفاف',
//         num: 109,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 235,
//         color: 'شفاف',
//         num: 124,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 275,
//         color: 'شفاف',
//         num: 161,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 96,
//         color: 'صورتی',
//         num: 9,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 31,
//         color: 'شفاف',
//         num: 372,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 31,
//         color: 'زرد شیشه ای',
//         num: 12,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 31,
//         color: 'سبز',
//         num: 20,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 31,
//         color: 'بنفش',
//         num: 44,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 31,
//         color: 'قرمز',
//         num: 129,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 31,
//         color: 'زرد *',
//         num: 1,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 33,
//         color: 'شفاف',
//         num: -131,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 33,
//         color: 'سفید',
//         num: 105,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 36,
//         color: 'شفاف',
//         num: 451,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 36,
//         color: 'سبز',
//         num: 0,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 36,
//         color: 'بنفش',
//         num: 0,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 36,
//         color: 'مشکی',
//         num: 0,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 41,
//         color: 'شفاف',
//         num: 0,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 41,
//         color: 'شفاف',
//         num: 76,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 45,
//         color: 'شفاف',
//         num: -1.047,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 45,
//         color: 'نقره ای',
//         num: -125,
//     },
//     {
//         name: ' دهانه 120 جار',
//         type: 45,
//         color: 'سفید',
//         num: -125,
//     },
//     {
//         name: ' دهانه 62 جار',
//         type: 43,
//         color: 'شفاف',
//         num: 21,
//     },
//     {
//         name: ' دهانه 62 جار',
//         type: 21,
//         color: 'سفید',
//         num: -1.047,
//     },
//     {
//         name: ' دهانه 62 جار',
//         type: 45,
//         color: 'بنفش',
//         num: 250,
//     },
// ];