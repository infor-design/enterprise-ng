import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { SohoComponentsModule } from 'ids-enterprise-ng';

import { LocalePipeDemoComponent } from './locale-pipe.demo';
import { LocaleDemoRoutingModule } from './locale-demo.routes';

@NgModule({
  declarations: [
    LocalePipeDemoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SohoComponentsModule,
    LocaleDemoRoutingModule
   ],
  providers: [
  ],
  bootstrap: []
})
export class LocaleDemoModule { }
