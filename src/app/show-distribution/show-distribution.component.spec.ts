import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDistributionComponent } from './show-distribution.component';

describe('ShowDistributionComponent', () => {
  let component: ShowDistributionComponent;
  let fixture: ComponentFixture<ShowDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
