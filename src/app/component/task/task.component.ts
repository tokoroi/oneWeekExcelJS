import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  //親コンポーネントTask型オブジェクトを受け取る。
  @Input() task: Task | null = null;
  //出力を生成する。
  @Output() edit = new EventEmitter<Task>();
}
