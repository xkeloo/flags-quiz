import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {
  activeSlide: number = 0;
  numOfSlides: number = 3;

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  changeSlide(offset: number) {
    this.activeSlide = Math.abs(this.activeSlide + offset) % this.numOfSlides;
    console.log(this.activeSlide)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
