import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueBatchComponent } from './revenue-batch.component';

describe('RevenueBatchComponent', () => {
  let component: RevenueBatchComponent;
  let fixture: ComponentFixture<RevenueBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
