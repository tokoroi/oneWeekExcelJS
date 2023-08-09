import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { ExcelOutputService } from 'src/app/service/excel-outputService';
import { HomeComponent } from '../home/home.component';
import { DataService } from 'src/app/service/excel-dataService';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css', '../../../styles.css']
})
export class ImportComponent {

  // excel-dataService
  constructor(private dataService: DataService) {}

  // 読み込んだデータを格納する配列
  fileContent: any[][] = [];
  // 一番左の列のみ別の配列に格納する
  leftMostColumn: any[] = [];
  //
  editingCell: {row: number, col: number} = { row: -1, col: -1} ;
  //
  showSaveButton: boolean = false;
  // 編集中の値を保持する
  cellValues: any[][] = [];

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
    // 読み込んだデータをサービスに格納
    this.dataService.fileContent = this.fileContent;
    // 未入力セルにデフォルト値を設定
    const defaultCellValue = '　';
    for (const row of this.fileContent) {
      for (let col = 0; col < row.length; col++) {
        if (!row[col]) {
          row[col] = defaultCellValue;
        }
      }
    }

    // 一番左の列を別の配列に格納する処理を呼び出す
    this.extractLeftMostColumnData();
    // saveボタンを表示する
    this.showSaveButton = true;
    // 編集中の値をセルごとに初期化する
    this.cellValues = this.fileContent.map(row => [...row]);

  };
  // 読込対象(file)を非同期に読み込む
  reader.readAsArrayBuffer(file);
  }

  countMaru(): number {
    let maruCount = 0;
    for (const row of this.fileContent ) {
      for (const cell of row) {
        if (cell === '〇') {
          maruCount++;
        }
      }
    }
    return maruCount;
  }

  countDaiMaru(): number {
    let daiMaruCount = 0;
    for (const row of this.fileContent ) {
      for (const cell of row) {
        if (cell === '◎') {
          daiMaruCount++;
        }
      }
    }
    return daiMaruCount;
  }

  countbatsu(): number {
    let batsuCount = 0;
    for (const row of this.fileContent ) {
      for (const cell of row) {
        if (cell === '✖') {
          batsuCount++;
        }
      }
    }
    return batsuCount;
  }

  // セルの編集を行う処理
  startEditingCell(row: number, col: number) {
    this.editingCell = { row, col };
  }

  onCellEdit(row: number, col: number, value: any) {
    this.fileContent[row][col] = value;
  }  

  // セルの編集を終了する処理
  endEditingCell() {
    // 編集された値をfileContentに反映する
    this.fileContent[this.editingCell.row][this.editingCell.col] = this.cellValues[this.editingCell.row][this.editingCell.col];
    // 編集中の値がなくなるので中身をクリア
    this.cellValues[this.editingCell.row][this.editingCell.col] = null;
    this.editingCell = { row: -1, col: -1 };
  }

  // 編集した内容のExcelファイルを出力する処理(ExcelOutputService)を呼び出し
  saveToFile() {
    const fileName = 'oneWeekExcel.xlsx';
    ExcelOutputService.saveToFile(this.fileContent, fileName);
  }

  // 一番左の列(一意の値が入る予定)のみ別の配列に格納する処理
  extractLeftMostColumnData(){
    if (this.extractLeftMostColumnData.length === 0) {
      return;
    }
  }

}