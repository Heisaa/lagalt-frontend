import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioListItemComponent } from './portfolio-list-item.component';

describe('PortfolioListItemComponent', () => {
  let component: PortfolioListItemComponent;
  let fixture: ComponentFixture<PortfolioListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
