import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentCustomersComponent } from './segment-customers.component';

describe('SegmentCustomersComponent', () => {
  let component: SegmentCustomersComponent;
  let fixture: ComponentFixture<SegmentCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
