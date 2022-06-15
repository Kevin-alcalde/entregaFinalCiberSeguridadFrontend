import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentidadAnonimaComponent } from './identidad-anonima.component';

describe('IdentidadAnonimaComponent', () => {
  let component: IdentidadAnonimaComponent;
  let fixture: ComponentFixture<IdentidadAnonimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentidadAnonimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentidadAnonimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
