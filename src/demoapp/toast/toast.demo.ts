import { Component, OnInit } from '@angular/core';
import { SohoToastService } from '../../services/';
import { SohoButtonComponent, BUTTON_TYPES } from '../';

@Component({
  moduleId: module.id,
  selector: 'soho-toast-demo',
  templateUrl: 'toast.demo.html',
  providers: [ SohoToastService ],
  directives: [ SohoButtonComponent ]
})
export class ToastDemoComponent implements OnInit {
  private types = BUTTON_TYPES; // tslint:disable-line

  //Inject Toast Servivce as a dependency and get an instance variable
  constructor(private toastService: SohoToastService) { }
  ngOnInit() { }

  showToast() {
    this.toastService.show({title: 'Sample Message', message: 'This is a Toast message'});
  }

}
