import { Component } from '@angular/core';
import { TABS_DIRECTIVES } from '../';

/**
 * This example:
 * - Shows how to make a tab with counts and separators
 */
@Component({
  moduleId: module.id,
  selector: 'tabs-counts-demo',
  templateUrl: './tabs-counts.demo.html',
  directives: [ TABS_DIRECTIVES ]
})
export class TabsCountsDemoComponent { }
