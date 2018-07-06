import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-chess-figure',
  templateUrl: './chess-figure.component.html',
  styleUrls: ['./chess-figure.component.css']
})
export class ChessFigureComponent {
  @Input() figure;
}
