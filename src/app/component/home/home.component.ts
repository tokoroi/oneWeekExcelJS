import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  activeButton: string = 'home'; // 初期値は 'home' とする

  constructor(private router: Router, public dialog: MatDialog) { } 


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      // dialogに渡すデータ
      data: {}
    });
  }

  // Excel云々のページ
  Button1Click(): void {
    this.activeButton = 'Excel';
    this.router.navigate(['/app-import']);
  }
  
  // FireBaseのよくわからないページ
  Button2Click(): void {
    this.activeButton = 'database';
    this.router.navigate(['/database']);
  }

  // グラフページ
  Button3Click(): void {
    this.activeButton = 'graph';
    this.router.navigate(['/graph']);
  }

  // Home画面に戻る
  HomeButtonClick(): void {
    this.activeButton = 'home';
    this.router.navigate(['']);
  }

  // activeButtonが指定したボタンと一致するかを判定するメソッド
  isButtonActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

}