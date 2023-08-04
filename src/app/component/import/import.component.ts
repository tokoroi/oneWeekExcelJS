import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

 // ファイルが選択された時のイベントハンドラ
onFileChange(event: any) {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  
  fileReader.onload = (e: any) => {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // データの取得などの処理を行う
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(data);
  };
  
  fileReader.readAsArrayBuffer(file);
}
}
