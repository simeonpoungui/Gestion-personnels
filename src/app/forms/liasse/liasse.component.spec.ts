import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiasseComponent } from './liasse.component';

describe('LiasseComponent', () => {
  let component: LiasseComponent;
  let fixture: ComponentFixture<LiasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
