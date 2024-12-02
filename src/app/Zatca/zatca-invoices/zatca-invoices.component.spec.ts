import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZatcaInvoicesComponent } from './zatca-invoices.component';

describe('ZatcaInvoicesComponent', () => {
  let component: ZatcaInvoicesComponent;
  let fixture: ComponentFixture<ZatcaInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZatcaInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZatcaInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
