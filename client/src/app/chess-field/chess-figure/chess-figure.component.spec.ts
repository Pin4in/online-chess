import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessFigureComponent } from './chess-figure.component';

describe('ChessFigureComponent', () => {
  let component: ChessFigureComponent;
  let fixture: ComponentFixture<ChessFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
