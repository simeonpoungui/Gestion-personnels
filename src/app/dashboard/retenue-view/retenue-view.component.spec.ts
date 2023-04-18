import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetenueViewComponent } from './retenue-view.component';

describe('RetenueViewComponent', () => {
  let component: RetenueViewComponent;
  let fixture: ComponentFixture<RetenueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetenueViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetenueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
