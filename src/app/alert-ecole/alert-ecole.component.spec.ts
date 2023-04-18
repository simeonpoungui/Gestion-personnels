import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEcoleComponent } from './alert-ecole.component';

describe('AlertEcoleComponent', () => {
  let component: AlertEcoleComponent;
  let fixture: ComponentFixture<AlertEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEcoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
