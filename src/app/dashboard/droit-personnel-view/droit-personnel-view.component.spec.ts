import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroitPersonnelViewComponent } from './droit-personnel-view.component';

describe('DroitPersonnelViewComponent', () => {
  let component: DroitPersonnelViewComponent;
  let fixture: ComponentFixture<DroitPersonnelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroitPersonnelViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroitPersonnelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
