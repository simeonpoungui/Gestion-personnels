import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleViewComponent } from './ecole-view.component';

describe('EcoleViewComponent', () => {
  let component: EcoleViewComponent;
  let fixture: ComponentFixture<EcoleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcoleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
