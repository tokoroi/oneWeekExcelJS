import { Component } from '@angular/core';
import { Task } from 'src/app/task/task';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop,transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from 'src/app/task-dialog/task-dialog.component';
import { TaskDialogResult } from 'src/app/task-dialog/task-dialog.component';
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent {
//komentoireta  
todo: Task[] = [
  {
    title: 'Buy milk',
    description: 'Go to the store and buy milk'
  },
  {
    title: 'Create a Kanban app',
    description: 'Using Firebase and Angular create a Kanban app!'
  }
];
inProgress: Task[] = [];
done: Task[] = [];

editTask(list: string, task:Task): void {}
 
drop(event: CdkDragDrop<Task[]>): void {
  if (event.previousContainer === event.container) {
    return;
  }
  if(!event.container.data || ! event.previousContainer.data){
    return;
  }
  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex
  );
}

constructor(private dialog: MatDialog) {}

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
      this.todo.push(result.task);
    });
}

}
