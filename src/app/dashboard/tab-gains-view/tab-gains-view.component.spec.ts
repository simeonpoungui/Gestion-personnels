import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGainsViewComponent } from './tab-gains-view.component';

describe('TabGainsViewComponent', () => {
  let component: TabGainsViewComponent;
  let fixture: ComponentFixture<TabGainsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabGainsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabGainsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
