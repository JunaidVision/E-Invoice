import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentInvoicesComponent } from './segment-invoices.component';

describe('SegmentInvoicesComponent', () => {
  let component: SegmentInvoicesComponent;
  let fixture: ComponentFixture<SegmentInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
