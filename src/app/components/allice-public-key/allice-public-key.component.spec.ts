import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllicePublicKeyComponent } from './allice-public-key.component';

describe('AllicePublicKeyComponent', () => {
  let component: AllicePublicKeyComponent;
  let fixture: ComponentFixture<AllicePublicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllicePublicKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllicePublicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
