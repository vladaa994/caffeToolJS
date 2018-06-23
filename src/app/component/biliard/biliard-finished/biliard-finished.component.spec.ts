import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiliardFinishedComponent } from './biliard-finished.component';

describe('BiliardFinishedComponent', () => {
  let component: BiliardFinishedComponent;
  let fixture: ComponentFixture<BiliardFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiliardFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiliardFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
