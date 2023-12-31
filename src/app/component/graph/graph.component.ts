import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";
import * as XLSX from 'xlsx';
import { InputDataService } from 'src/app/service/excel-inputService';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css', '../../../styles.css']
})
export class GraphComponent implements OnInit{

  // グラフを描画する領域をts側から参照できるように
  @ViewChild("graphCanvas", { static: true }) graphCanvas!: ElementRef;
  // テンプレート内の #dataInput というローカル変数に対応する要素を取得して、それを dataInput というプロパティにバインド
  // テンプレート内の #dataInput という要素（この場合は入力フィールド）を TypeScript のコード内で参照できるように
  @ViewChild("dataInput", { static: true }) dataInput!: ElementRef<HTMLInputElement>;

  // X軸要素名
  labels:string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
  // データ初期値(空)
  data: number[] = [];
  datamaru: number[] = [];
  databatsu: number[] = [];
  chart: Chart | undefined;

  inputData: string = '';

  constructor(private inputDataService: InputDataService) {
    // Chart.js の使用前に必要な登録
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Excelファイルを読み込んで集計した結果の値を持って来る
    const maruCount = this.inputDataService.maruCount;
    const daiMaruCount = this.inputDataService.daiMaruCount;
    const batsuCount = this.inputDataService.batsuCount;
    // デバッグ確認用
    console.log(maruCount);
    console.log(daiMaruCount);
    console.log(batsuCount);
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
        this.data = [worksheet['A1']?.v || 0, worksheet["B1"]?.v || 0, worksheet["C1"]?.v || 0, worksheet["D1"]?.v || 0, worksheet["E1"]?.v || 0, worksheet["F1"]?.v || 0, worksheet["G1"]?.v || 0, worksheet["H1"]?.v || 0, worksheet["I1"]?.v || 0, worksheet["J1"]?.v || 0, worksheet["K1"]?.v || 0, worksheet["L1"]?.v || 0];
        this.datamaru = [worksheet['A2']?.v || 0, worksheet["B2"]?.v || 0, worksheet["C2"]?.v || 0, worksheet["D2"]?.v || 0, worksheet["E2"]?.v || 0, worksheet["F2"]?.v || 0, worksheet["G2"]?.v || 0, worksheet["H2"]?.v || 0, worksheet["I2"]?.v || 0, worksheet["J2"]?.v || 0, worksheet["K2"]?.v || 0, worksheet["L2"]?.v || 0];
        this.databatsu = [worksheet['A3']?.v || 0, worksheet["B3"]?.v || 0, worksheet["C3"]?.v || 0, worksheet["D3"]?.v || 0, worksheet["E3"]?.v || 0, worksheet["F3"]?.v || 0, worksheet["G3"]?.v || 0, worksheet["H3"]?.v || 0, worksheet["I3"]?.v || 0, worksheet["J3"]?.v || 0, worksheet["K3"]?.v || 0, worksheet["L3"]?.v || 0];
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

    // 折れ線グラフを描画
    const ctx = this.graphCanvas.nativeElement.getContext("2d");

    if(this.chart){
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      // line型(折れ線グラフ)
      type: 'line',
      data: {
        // X軸の要素名を設定
        labels: this.labels,
        datasets: [{
          label: '◎',
          // データを設定
          data: this.data,
          // 描画されるグラフの見た目を設定
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        },
        {
          label: '〇',
          // データを設定
          data: this.datamaru,
          // 描画されるグラフの見た目を設定
          borderColor: 'rgba(0, 255, 0, 1)',
          fill: false
        },
        {
          label: '✖',
          // データを設定
          data: this.databatsu,
          // 描画されるグラフの見た目を設定
          borderColor: 'rgba(255, 0, 0, 1)',
          fill: false
        }
    ]
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
