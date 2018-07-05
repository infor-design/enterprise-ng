import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { LocalePipeDemoComponent } from './locale-pipe.demo';

const routes: Routes = [
  {
    path: '',
    component: LocalePipeDemoComponent,
    children: [
      { path: '', component: LocalePipeDemoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocaleDemoRoutingModule { }
