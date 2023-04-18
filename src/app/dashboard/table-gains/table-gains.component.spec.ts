import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGainsComponent } from './table-gains.component';

describe('TableGainsComponent', () => {
  let component: TableGainsComponent;
  let fixture: ComponentFixture<TableGainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGainsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableGainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
