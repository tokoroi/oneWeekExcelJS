import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router) { } 

  ngOnInit() {
  }

  Button1Click(): void {
    this.router.navigate(['/app-import']);
  }

}
