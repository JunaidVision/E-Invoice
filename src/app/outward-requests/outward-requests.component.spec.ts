import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardRequestsComponent } from './outward-requests.component';

describe('OutwardRequestsComponent', () => {
  let component: OutwardRequestsComponent;
  let fixture: ComponentFixture<OutwardRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutwardRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
