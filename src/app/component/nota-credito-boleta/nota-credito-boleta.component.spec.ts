import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCreditoBoletaComponent } from './nota-credito-boleta.component';

describe('NotaCreditoBoletaComponent', () => {
  let component: NotaCreditoBoletaComponent;
  let fixture: ComponentFixture<NotaCreditoBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaCreditoBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCreditoBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
