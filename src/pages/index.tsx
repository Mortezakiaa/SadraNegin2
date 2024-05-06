export type IPageTypes = 'home'
    | 'order'
    | 'orderList'
    | 'cash'
    | 'cashList'
    | 'rule'
    | 'insertNews'
    | 'viewNews'
    | 'repository'
    | 'notification'
    | 'notificationList'
    | 'StoreList'
    | 'DepotList'
    |'StoreSecond'




export const importPage = (page: IPageTypes): Promise<any> => {
    switch (page) {
        case 'home': return import('pages/home');
        case 'order': return import('pages/order');
        case 'orderList': return import('pages/orderList');
        case 'cash': return import('pages/cash');
        case 'rule': return import('pages/rule');
        case 'cashList': return import('pages/cashList');
        case 'repository': return import('pages/repository');
        case 'notification': return import('pages/notification');
        case 'notificationList': return import('pages/notificationList');
        case 'StoreList': return import('pages/store');
        case 'DepotList': return import('pages/Depot');
        case 'StoreSecond': return import('pages/storeSecond');


        default: return import('pages/home');
    }
}