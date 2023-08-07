import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  // 読み込んだデータを格納する配列
  fileContent: any[] = [];
  //
  editingCell: {row: number, col: number} = { row: -1, col: -1} ;
  //
  showSaveButton: boolean = false;

 // ファイルが選択された時のイベントハンドラ
onFileChange(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  // Excelファイル読込処理
  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    // Excelファイル読込
    const workbook = XLSX.read(data, { type: 'array' });
    // シート名を取得
    const sheetName = workbook.SheetNames[0];
    // 取得したシート名の中身を取得
    const worksheet = workbook.Sheets[sheetName];
    // json形式に変換
    this.fileContent = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // saveボタンを表示する
    this.showSaveButton = true;
  };
  // 読込対象(file)を非同期に読み込む
  reader.readAsArrayBuffer(file);
  }

  // セルの編集を行う処理
  startEditingCell(row: number, col: number) {
    this.editingCell = { row, col };
  }

  // セルの編集を終了する処理
  endEditingCell() {
    this.editingCell = { row: -1, col: -1 };
  }



  saveToFile() {

    // 新しいworkbookを作成
    const newWorkbook: XLSX.WorkBook =XLSX.utils.book_new();
    // 新しいシートを作成し編集したデータをセルに配置する
    const newWorksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.fileContent);
    // workbookにシートを追加
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    // worksheetをExcelファイルに変換して保存
    const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // ダウンロード
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = URL.createObjectURL(data);
    // ファイル名
    a.download = "oneWeekExcelJS.xlsx";
    a.click();
  }
}