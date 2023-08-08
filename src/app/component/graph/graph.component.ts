import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css', '../../../styles.css']
})
export class GraphComponent implements OnInit{

  @ViewChild("graphCanvas", { static: true }) graphCanvas!: ElementRef;
  // テンプレート内の #dataInput というローカル変数に対応する要素を取得して、それを dataInput というプロパティにバインド
  // テンプレート内の #dataInput という要素（この場合は入力フィールド）を TypeScript のコード内で参照できるように
  @ViewChild("dataInput", { static: true }) dataInput!: ElementRef<HTMLInputElement>;

  // X軸要素名
  labels:string[] = ['〇', '◎', '✖'];
  // データ初期値
  data: number[] = [];

  chart: Chart | undefined;

  inputData: string = '';

  constructor() {
    // Chart.js の使用前に必要な登録
    Chart.register(...registerables);
  }

  ngOnInit() {
    // グラフの描画処理呼び出し
    this.drawGraph();
  }

  // テキストボックスの値が変更された際の処理
  onInputChange(){
    this.data = this.inputData.split(",").map(Number);
    this.drawGraph();
  }

  // Excelファイルが選択された際の処理
  onFileChange(event: any) {
    const target = event?.target as HTMLInputElement;
    const file = target.files?.[0]

    if (file){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // dataにそれぞれのセルの値をセット
        this.data = [worksheet['A1']?.v || 0, worksheet["B1"]?.v || 0, worksheet["C1"]?.v || 0];
        // データを読み込めているかconsoleで確認
        console.log(this.data);
        // グラフの描画処理呼び出し
        this.drawGraph();
    };
    reader.readAsArrayBuffer(file);
    }
  }

  // グラフの描画処理
  drawGraph() {
    // データの更新処理
    const dataString: string = this.dataInput.nativeElement.value;
    const newData: number[] = dataString.split(",").map(Number);

    // 棒グラフを描画
    const ctx = this.graphCanvas.nativeElement.getContext("2d");

    if(this.chart){
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      // bar型(棒グラフ)
      type: 'bar',
      data: {
        // X軸の要素名を設定
        labels: this.labels,
        datasets: [{
          label: 'Data',
          // データを設定
          data: this.data,
          // 描画されるグラフの見た目を設定
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            // Y軸の最小値を0からにする処理
            beginAtZero: true
          }
        }
      }
    });
  }
}
