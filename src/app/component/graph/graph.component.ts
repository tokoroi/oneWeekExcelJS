import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
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

  constructor() {
    // Chart.js の使用前に必要な登録
    Chart.register(...registerables);
  }

  ngOnInit() {
    // グラフの描画内容
    this.drawGraph();
  }

  drawGraph() {
    // データの更新処理
    const dataString: string = this.dataInput.nativeElement.value;
    const newData: number[] = dataString.split(",").map(Number);
    this.data = newData;

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
