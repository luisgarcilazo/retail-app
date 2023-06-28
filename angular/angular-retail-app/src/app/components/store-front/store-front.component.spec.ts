import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFrontComponent } from './store-front.component';

describe('StoreFrontComponent', () => {
  let component: StoreFrontComponent;
  let fixture: ComponentFixture<StoreFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFrontComponent]
    });
    fixture = TestBed.createComponent(StoreFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
