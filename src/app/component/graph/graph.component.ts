import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit{

  @ViewChild("graphCanvas", { static: true }) graphCanvas!: ElementRef;

  constructor() {
    // Chart.js の使用前に必要な登録
    Chart.register(...registerables);
  }

  ngOnInit() {
    // グラフの描画内容
    // X軸要素名
    const labels = ['〇', '◎', '✖'];
    // データ値
    const data = [10, 2, 15];
    // 棒グラフを描画
    const ctx = this.graphCanvas.nativeElement.getContext("2d");
    new Chart(ctx, {
      // bar型(棒グラフ)
      type: 'bar',
      data: {
        // X軸の要素名を設定
        labels: labels,
        datasets: [{
          label: 'Data',
          // データを設定
          data: data,
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
