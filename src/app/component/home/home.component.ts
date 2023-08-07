import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private router: Router) { } 

  Button1Click(): void {
    this.router.navigate(['/app-import']);
  }

  Button2Click(): void {
    this.router.navigate(['/database']);
  }

}
