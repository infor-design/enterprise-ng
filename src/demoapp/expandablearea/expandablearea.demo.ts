import { Component, OnInit } from '@angular/core';
import { EXPANDABLEAREA_COMPONENTS } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-expandablearea-demo',
  templateUrl: 'expandablearea.demo.html',
  directives: [ EXPANDABLEAREA_COMPONENTS ],
})
export class ExpandableAreaDemo implements OnInit {
  constructor() { }

  ngOnInit() { }

}
