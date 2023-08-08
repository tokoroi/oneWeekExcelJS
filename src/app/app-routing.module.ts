import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportComponent } from './component/import/import.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DatabaseComponent } from './component/database/database.component';
import { GraphComponent } from './component/graph/graph.component';

const routes: Routes = [

  { path: "", component: HomeComponent },
  { path: "Home", component: HomeComponent },
  { path: "app-import", component: ImportComponent},
  { path: 'database', component: DatabaseComponent },
  { path: 'graph', component: GraphComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
