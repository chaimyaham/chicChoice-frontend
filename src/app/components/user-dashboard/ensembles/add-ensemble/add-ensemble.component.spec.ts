import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnsembleComponent } from './add-ensemble.component';

describe('AddEnsembleComponent', () => {
  let component: AddEnsembleComponent;
  let fixture: ComponentFixture<AddEnsembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnsembleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
