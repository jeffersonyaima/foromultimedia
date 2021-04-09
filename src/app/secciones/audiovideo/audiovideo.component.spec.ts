import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiovideoComponent } from './audiovideo.component';

describe('AudiovideoComponent', () => {
  let component: AudiovideoComponent;
  let fixture: ComponentFixture<AudiovideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiovideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiovideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
