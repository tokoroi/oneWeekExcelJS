import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  // 読み込んだデータを格納する配列
  data: any[] = [];
  // ヘッダー(1行目)
  headers: string[] = [];

 // ファイルが選択された時のイベントハンドラ
onFileChange(event: any) {
  const file = event.target.files[0];
  this.readExcel(file);
}
  // Excelファイル読込処理
  readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      // Excelファイル読込
      const workbook = XLSX.read(data, { type: 'array' });
      // シート名を取得
      const sheetName = workbook.SheetNames[0];
      // 取得したシート名の中身を取得
      const worksheet = workbook.Sheets[sheetName];
      // json形式に変換
      this.data = XLSX.utils.sheet_to_json(worksheet, {header: 1 });
      // ヘッダー行の取得
      this.headers = this.data[0];
      // 中身からはヘッダー行を削除する
      this.data.shift();
    };
    // ファイルの内容を一時的にメモリに保存する(バッファーとして読み込む)
    reader.readAsArrayBuffer(file);
  }

}
