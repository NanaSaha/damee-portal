import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueRecordComponent } from './revenue-record.component';

describe('RevenueRecordComponent', () => {
  let component: RevenueRecordComponent;
  let fixture: ComponentFixture<RevenueRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
