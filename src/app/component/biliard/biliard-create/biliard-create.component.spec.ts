import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiliardCreateComponent } from './biliard-create.component';

describe('BiliardCreateComponent', () => {
  let component: BiliardCreateComponent;
  let fixture: ComponentFixture<BiliardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiliardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiliardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
