import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVetementsComponent } from './list-vetements.component';

describe('ListVetementsComponent', () => {
  let component: ListVetementsComponent;
  let fixture: ComponentFixture<ListVetementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVetementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVetementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
