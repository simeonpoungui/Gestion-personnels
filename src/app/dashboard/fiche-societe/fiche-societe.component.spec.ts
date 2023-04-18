import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSocieteComponent } from './fiche-societe.component';

describe('FicheSocieteComponent', () => {
  let component: FicheSocieteComponent;
  let fixture: ComponentFixture<FicheSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
