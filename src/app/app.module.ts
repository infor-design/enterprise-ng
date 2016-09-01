import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  APP_BASE_HREF
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import { SohoComponentsModule } from '../soho-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SohoComponentsModule,
  ],
  providers: [
    APP_ROUTER_PROVIDERS,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  entryComponents: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
