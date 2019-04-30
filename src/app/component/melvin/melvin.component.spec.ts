import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MelvinComponent } from './melvin.component';

describe('MelvinComponent', () => {
  let component: MelvinComponent;
  let fixture: ComponentFixture<MelvinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MelvinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MelvinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
