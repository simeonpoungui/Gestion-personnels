import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteViewComponent } from './societe-view.component';

describe('SocieteViewComponent', () => {
  let component: SocieteViewComponent;
  let fixture: ComponentFixture<SocieteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocieteViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocieteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
