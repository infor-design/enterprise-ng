import { Component, OnInit } from '@angular/core';
import { EXPANDABLEAREA_DIRECTIVES } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-expandablearea-demo',
  templateUrl: 'expandablearea.demo.html',
  directives: [ EXPANDABLEAREA_DIRECTIVES ],
})
export class ExpandableAreaDemoComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
