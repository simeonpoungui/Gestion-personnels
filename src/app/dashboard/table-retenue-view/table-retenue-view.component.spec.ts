import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRetenueViewComponent } from './table-retenue-view.component';

describe('TableRetenueViewComponent', () => {
  let component: TableRetenueViewComponent;
  let fixture: ComponentFixture<TableRetenueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRetenueViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRetenueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
