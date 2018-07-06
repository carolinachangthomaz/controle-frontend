import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteContasComponent } from './cliente-contas.component';

describe('ClienteContasComponent', () => {
  let component: ClienteContasComponent;
  let fixture: ComponentFixture<ClienteContasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteContasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
