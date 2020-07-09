import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SohoDragDirective
} from './soho-drag.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoDragDirective
  ],
  exports: [
    SohoDragDirective
  ]
})
export class SohoDragModule { }
