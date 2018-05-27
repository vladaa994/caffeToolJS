import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDeletedComponent } from './player-deleted.component';

describe('PlayerDeletedComponent', () => {
  let component: PlayerDeletedComponent;
  let fixture: ComponentFixture<PlayerDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
