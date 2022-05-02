import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SohoListBuilderComponent } from "./soho-listbuilder.component";

describe('Soho Listbuilder', () => {
    let component: SohoListBuilderComponent;
    let fixture: ComponentFixture<SohoListBuilderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [SohoListBuilderComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SohoListBuilderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
})