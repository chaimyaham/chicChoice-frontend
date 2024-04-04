import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnsembleComponent } from './list-ensemble.component';

describe('ListEnsembleComponent', () => {
  let component: ListEnsembleComponent;
  let fixture: ComponentFixture<ListEnsembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnsembleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
