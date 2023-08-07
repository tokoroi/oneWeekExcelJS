import * as XLSX from 'xlsx';

export class ExcelOutputService {
    static saveToFile(data: any[][], fileName: string): void {
        // 新しいworkbookを作成
        const newWorkbook: XLSX.WorkBook =XLSX.utils.book_new();
        // 新しいシートを作成し編集したデータをセルに配置する
        const newWorksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        // workbookにシートを追加
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
        // worksheetをExcelファイルに変換して保存
        const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // ダウンロード
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}