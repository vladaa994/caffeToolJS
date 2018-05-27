import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiliardComponent } from './biliard.component';

describe('BiliardComponent', () => {
  let component: BiliardComponent;
  let fixture: ComponentFixture<BiliardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiliardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiliardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
