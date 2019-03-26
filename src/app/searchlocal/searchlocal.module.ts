import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';

import { SearchlocalPage } from './searchlocal.page';

const routes: Routes = [
  {
    path: '',
    component: SearchlocalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchlocalPage]
})
export class SearchlocalPageModule {}
