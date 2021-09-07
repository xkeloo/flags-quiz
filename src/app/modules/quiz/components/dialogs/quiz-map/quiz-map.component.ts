import { AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-map',
  templateUrl: './quiz-map.component.html',
  styleUrls: ['./quiz-map.component.scss']
})
export class QuizMapComponent implements OnInit ,AfterViewInit {
  svgImage: Element;

  viewBox: {x: number, y: number, w: number, h: number};
  svgSize: {w: number, h: number};
  scale: number = 1;
  maxScale: number = 10;

  dragActive: boolean = false;
  startDragPoint: {x: number, y: number} = {x: 0, y: 0};
  endDragPoint: {x: number, y: number} = {x: 0, y: 0};

  constructor(
    public dialogRef: MatDialogRef<QuizMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isoCode: string, attemptsLeft: number}) { }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape")
        this.onClose();
    })

    this.dialogRef.backdropClick().subscribe(event => {
      this.onClose();
    })
  }

  ngAfterViewInit(): void {
    this.svgImage = document.getElementById("svg-map")!;
    this.viewBox = {x: 0, y: 0, w: 423.33333, h: 317.5};
    this.svgSize = {w: 423.33333, h: 317.5};
  }

  check(event: Event): void {
    if(this.dragActive) return;

    let element: Element = event.target as Element;
      
    if (element.id == this.data.isoCode)
      this.dialogRef.close("good-answer")
    else {
      this.data.attemptsLeft--;
      if (this.data.attemptsLeft > 0)
        element.classList.add("bad-answer");
      else
        this.onClose();
    }
  }

  onClose(): void {
    this.dialogRef.close(this.data.attemptsLeft);
  }

  onWheel(event: WheelEvent): void {
    let w = this.viewBox.w;
    let h = this.viewBox.h;
    let mx = event.offsetX;
    let my = event.offsetY;
    let dw = w*Math.sign(event.deltaY)*-0.1;
    let dh = h*Math.sign(event.deltaY)*-0.1;
    let dx;
    let dy;
    if(this.viewBox.w != this.svgSize.w/this.maxScale || this.viewBox.h != this.svgSize.h/this.maxScale) {
      dx = dw*mx/this.svgSize.w/2;
      dy = dh*my/this.svgSize.h/2;
    }
    else {
      dx = 0;
      dy = 0;
    }
    let nx = this.viewBox.x + dx;
    let ny = this.viewBox.y + dy;
    let nw = this.viewBox.w - dw;
    let nh = this.viewBox.h - dh;
    nw = Math.max(this.svgSize.w/this.maxScale, Math.min(nw, this.svgSize.w));
    nh = Math.max(this.svgSize.h/this.maxScale, Math.min(nh, this.svgSize.h));
    nx = Math.max(0, Math.min(nx, this.svgSize.w - nw));
    ny = Math.max(0, Math.min(ny, this.svgSize.h - nh));  
    this.viewBox = {x: nx, y: ny, w: nw, h: nh};
    this.scale = this.svgSize.w/nw;
    this.svgImage.setAttribute("viewBox", `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.dragActive = true;
    this.startDragPoint = {x: event.x, y: event.y};
    this.svgImage.setAttribute("cursor", "move");
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this.dragActive) {
      this.endDragPoint = {x: event.x, y: event.y};
      let dx = (this.startDragPoint.x - this.endDragPoint.x)/this.scale;
      let dy = (this.startDragPoint.y - this.endDragPoint.y)/this.scale;
      let nx = this.viewBox.x + dx;
      let ny = this.viewBox.y + dy;
      nx = Math.max(0, Math.min(nx, this.svgSize.w - this.viewBox.w));
      ny = Math.max(0, Math.min(ny, this.svgSize.h - this.viewBox.h));
      let movedViewBox = {x: nx, y: ny, w: this.viewBox.w, h: this.viewBox.h};
      this.svgImage.setAttribute("viewBox", `${movedViewBox.x} ${movedViewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
    }
  }

  onMouseUp(event: MouseEvent) {
    event.preventDefault();
    if (this.dragActive) {
      this.endDragPoint = {x: event.x, y: event.y};
      let dx = (this.startDragPoint.x - this.endDragPoint.x)/this.scale;
      let dy = (this.startDragPoint.y - this.endDragPoint.y)/this.scale;
      let nx = this.viewBox.x + dx;
      let ny = this.viewBox.y + dy;
      nx = Math.max(0, Math.min(nx, this.svgSize.w - this.viewBox.w));
      ny = Math.max(0, Math.min(ny, this.svgSize.h - this.viewBox.h));
      this.viewBox = {x: nx, y: ny, w: this.viewBox.w, h: this.viewBox.h};
      this.svgImage.setAttribute("viewBox", `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
      this.dragActive = false;
      this.svgImage.setAttribute("cursor", "auto");
    }  
  }
  onMouseLeave() {
    this.dragActive = false;
    this.svgImage.setAttribute("cursor", "auto");
  }
}
