
import {Component, Input, AfterViewInit} from '@angular/core';

import {SohoDropdownComponent} from '../../components/index';

@Component({
    selector   : 'dropdown-sample-component',
    directives : [SohoDropdownComponent],
    template   : `
        <p>DropdownSampleComponent</p>
        <label id="labeldd1" for="dd1">Dropdown control without model</label>
        <select soho-dropdown-component
            class="dropdown"
            type="text"
            id="dd1"
            [options]="options"
        >
            <option *ngFor="let item of states" [value]="item.value">{{item.label}}</option>
        </select>

        <br/>
        <label id="labeldd2" for="dd2">Standard select without model</label>
        <select id="dd2">
            <option *ngFor="let item of states" [value]="item.value">{{item.label}}</option>
        </select>

        <br/>
        <br/>-----------------------------------------------------
        <br/>
        <br/>
        <label id="labeldd3" for="dd3">Dropdown control with model</label>
        <select soho-dropdown-component
            class="dropdown"
            type="text"
            id="dd3"
            [options]="options"
            [(ngModel)]="model['dd3'].value"
            (dropdownSelected)="onDropdownSelected($event)"
        >
            <option *ngFor="let item of states" [value]="item.value">{{item.label}}</option>
        </select>
        <span>Testing the model -> {{model['dd3'].value}}</span>

        <br/>
        <label id="labeldd4" for="dd4">Standard select with model</label>
        <select id="dd4" [(ngModel)]="model['dd4'].value">
            <option *ngFor="let item of states" [value]="item.value">{{item.label}}</option>
        </select>
        <span>Testing the model -> {{model['dd4'].value}}</span>
    `
})

export class DropdownSampleComponent implements AfterViewInit
{
//(dropdownChange)="onDropdownChange($event)"
    private model:any;
    private states:Array<StateValue>;
    private options:any;

    constructor()
    {
        let cstr = "maf";
    }

    // events
    ngOnInit()
    {
        this.model = this.buildModel();
        this.states = this.setStates();
        this.options = this.setOptions();
        this.setDataView();
    }

    ngAfterViewInit()
    {
//        this.setDataView();
    }

    onDropdownSelected(params:any)
    {
        // explicitly update model with value due to disconnect with control
        this.model[params.event.target.id].value = params.value.val();
    }

    // private methods
    private buildModel()
    {
        let model = {};

        for (let index=1; index<5; index++)
        {
            model["dd" + index] = { value: "" };
        }

        return model;
    }

    private setDataView()
    {
        let keys:Array<string> = Object.keys(this.model);

        for (var index=0, len=keys.length; index<len; index++)
        {
            let key = keys[index];
            var id = key.replace("dd", "");

            this.model[key].value = id;
        }
    }

    private setOptions()
    {
        let options:any = {};

//        options.closeOnSelect = true;
//        options.maxSelected
//        options.moveSelectedToTop = false;
//        options.multiple = false;
        options.noSearch = true;
//        options.source
//        options.empty = false;

        return options;
    }

    private setStates()
    {
        let states:Array<StateValue> = [];

//        states.push( {label:"", value:" "} );

        for (let index=0; index<5; index++)
        {
            states.push( {label:"Item " + index, value:index} );
        }

        return states;
    }
}

interface StateValue
{
    label:string;
    value:any;
}