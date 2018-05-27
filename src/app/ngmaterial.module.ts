import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
 
@NgModule({
  imports: [
  	MatButtonModule,
  	MatFormFieldModule,
  	MatInputModule,
    MatSelectModule
  ],
  exports: [
  	MatButtonModule,
  	MatFormFieldModule,
  	MatInputModule,
    MatSelectModule
  ]
})
export class MaterialAppModule { }