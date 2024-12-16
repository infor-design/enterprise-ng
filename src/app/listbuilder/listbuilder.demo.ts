import { Component } from "@angular/core";

@Component({
    selector: 'app-listbuilder',
    templateUrl: 'listbuilder.demo.html',
    standalone: false
})
export class ListBuilderDemoComponent {
    public dataset = [
        {id: 1, value: 'opt-1', text: 'Argentina'},
        {id: 2, value: 'opt-2', text: 'Belize'},
        {id: 4, value: 'opt-4', text: 'Dominican Republic'},
        {id: 5, value: 'opt-5', text: 'Ecuador', disabled: true},
        {id: 6, value: 'opt-6', text: 'France'},
        {id: 7, value: 'opt-7', text: 'Germany'},
        {id: 8, value: 'opt-8', text: 'Hong Kong'},
        {id: 9, value: 'opt-9', text: 'India'},
        {id: 10, value: 'opt-10', text: 'Japan'},
        {id: 11, value: 'opt-11', text: 'Kuwait'},
        {id: 12, value: 'opt-12', text: 'Libya'}
    ]

    print(e: any) {
        console.log(e[0].type.toUpperCase(), e[1]);    
    }
}