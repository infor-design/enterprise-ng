import {
  NgModule,
  APP_INITIALIZER
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoVersionInitializerService,
  SohoVersionInitializerFactory
} from './version-initializer.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: SohoVersionInitializerFactory,
      deps: [ SohoVersionInitializerService ],
      multi: true
    }
  ]
})
export class SohoVersionInitializerModule {}
