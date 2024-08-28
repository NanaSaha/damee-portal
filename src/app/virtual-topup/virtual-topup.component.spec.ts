import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTopupComponent } from './virtual-topup.component';

describe('VirtualTopupComponent', () => {
  let component: VirtualTopupComponent;
  let fixture: ComponentFixture<VirtualTopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualTopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
