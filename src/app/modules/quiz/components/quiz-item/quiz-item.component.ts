import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Country } from '../../models/country.model';
import { ClientSettingsService } from '../../services/client-settings.service';
import { QuizMapComponent } from '../dialogs/quiz-map/quiz-map.component';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss']
})
export class QuizItemComponent implements OnInit {
  @Input() country: Country;
  @Input() id: number;
  @Output() scoreUpEvent = new EventEmitter();
  @Output() completedEvent = new EventEmitter();
  @ViewChild("nameAnswer") nameInput: ElementRef;
  @ViewChild("capitalAnswer") capitalInput: ElementRef;
  @ViewChild("testItemHolder") testItemHolder: ElementRef;
  nameAttemptsLeft: number = Number.POSITIVE_INFINITY;
  capitalAttemptsLeft: number = Number.POSITIVE_INFINITY;
  mapAttemptsLeft: number = Number.POSITIVE_INFINITY;
  nameAnswered: boolean = false;
  nameIncorrect: boolean = false;
  capitalAnswered: boolean = false;
  capitalIncorrect: boolean = false;
  mapOpened: boolean = false; //without it you cannot close the map after you've answered name and capital, won't open automatically next time though
  mapAnswered: boolean = false;
  mapIncorrect: boolean = false;
  allAnswered: boolean = false;


  constructor(private clientSettingsService: ClientSettingsService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  getDarkMode(): boolean {
    return this.clientSettingsService.getDarkMode();
  }

  checkNameAnswer(nameAnswer: string) {
    if (nameAnswer == "") return;
    if (nameAnswer.toUpperCase() == this.country.shortName.toUpperCase() || nameAnswer.toUpperCase() == this.country.protocolName.toUpperCase()) {
      this.nameInput.nativeElement.value = this.country.shortName;
      this.nameAnswered = true;
      this.nameInput.nativeElement.disabled = true;
      this.scoreUpEvent.emit();
      this.checkAnswers();
    }
    else {
      this.nameAttemptsLeft--;
      if(this.nameAttemptsLeft > 0)
        this.nameInput.nativeElement.value = "";
      else {
        this.setNameIncorrect();
        this.checkAnswers();
      }
    }
  }

  checkCapitalAnswer(capitalAnswer: string) {
    if (capitalAnswer == "") return;
    if (capitalAnswer.toUpperCase() == this.country.capital.toUpperCase()) {
      this.capitalInput.nativeElement.value = this.country.capital;
      this.capitalAnswered = true;
      this.capitalInput.nativeElement.disabled = true;
      this.scoreUpEvent.emit();
      this.checkAnswers();
    }
    else {
      this.capitalAttemptsLeft--;
      if(this.capitalAttemptsLeft > 0)
        this.capitalInput.nativeElement.value = "";
      else {
        this.setCapitalIncorrect();
        this.checkAnswers();
      }
    }
  }

  checkAnswers(): void {
    if(!this.nameAnswered && !this.nameIncorrect) this.nameInput.nativeElement.focus();
    else if(!this.capitalAnswered && !this.capitalIncorrect) this.capitalInput.nativeElement.focus();
    else if(!this.mapOpened && !this.mapAnswered && !this.mapIncorrect) this.openDialog();
    else this.completedEvent.emit();
  }

  setNameIncorrect(): void {
    this.nameInput.nativeElement.value = this.country.shortName;
    this.nameInput.nativeElement.disabled = true;
    this.nameInput.nativeElement.style.color = "rgb(179, 27, 27)";
    this.nameIncorrect = true;
  }

  setCapitalIncorrect(): void {
    this.capitalInput.nativeElement.value = this.country.capital;
    this.capitalInput.nativeElement.disabled = true;
    this.capitalInput.nativeElement.style.color = "rgb(179, 27, 27)";
    this.capitalIncorrect = true;
  }


  isCompleted(): boolean {
    if((this.nameAnswered || this.nameIncorrect) && (this.capitalAnswered || this.capitalIncorrect) && (this.mapAnswered || this.mapIncorrect))
      return true;
    return false;
  }

  reset(): void {
    this.capitalAnswered = false;
    this.nameAnswered = false;
    this.mapAnswered = false;
    this.capitalIncorrect = false;
    this.nameIncorrect = false;
    this.mapIncorrect = false;
    this.mapOpened = false;
    this.capitalInput.nativeElement.disabled = false;
    this.capitalInput.nativeElement.value = "";
    this.nameInput.nativeElement.style.color = "";
    this.nameInput.nativeElement.disabled = false;
    this.nameInput.nativeElement.value = "";
    this.capitalInput.nativeElement.style.color = "";
  }

  disable(): void {
    if (!this.nameAnswered) this.setNameIncorrect();
    if (!this.capitalAnswered) this.setCapitalIncorrect();
    if (!this.mapAnswered) this.mapIncorrect = true;
  }

  toView(): void {
    this.testItemHolder.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  openDialog(): void {
    this.mapOpened = true;
    if(!this.mapAnswered && !this.mapIncorrect) {
      const dialogRef = this.dialog.open(QuizMapComponent, { 
        data: {
          isoCode: this.country.isoCode,
          attemptsLeft: this.mapAttemptsLeft
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == "good-answer") {
          this.mapAnswered = true;
          this.scoreUpEvent.emit();
          this.checkAnswers();
        }
        else {
          this.mapAttemptsLeft = result;
          if (this.mapAttemptsLeft == 0)
            this.mapIncorrect = true;
            this.checkAnswers();
        }
      });
    }
  }
}
