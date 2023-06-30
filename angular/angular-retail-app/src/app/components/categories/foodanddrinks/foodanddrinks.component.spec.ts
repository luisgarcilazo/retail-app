import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodanddrinksComponent } from './foodanddrinks.component';

describe('FoodanddrinksComponent', () => {
  let component: FoodanddrinksComponent;
  let fixture: ComponentFixture<FoodanddrinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodanddrinksComponent]
    });
    fixture = TestBed.createComponent(FoodanddrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
