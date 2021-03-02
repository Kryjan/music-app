import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlaylistFormComponent } from './save-playlist-form.component';

describe('SavePlaylistFormComponent', () => {
  let component: SavePlaylistFormComponent;
  let fixture: ComponentFixture<SavePlaylistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePlaylistFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
