import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiliardActiveComponent } from './biliard-active.component';

describe('BiliardActiveComponent', () => {
  let component: BiliardActiveComponent;
  let fixture: ComponentFixture<BiliardActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiliardActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiliardActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
