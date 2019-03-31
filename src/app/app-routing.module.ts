import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule', canActivate: [AuthGuard] },
  { path: 'alldata', loadChildren: './pages/alldata/alldata.module#AlldataPageModule', canActivate: [AuthGuard] },
  { path: 'history/:id', loadChildren: './pages/history/history.module#HistoryPageModule' },
  { path: 'compare', loadChildren: './pages/compare/compare.module#ComparePageModule' },


 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
