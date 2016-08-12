import { Component, OnInit } from '@angular/core';
import { EXPANDABLEAREA_DIRECTIVES } from '../../components/expandablearea';

@Component({
  selector: 'soho-expandablearea-demo',
  templateUrl: 'expandablearea.demo.html',
  directives: [ EXPANDABLEAREA_DIRECTIVES ],
})
export class ExpandableAreaDemoComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
