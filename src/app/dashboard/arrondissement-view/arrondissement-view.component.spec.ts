import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrondissementViewComponent } from './arrondissement-view.component';

describe('ArrondissementViewComponent', () => {
  let component: ArrondissementViewComponent;
  let fixture: ComponentFixture<ArrondissementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrondissementViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrondissementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
