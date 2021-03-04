import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTracklistComponent } from './my-tracklist.component';

describe('MyTracklistComponent', () => {
  let component: MyTracklistComponent;
  let fixture: ComponentFixture<MyTracklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTracklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
