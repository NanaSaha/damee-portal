import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWalletComponent } from './master-wallet.component';

describe('MasterWalletComponent', () => {
  let component: MasterWalletComponent;
  let fixture: ComponentFixture<MasterWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
