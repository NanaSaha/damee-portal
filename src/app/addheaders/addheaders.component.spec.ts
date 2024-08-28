import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddheadersComponent } from './addheaders.component';

describe('AddheadersComponent', () => {
  let component: AddheadersComponent;
  let fixture: ComponentFixture<AddheadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddheadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddheadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
