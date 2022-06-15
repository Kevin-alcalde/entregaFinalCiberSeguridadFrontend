import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonceFirmadoComponent } from './nonce-firmado.component';

describe('NonceFirmadoComponent', () => {
  let component: NonceFirmadoComponent;
  let fixture: ComponentFixture<NonceFirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonceFirmadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonceFirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
