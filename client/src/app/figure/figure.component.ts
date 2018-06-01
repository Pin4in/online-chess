import { Component, OnInit, ElementRef, HostListener, Input} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { faChessPawn,
         faChessRook,
         faChessQueen,
         faChessKnight,
         faChessKing,
         faChessBishop } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  // styleUrls: ['./figure.component.css'],
  styles: [`
    :host {
      position: absolute;
      left: 15px;
      border: 1px solid black;
      font-size: 2rem;
    }
    `]
})
export class FigureComponent implements OnInit {
  constructor(private elem: ElementRef) {}
  @Input()
  icon: any;

  private node = this.elem.nativeElement;
  private shiftX: any = '';
  private shiftY: any = '';

  private moveAt(e) {
    this.node.style.left = e.pageX - this.shiftX + 'px';
    this.node.style.top = e.pageY - this.shiftY + 'px';
  }

  ngOnInit() {
    console.log(this.node);
    console.log(this.icon);
  }

  onmousedown(event) {
    // console.log('onmousedown');
    const coords = this.getCoords(this.node);
    this.shiftX = event.pageX - coords.left;
    this.shiftY = event.pageY - coords.top;
    this.node.style.position = 'absolute';
    this.moveAt(event);
    this.node.style.zIndex = 9999;

    document.onmousemove = e => {
      // console.log('onmousemove', e);
      this.moveAt(e);
    };
  }


  onmouseup(event) {
    // console.log('onmouseup', event);
    document.onmousemove = null;
    this.node.onmouseup = null;
  }

  ondragstart(event) {
    // console.log('ondragstart', event);
    return false;
  }

  getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
}
