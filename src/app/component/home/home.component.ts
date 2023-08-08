import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private router: Router) { } 

  // Excel云々のページ
  Button1Click(): void {
    this.router.navigate(['/app-import']);
  }
  
  // FireBaseのよくわからないページ
  Button2Click(): void {
    this.router.navigate(['/database']);
  }

  // グラフページ
  Button3Click(): void {
    this.router.navigate(['/graph']);
  }

  // Home画面に戻る
  HomeButtonClick(): void {
    this.router.navigate(['/Home']);
  }
}