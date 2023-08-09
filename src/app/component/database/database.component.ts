import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/component/task/task';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop,transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from 'src/app/component/task-dialog/task-dialog.component';
import { TaskDialogResult } from 'src/app/component/task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { style } from '@angular/animations';
import { toArray } from 'rxjs/operators';
import { DataService } from 'src/app/service/excel-dataService';
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css', '../../../styles.css']
})
export class DatabaseComponent implements OnInit{
  i!:number;
  tasks$?: Observable<any[]>; 
  constructor(private dialog: MatDialog, private store: AngularFirestore, private dataService: DataService) {}
  ngOnInit(): void {
    const fileContent = this.dataService.fileContent;
    // Firebaseから取得したタスクの配列を格納するObservable


    // fileContentに値が入っている且つ長さが1以上
    if (fileContent && fileContent.length > 0) {
      for (const row of fileContent) {
        // ループ内でのみ利用するため、ループ内でtaskListオブジェクトを宣言
        const taskList: Task[] = [];
        
        for (this.i = 1; this.i < 31; this.i++) {
          const task: Task = {
            title: row[0], 
            description: row[this.i],
          };
          
          taskList.push(task);
        }
        
        // taskListオブジェクトを一括してdatabaseに追加
        this.store.collection('todo').add({ tasks: taskList });

      }
    }
    this.tasks$ = this.store.collection('todo').valueChanges();
  }
  
// "全て削除" ボタンをクリックした際の処理
deleteAllTasks() {
  // todo コレクション内の全てのドキュメントを削除
  this.store.collection<Task>('todo').get().subscribe(snapshot => {
    snapshot.docs.forEach(doc => {
      doc.ref.delete();
    });
  });
}
  
  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  //todo: Task[] = [
  //  {
  //    title: 'Buy milk',
  //    description: 'Go to the store and buy milk'
  //  },
  //  {
  //    title: 'Create a Kanban app',
  //    description: 'Using Firebase and Angular create a Kanban app!'
  //  }
  //];
  
  //done: Task[] = [];
editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
  const dialogRef = this.dialog.open(TaskDialogComponent, {
    width: '270px',
    data: {
      task,
      enableDelete: true,
    },
  });
  dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
    if (!result) {
      return;
    }
    if (result.delete) {
      this.store.collection(list).doc(task.id).delete();
    } else {
      this.store.collection(list).doc(task.id).update(task);
    }
  });
}
drop(event: CdkDragDrop<Task[]| null, any, any>): void {
  if (event.previousContainer === event.container) {
    return;
  }
  const item = event.previousContainer.data[event.previousIndex];
  this.store.firestore.runTransaction(() => {
    const promise = Promise.all([
      this.store.collection(event.previousContainer.id).doc(item.id).delete(),
      this.store.collection(event.container.id).add(item),
    ]);
    return promise;
  });
  if(event.container.data !== null){
  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex
  );
  }
}



newTask(): void {
  const dialogRef = this.dialog.open(TaskDialogComponent, {
    width: '270px',
    data: {
      task: {},
    },
  });
  dialogRef
    .afterClosed()
    .subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      //this.todo.push(result.task);
      this.store.collection('todo').add(result.task);
    });
}

}
