import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { NotFoundComponent } from './utils/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'explorer/:slug', component:ExplorerComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
