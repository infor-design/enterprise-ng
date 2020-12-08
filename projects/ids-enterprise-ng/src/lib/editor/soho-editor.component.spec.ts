import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SohoEditorComponent } from './soho-editor.component';

describe('SohoEditorComponent', () => {
  let component: SohoEditorComponent;
  let fixture: ComponentFixture<SohoEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SohoEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check inputs', () => {
    let delay = 10;
    let firstHeader = 'First Header';
    let secondHeader = 'Second Header';
    let placeHolder = 'Place Holder';
    let showHtmlView = false;
    let preview = false;

    // set inputs
    component.delay = delay;
    component.firstHeader = firstHeader;
    component.secondHeader = secondHeader;
    component.placeholder = placeHolder;
    component.showHtmlView = showHtmlView;
    component.preview = preview;

    // check components options
    expect(component['options'].delay).toEqual(delay);
    expect(component['options'].firstHeader).toEqual(firstHeader);
    expect(component['options'].secondHeader).toEqual(secondHeader);
    expect(component['options'].placeholder).toEqual(placeHolder);
    expect(component['options'].showHtmlView).toEqual(showHtmlView);
    expect(component['options'].preview).toEqual(preview);

    // detect changes so internal soho component is built
    fixture.detectChanges();
    expect(component['editor']).toBeDefined('editor should have been defined');

    // change the settings
    delay = 20;
    firstHeader = 'Updated First Header';
    secondHeader = 'Updated Second Header';
    placeHolder = 'Updated Place Holder';
    showHtmlView = true;
    preview = true;

    // update inputs
    component.delay = delay;
    component.firstHeader = firstHeader;
    component.secondHeader = secondHeader;
    component.placeholder = placeHolder;
    component.showHtmlView = showHtmlView;
    component.preview = preview;

    // check editor internal soho component options object
    // expect(component['editor'].settings.delay).toEqual(delay);
    // expect(component['editor'].settings.firstHeader).toEqual(firstHeader);
    expect((component['editor'] as any).settings.secondHeader).toEqual(secondHeader);
    expect((component['editor'] as any).settings.placeholder).toEqual(placeHolder);
    expect((component['editor'] as any).settings.showHtmlView).toEqual(showHtmlView);
    expect((component['editor'] as any).settings.preview).toEqual(preview);
  });
});
