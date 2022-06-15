import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeredictoComponent } from './veredicto.component';

describe('VeredictoComponent', () => {
  let component: VeredictoComponent;
  let fixture: ComponentFixture<VeredictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeredictoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeredictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
