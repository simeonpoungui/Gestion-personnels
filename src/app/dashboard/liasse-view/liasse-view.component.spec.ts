import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiasseViewComponent } from './liasse-view.component';

describe('LiasseViewComponent', () => {
  let component: LiasseViewComponent;
  let fixture: ComponentFixture<LiasseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiasseViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiasseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
