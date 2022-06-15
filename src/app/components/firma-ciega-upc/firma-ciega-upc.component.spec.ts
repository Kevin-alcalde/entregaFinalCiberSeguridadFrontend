import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaCiegaUPCComponent } from './firma-ciega-upc.component';

describe('FirmaCiegaUPCComponent', () => {
  let component: FirmaCiegaUPCComponent;
  let fixture: ComponentFixture<FirmaCiegaUPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmaCiegaUPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaCiegaUPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
