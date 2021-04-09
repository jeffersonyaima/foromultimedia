import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuionesComponent } from './guiones.component';

describe('GuionesComponent', () => {
  let component: GuionesComponent;
  let fixture: ComponentFixture<GuionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
