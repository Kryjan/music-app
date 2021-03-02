import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
    let component: AboutMeComponent;
    let fixture: ComponentFixture<AboutMeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AboutMeComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutMeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain data', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('mat-card-title').textContent).toContain('Krystian Janiec');
        expect(compiled.querySelector('mat-card-content').textContent).toContain('Hello');
    });
});
