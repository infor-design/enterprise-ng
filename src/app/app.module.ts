import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  APP_BASE_HREF
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { APP_ROUTER_PROVIDERS } from './app.routes';

import { SohoListviewModule } from '../components/listview';
import { SohoSearchfieldModule } from '../components/searchfield';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SohoListviewModule,
    SohoSearchfieldModule
  ],
  providers: [
      APP_ROUTER_PROVIDERS,
      { provide: APP_BASE_HREF, useValue: '/' }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
