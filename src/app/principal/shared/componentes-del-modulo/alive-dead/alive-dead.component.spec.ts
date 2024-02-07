import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliveDeadComponent } from './alive-dead.component';

describe('AliveDeadComponent', () => {
  let component: AliveDeadComponent;
  let fixture: ComponentFixture<AliveDeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AliveDeadComponent]
    });
    fixture = TestBed.createComponent(AliveDeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
