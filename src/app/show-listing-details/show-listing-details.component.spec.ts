import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListingDetailsComponent } from './show-listing-details.component';

describe('ShowListingDetailsComponent', () => {
  let component: ShowListingDetailsComponent;
  let fixture: ComponentFixture<ShowListingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
