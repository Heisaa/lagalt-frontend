import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveApplicationsComponent } from './approve-applications.component';

describe('ApproveApplicationsComponent', () => {
  let component: ApproveApplicationsComponent;
  let fixture: ComponentFixture<ApproveApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
