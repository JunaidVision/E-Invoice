import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRequestsComponent } from './inward-requests.component';

describe('InwardRequestsComponent', () => {
  let component: InwardRequestsComponent;
  let fixture: ComponentFixture<InwardRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InwardRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
