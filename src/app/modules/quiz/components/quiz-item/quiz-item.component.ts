import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Country } from '../../models/country.model';
import { QuizMapComponent } from '../quiz-map/quiz-map.component';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {
  @Input() darkMode: boolean;
  @Input() country: Country;
  @Input() id: number;
  @Output() completedEvent = new EventEmitter();
  @ViewChild("nameAnswer") nameInput: ElementRef;
  @ViewChild("capitalAnswer") capitalInput: ElementRef;
  @ViewChild("testItemHolder") testItemHolder: ElementRef;
  nameAnswered: boolean = false;
  capitalAnswered: boolean = false;
  mapAnswered: boolean = false;
  allAnswered: boolean = false;


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  checkNameAnswer(nameAnswer: string) {
    if (nameAnswer == this.country.shortName || nameAnswer == this.country.protocolName) {
      this.nameAnswered = true;
      this.nameInput.nativeElement.disabled = true;
      this.checkAnswers();
    }
    else {
      this.nameInput.nativeElement.value = "";
    }
  }

  checkCapitalAnswer(nameAnswer: string) {
    if (nameAnswer == this.country.capital || nameAnswer == this.country.capital) {
      this.capitalAnswered = true;
      this.capitalInput.nativeElement.disabled = true;
      this.checkAnswers();
    }
    else {
      this.capitalInput.nativeElement.value = "";
    }
  }

  checkAnswers(): void {
    if(!this.nameAnswered) this.nameInput.nativeElement.focus();
    else if(!this.capitalAnswered) this.capitalInput.nativeElement.focus();
    else if(!this.mapAnswered) this.openDialog();
    else this.completedEvent.emit();
  }

  isCompleted(): boolean {
    if(this.nameAnswered && this.capitalAnswered && this.mapAnswered)
      return true;
    return false;
  }

  toView(): void {
    this.testItemHolder.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  openDialog(): void {
    if(!this.mapAnswered) {
      const dialogRef = this.dialog.open(QuizMapComponent, { 
        data: this.country.isoCode
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == "good-answer") {
          this.mapAnswered = true;
          this.checkAnswers();
        }
      });
    }
  }

  reset(): void {
    this.capitalAnswered = false;
    this.nameAnswered = false;
    this.mapAnswered = false;
    this.capitalInput.nativeElement.disabled = false;
    this.capitalInput.nativeElement.value = "";
    this.nameInput.nativeElement.disabled = false;
    this.nameInput.nativeElement.value = "";
  }
}
