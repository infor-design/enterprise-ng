import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SohoStepChartComponent } from "./soho-stepchart.component";

describe('Soho Stepchart', () => {
    let component: SohoStepChartComponent;
    let fixture: ComponentFixture<SohoStepChartComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [SohoStepChartComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SohoStepChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});