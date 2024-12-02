import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentItemsComponent } from './segment-items.component';

describe('SegmentItemsComponent', () => {
  let component: SegmentItemsComponent;
  let fixture: ComponentFixture<SegmentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
