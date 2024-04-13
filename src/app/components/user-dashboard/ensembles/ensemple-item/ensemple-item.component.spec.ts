import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsempleItemComponent } from './ensemple-item.component';

describe('EnsempleItemComponent', () => {
  let component: EnsempleItemComponent;
  let fixture: ComponentFixture<EnsempleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsempleItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnsempleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
