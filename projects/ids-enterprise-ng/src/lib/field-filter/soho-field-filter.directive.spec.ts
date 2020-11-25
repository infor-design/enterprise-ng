
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SohoFieldFilterDirective } from './soho-field-filter.directive';

@Component({
  template: `
    <div class="field">
      <input soho-field-filter
        [fieldSettings]="fieldSettings"
        [fieldDropdownDataSet]="fieldDropdownDataSet"
        [dropdownOpts]="dropdownOpts"
        [template]="template"
        (filtered)="filtered($event)"/>
    </div>`
})
class SohoFieldFilterTestComponent {
  @ViewChild(SohoFieldFilterDirective) sohoFieldFilter?: SohoFieldFilterDirective;

  fieldSettings?: SohoFieldFilterSettings;
  fieldDropdownDataSet?: SohoFieldFilterOption[];
  dropdownOpts?: SohoDropDownOptions;
  template?: string;

  filtered() { }
}

describe('Directive: SohoFieldFilter', () => {
  let fixture: ComponentFixture<SohoFieldFilterTestComponent>;
  let component: SohoFieldFilterTestComponent;
  let sohoFieldFilter: SohoFieldFilterDirective;

  let updatedSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoFieldFilterDirective, SohoFieldFilterTestComponent]
    });

    fixture = TestBed.createComponent(SohoFieldFilterTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    sohoFieldFilter = (component.sohoFieldFilter as any);

    const sohFieldFilterAny = (sohoFieldFilter as any);
    updatedSpy = spyOn(sohFieldFilterAny.fieldFilter, 'updated');
    sohFieldFilterAny._settings = {};  // <--- should not really be playing with it's privates.
  });

  it('should update with fieldSettings', () => {
    component.fieldSettings = {};
    fixture.detectChanges();

    expect(updatedSpy).toHaveBeenCalledTimes(1);
    expect(updatedSpy).toHaveBeenCalledWith({});
    expect(sohoFieldFilter['runUpdatedOnCheck']).toBeFalsy();
  });

  it('should update with fieldDropdownDataSet', () => {
    const dataset = [
      { value: 'equals', text: 'Equals', icon: 'filter-equals' } as SohoFieldFilterOption
    ];
    component.fieldDropdownDataSet = dataset;
    fixture.detectChanges();

    expect(updatedSpy).toHaveBeenCalledTimes(1);
    expect(updatedSpy).toHaveBeenCalledWith({ dataset });
    expect((sohoFieldFilter as any).runUpdatedOnCheck).toBeFalsy();
  });

  it('should update with dropdownOpts', () => {
    const dropdownOpts = { reload: 'none' } as SohoDropDownOptions;
    component.dropdownOpts = dropdownOpts;
    fixture.detectChanges();

    expect(updatedSpy).toHaveBeenCalledTimes(1);
    expect(updatedSpy).toHaveBeenCalledWith({ dropdownOpts });
    expect((sohoFieldFilter as any).runUpdatedOnCheck).toBeFalsy();
  });

  it('should update with template', () => {
    component.template = 'test';
    fixture.detectChanges();

    expect(updatedSpy).toHaveBeenCalledTimes(1);
    expect(updatedSpy).toHaveBeenCalledWith({ template: 'test' });
    expect((sohoFieldFilter as any).runUpdatedOnCheck).toBeFalsy();
  });

  it('should getFilterType', () => {
    const getFilterTypeSpy = spyOn((sohoFieldFilter['fieldFilter'] as any), 'getFilterType');
    getFilterTypeSpy.and.returnValue(1);

    const result = sohoFieldFilter.getFilterType();

    expect(result).toEqual(1);
    expect(getFilterTypeSpy).toHaveBeenCalledTimes(1);
  });

  it('should setFilterType', () => {
    const setFilterTypeSpy = spyOn((sohoFieldFilter as any).fieldFilter, 'setFilterType');
    sohoFieldFilter.setFilterType(2);

    expect(setFilterTypeSpy).toHaveBeenCalledWith(2);
    expect(setFilterTypeSpy).toHaveBeenCalledTimes(1);
  });

  it('should destroy', () => {
    sohoFieldFilter.ngOnDestroy();

    expect(sohoFieldFilter['fieldFilter']).toBeNull();
  });

  it('should markForRefresh', () => {
    sohoFieldFilter.markForRefresh();

    expect((sohoFieldFilter as any).runUpdatedOnCheck).toBeTruthy();
  });

  it('should fire filtered event', () => {
    const filteredSpy = spyOn(component, 'filtered');
    (sohoFieldFilter as any)['jQueryElement'].trigger('filtered', { data: 3 });

    expect(filteredSpy).toHaveBeenCalledTimes(1);
    expect((filteredSpy.calls.mostRecent() as any).args[0].filterOption).toEqual(3);
  });
});
