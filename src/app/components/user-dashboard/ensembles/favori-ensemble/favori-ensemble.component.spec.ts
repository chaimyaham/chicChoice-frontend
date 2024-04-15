import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriEnsembleComponent } from './favori-ensemble.component';

describe('FavoriEnsembleComponent', () => {
  let component: FavoriEnsembleComponent;
  let fixture: ComponentFixture<FavoriEnsembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriEnsembleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
