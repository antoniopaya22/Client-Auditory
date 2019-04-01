import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchPage],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class SearchPageModule {}
