import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationaliteViewComponent } from './nationalite-view.component';

describe('NationaliteViewComponent', () => {
  let component: NationaliteViewComponent;
  let fixture: ComponentFixture<NationaliteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationaliteViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationaliteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
