import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashCegadoComponent } from './hash-cegado.component';

describe('HashCegadoComponent', () => {
  let component: HashCegadoComponent;
  let fixture: ComponentFixture<HashCegadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashCegadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashCegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
