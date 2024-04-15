import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnsembleComponent } from './update-ensemble.component';

describe('UpdateEnsembleComponent', () => {
  let component: UpdateEnsembleComponent;
  let fixture: ComponentFixture<UpdateEnsembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEnsembleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
