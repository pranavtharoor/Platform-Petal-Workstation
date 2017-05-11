/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
describe('NavbarComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/App/angular-src/src/app/components/navbar/navbar.component.spec.js.map