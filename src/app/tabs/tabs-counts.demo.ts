import { Component } from '@angular/core';
import { TABS_DIRECTIVES } from '../../components/tabs';

/**
 * This example:
 * - Shows how to make a tab with counts and separators
 */
@Component({
  selector: 'tabs-counts-demo',
  templateUrl: './tabs-counts.demo.html',
  directives: [ TABS_DIRECTIVES ]
})
export class TabsCountsDemoComponent { }
