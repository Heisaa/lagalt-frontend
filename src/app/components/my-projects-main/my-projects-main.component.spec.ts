import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsMainComponent } from './my-projects-main.component';

describe('MyProjectsMainComponent', () => {
  let component: MyProjectsMainComponent;
  let fixture: ComponentFixture<MyProjectsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProjectsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
