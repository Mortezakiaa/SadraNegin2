import { saveAs } from 'file-saver';

export class UtilityFile {
    static blobExcel(data: any) {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob);
    }
    static blobPdf(data: any, filename: string = "report") {
        const blob = new Blob([data], { type: 'apllication/pdf' });
        saveAs(blob, filename + ".pdf");
    }
    static blobTxt(data: any, filename: string = "report") {
        const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename + ".txt");
    }
}