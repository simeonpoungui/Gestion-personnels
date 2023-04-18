import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetenueComponent } from './retenue.component';

describe('RetenueComponent', () => {
  let component: RetenueComponent;
  let fixture: ComponentFixture<RetenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
