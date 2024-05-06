import { MainStateManager, PrintableProps } from "models/MainStateManager";
import Footer from 'assets/print/footer.jpg';
import Logo from 'assets/print/logo.jpg';
import PrintJS from 'print-js';
import { IRowDetailsLinesProps } from "models/Order/Search";
import { codeAnbar } from 'models/Order';

export const afterSuccessPrint = (mainStateManager: MainStateManager) => {
    const style = generateStyle();
    PrintJS({
        printable: generateBody(mainStateManager.printable),
        type: 'raw-html',
        style: style,
    });
    mainStateManager.resetPrintable();
}

const generateBody = (values: PrintableProps) => {
    return `
        <html>
            <head>
                <title></title>
            </head>
            <body dir="rtl" >
                ${generateHeader(values)}
                ${orderTable(values)}
                ${generateFooter(values)}
            </body>
        </html>
    `
}
const generateHeader = (values: PrintableProps) => {
    const warehouse = codeAnbar.find(i => +i.code === values.codeAnbar);
    return `
        <div class='report-head'>
            <div class='content'>
                <div class='text-head' >
                    <span>به نام او که هستی را آفرید</span>
                    <span>سفارش انجام قرارداد</span>
                    <span>انبار: ${warehouse && warehouse.name ? `${values.codeAnbar} - ${warehouse.name}` : ''}</span>
                </div>
                <div class='report-info-content'>
                    <div>
                        <p class='maximal' >سفارش دهنده : ${values.customerName.length ? values.customerName : '.........................................................................................................................'}</p>
                        <p class='minimal' >تلفن : ${values.customerTel1.length ? values.customerTel1 : '........................................'}</p>
                        <p class='minimal' >همراه : ${values.customerMobile1.length ? values.customerMobile1 : '........................................'}</p>
                    </div>
                    <div>
                        <span>نشانی کامل : ${values.customerAddress1.length ? values.customerAddress1 : '...................................................................................................................................................................................................................................'}</span>
                    </div>
                    <div>
                        <p class='minimal' >سفارش گیرنده : ${values.sharh && values.sharh.length ? values.sharh : '............................'}</p>
                        <p class='minmax' >نماینده فروش فروشگاه صدرا شعبه : ${values.nameFaktorType && values.nameFaktorType.length ? values.nameFaktorType.replace('پیش فاکتور فروش', '') : '.............................................'}</p>
                        <p class='mini' >تاریخ ثبت : ${values.date1.length ? values.date1 : '...........................'}</p>
                        <p class='mini' >شماره سیستم : ${values.num1 && values.num1 > 0 ? values.num1 : '....................'}</p>
                    </div>
                    <div>
                        <p>توضیحات : ${values.tozihat && values.tozihat.length ? values.tozihat : ''}</p>
                    </div>
                </div>
            </div>
            <img src=${Logo} alt='logo' width='170' />
        </div>
    `;
}
const generateFooter = (values: PrintableProps) => {
    const { discount, finalAmount, remainingAmount, paidAmount } = values;
    const finalDiscount = discount && discount > 0 ? discount : 0;
    const finallAmount = finalAmount && finalAmount > 0 ? finalAmount : (values.amount - finalDiscount);
    const remainiingAmount = remainingAmount && remainingAmount > 0 ? remainingAmount : (finallAmount - paidAmount);
    return `
        <div class='report-footer'>
            <div class='description' >
                <b>شرایط اجرای قرارداد : </b>
                <span>1. ارسال کالا طی 72 ساعت پس از تسویه کامل مبلغ فاکتور و ارائه تصویر رسید واریز به شماره تماس پیگیری ارسال کالا مندرج در قرارداد، انجام خواهد شد. ملاک تاریخ تحویل کالا صرفاً از تاریخ ارائه رسید می باشد و در صورت تاخیر در واریز وجوه تسویه، تحویل کالا در الویت های بعدی ارسال قرار خواهد گرفت.</span>
                <span>2. با توجه به اینکه کالای سفارش قرارداد بنا به سلیقه مشتری ساخته می شود، طبق همین قرارداد مورد توافق طرفین، کالا به هیچ عنوان تعویض و یا پس گرفته نمی شود.</span>
                <span>3. فسخ این قرارداد از طرف سفارش دهنده نهایتاً تا 48 ساعت از زمان صدور آن امکان ‌پذیر بوده و با کسر 35٪ از کل مبلغ قرارداد به عنوان خسارت، الباقی مبلغ سفارش ظرف 72 ساعت کاری مسترد می گردد. شماره حساب ارائه شده جهت عودت وجه نیز باید به نام سفارش دهنده باشد.</span>
                <span>4. تحویل کالا و برگه ضمانت کالا در مناطق 22 گانه شهر تهران درب منزل مشتری انجام میگردد . تحویل کالا به مشتریان شهرستانهای استان تهران و دیگر شهرستانها توسط موسسات باربری انجام میپذیرد که هزینه آن طبق تعرفه باربری ( مبلغ کرایه + بیمه ) بعهده مشتری میباشد . زمان تحویل کالا به مشتری زمان تحویل به باربری بوده و مسئولیت تحویل کالا از باربری بعهده مشتری میباشد . در صورت تمایل مشتری به تحویل کالا از درب انبار کارخانه یا فروشگاه ها یا باربری، مسئولیت سلامت کالا از درب انبار به عهده ی مشتری یا نماینده ایشان می باشد، و مسئولیت آسیب دیدگی احتمالی کالاها، بعهده ی دُرینو نمی باشد.</span>
                <span>5. مسئولیت مجموعه صدرا طبق مفاد ضمانتنامه مشخص شده است و فراتر از آن نیست.</span>
                <span>6. در صورت تحویل کالا بدون تسویه کامل به سفارش دهنده ویا اشتباه در نوع و تعداد سفارش ، کالاها تا زمان عودت به سفارش گیرنده، در حکم امانت نزد سفارش دهنده میباشد.</span>
                <span>7. مسئولیت واریز مبلغ تسویه به غیر از شماره حساب و کارت مندرج در همین قرارداد متوجه سفارش دهنده بوده و مجموعه دُرینو مسئولیتی ندارد، مگر با اطلاع قبلی دُرینو، که به صورت مکتوب به مشتری (سفارش دهنده) شماره حساب دیگری جهت واریز وجوه اعلام شود.</span>
                <span>سفارش گیرنده و سفارش دهنده با مطالعه و تایید شرایط فوق و اطلاع از کم و کیف کالاهاو خدمات و ضمانتنامه و شرح کالاها (در صورت وجود نقشه با تایید نقشه ) با توجه به ماده ده قانون مدنی این قرارداد را جهت انجام سفارش توسط صدرا تایید مینمایند.</span>
                <b>اطلاعات حساب جهت پرداخت وجه غیر حضوری : </b>
                <div class='signature' >
                    <div>
                        <span>شماره کارت : <b dir='ltr' >6273-8110-4554-5511</b></span>
                        <span>شماره حساب : <b dir='ltr' >1855-802-8711145-1</b></span>
                        <span>شماره شبا : <b>IR840630185580208711145001</b></span>
                        <span><b>بانک انصار به نام حسین احدی</b></span>
                    </div>
                    <div>
                        <span>قرارداد و شرایط آن مورد تایید است</span>
                        <div>
                            <br />
                            <span>امضای سفارش گیرنده : </span>
                            <span>امضای سفارش دهنده : </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class='info' >
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>${values.amount.toLocaleString()}</td>
                                <td>جمع کالا</td>
                            </tr>
                            <tr>
                                <td>${finalDiscount.toLocaleString()}</td>
                                <td>کسورات</td>
                            </tr>
                            <tr>
                                <td>${finallAmount.toLocaleString()}</td>
                                <td>خالص پرداختی</td>
                            </tr>
                            <tr>
                                <td>${values.paidAmount.toLocaleString()}</td>
                                <td>پیش پرداخت</td>
                            </tr>
                            <tr>
                                <td>${remainiingAmount.toLocaleString()}</td>
                                <td>باقیمانده حساب</td>
                            </tr>
                        </tbody>
                        <colgroup>
                            <col class='info-resault' />
                            <col class='info-text' />
                        </colgroup>
                    </table>
                </div>
                <div>
                    <br />
                    <span><b>تاریخ تحویل : </b>${values.date2 && values.date2.length ? values.date2 : '............................'}</span>
                    <span>محل تحویل : ............................</span>
                    <span>توجه  : الحاقی پشت صفحه نقشه های فنی</span>
                    <span>سفارش : <b>دارد <input type='checkbox' /></b><b>ندارد <input type='checkbox' /></b></span>
                    <span><b>نحوه پرداخت:</b><b>نقدی <input type='checkbox' /></b><b>پوز <input type='checkbox' /></b><b>اینترنت <input type='checkbox' /></b></span>
                </div>
                <img src=${Footer} alt='footer' width='430' height='170' />
            </div>
        </div>
    `
}
const orderTable = (values: PrintableProps) => {
    const lines = values.lines.map((row, index) => line(row, index));
    return `
        <table class='main-table' width='1060' >
            <thead>
                <tr>
                    <th>ردیف</th>
                    <th>عکس</th>
                    <th>نام کالا</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>درصد تخفیف</th>
                    <th>مبلغ تخفیف</th>
                    <th>جمع</th>
                    <th>توضیحات تکمیلی</th>
                </tr>
            </thead>
            <tbody>
                ${lines}
            </tbody>
            <colgroup>
                <col class='id' />
                <col class='code' />
                <col class='name' />
                <col class='count' />
                <col class='fee' />
                <col class='discount-percent' />
                <col class='discount-amount' />
                <col class='sum' />
                <col class='tozihat-section' />
            </colgroup>
        </table>
    `
}
const line = (row: IRowDetailsLinesProps, index: number) => {
    return `
    <tr>
        <td>${index + 1}</td>
        <td>${row.nameKala}</td>
        <td>${row.count?row.count.toLocaleString():null}</td>
        <td>${row.fee.toLocaleString()}</td>
        <td>${row.discountPercent && row.discountPercent > 0 ? `${row.discountPercent}%` : ''}</td>
        <td>${row.discount.toLocaleString()}</td>
        <td>${row.finalAmount.toLocaleString()}</td>
        <td>${row.tozihat && row.tozihat.length ? row.tozihat : ''}</td>
    </tr>
    `
}
const generateStyle = () => `
    body {
        direction: rtl;
    }
    .row {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-basis: 50%;
        line-height: 1.7rem;
    }
    .row b {
        min-width: 7rem;
        text-align: end;
    }
    .row span {
        margin-inline-start: .5rem;
    }
    .container {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-wrap: wrap;
    }
    @page {
        padding: .4cm;
        margin: none;
        size: landscape;
    }
    @media print {
        col.id {
            width: 10px;
        }
        col.code {
            width: 120px;
        }
        col.name {
            width: 120px;
        }
        col.tozihat {
            width: 130px;
        }
        col.tarh {
            width: 120px;
        }
        col.count {
            width: 10px;
        }
        col.fee {
            width: 85px;
        }
        col.section {
            width: 120px;
        }
        col.info-resault {
            width: 113px;
        }
        col.info-text {
            width: 100px;
            text-align: start;
        }
        .report-footer {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: nowrap;
            width: 1090px;
            margin-top: 2px;
            height: 350px;
            page-break-inside: avoid;
        }
        .report-footer > .description {
            display: flex;
            flex-direction: column;
            flex-basis: 645px;
            font-size: 10px;
            font-family: tahoma;
            height: 350px;
        }
        .report-footer > .description > .signature {
            display: flex;
            flex-direction: row;
        }
        .report-footer > .description > .signature > div {
            display: flex;
            flex-direction: column;
        }
        .report-footer > .description > .signature > div:last-child {
            flex-direction: column;
            margin-inline-start: 60px;
        }
        .report-footer > .description > .signature > div:last-child > div > span:last-child {
            margin-inline-start: 80px;
        }
        .report-footer > .description b {
            margin: 3px 0;
        }
        .report-footer span > b {
            color: #D10E00;
            font-weight: normal;
        }
        .report-footer > .info {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-basis: 455px;
            flex-wrap: wrap;
            font-family: tahoma;
            font-size: 11px;
        }
        .report-footer > .info > img {
            margin-top: 5px;
        }
        .report-footer > .info > div {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex-basis: 50%;
        }
        .report-footer > .info > div > span {
            margin: 3px 0;
        }
        .report-footer > .info > div > table {
            border: none !important;
            font-size: 12px;
            font-family: Tahoma;
        }
        .report-footer > .info > div > table tbody tr {
            height: 1.7rem;
        }
        .report-footer > .info > div > table tr :first-child {
            border: 1px solid black;
        }
        .report-footer > .info > div > table tr :last-child {
            padding-inline-start: 5px;
            text-align: start;
        }
        td {
            font-family: Tahoma;
            text-align: center;
        }
        button {
            display: none;
        }
        table {
            border-collapse: collapse;
        }
        .main-table {
            border: 1px solid black;
            font-size: 12px;
            font-family: Tahoma;
        }
        .main-table thead {
            display: table-header-group;
        }
        .main-table thead tr {
            height: 2rem;
            background: black;
            border-bottom: 4px double black;
            color: white;
        }
        .main-table thead tr th:not(:last-child) {
            border-inline-end: 1px solid white;
        }
        .main-table tbody tr td:not(:last-child) {
            border-inline-end: 1px solid black;
        }
        .main-table tbody tr {
            height: 2rem;
            border-bottom: 1px solid rgba(0, 0, 0, .5);
        }
        .main-table table.crop-end tbody tr:nth-child(even) {
            background: rgba(0, 0, 0, .2);
        }
        .main-table tfoot {
            display: table-header-group;
        }
        .main-table tfoot tr {
            height: 4rem;
            border-top: 4px double black;
        }
        .report-head {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: nowrap;
            width: 1090px;
            font-size: 12px;
            font-family: Tahoma;
        }
        .content {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            flex-basis: 930px;
        }
        .content span {
            line-height: 2rem;
        }
        .text-head span:nth-child(2) {
            margin-inline-start: 20rem;
            margin-inline-end: 6rem;
            font-size: 14px;
            font-weight: bold;
        }
        .maximal {
            display: inline-block;
            width: 500px;
        }
        .minimal {
            display: inline-block;
            width: 200px;
        }
        .mini {
            display: inline-block;
            width: 170px;
        }
        .minmax {
            display: inline-block;
            width: 350px;
        }
        .regular {
            display: inline-block;
            width: 350px;
        }
    }
`;