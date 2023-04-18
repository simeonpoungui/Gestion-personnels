import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeViewComponent } from './prime-view.component';

describe('PrimeViewComponent', () => {
  let component: PrimeViewComponent;
  let fixture: ComponentFixture<PrimeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
