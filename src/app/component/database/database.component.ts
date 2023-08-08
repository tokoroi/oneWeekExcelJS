import { Component } from '@angular/core';
import { Task } from 'src/app/component/task/task';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop,transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from 'src/app/component/task-dialog/task-dialog.component';
import { TaskDialogResult } from 'src/app/component/task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { style } from '@angular/animations';
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css', '../../../styles.css']
})
export class DatabaseComponent {
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

constructor(private dialog: MatDialog, private store: AngularFirestore) {}

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
    });
}

}
