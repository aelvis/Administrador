import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCreditoFacturaComponent } from './nota-credito-factura.component';

describe('NotaCreditoFacturaComponent', () => {
  let component: NotaCreditoFacturaComponent;
  let fixture: ComponentFixture<NotaCreditoFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaCreditoFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCreditoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
