import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessFieldComponent } from './chess-field.component';

describe('ChessFieldComponent', () => {
  let component: ChessFieldComponent;
  let fixture: ComponentFixture<ChessFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
