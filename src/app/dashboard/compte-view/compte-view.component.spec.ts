import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteViewComponent } from './compte-view.component';

describe('CompteViewComponent', () => {
  let component: CompteViewComponent;
  let fixture: ComponentFixture<CompteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
