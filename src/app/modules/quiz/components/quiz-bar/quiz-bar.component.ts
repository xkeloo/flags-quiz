import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientSettingsService } from '../../services/client-settings.service';
import { HelpDialogComponent } from '../dialogs/help-dialog/help-dialog.component';
import { QuizFinishedDialogComponent } from '../dialogs/quiz-finished-dialog/quiz-finished-dialog.component';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-quiz-bar',
  templateUrl: './quiz-bar.component.html',
  styleUrls: ['./quiz-bar.component.scss']
})
export class QuizBarComponent implements OnInit {
  @Input() score: string;
  @Output() restartEvent = new EventEmitter<number>();
  @Output() quizFinishedEvent = new EventEmitter();
  attemptsAvaiable: number = 3;
  timerSetting: number = 15;
  timerTimeLeft: number = this.timerSetting*60;
  timerSeconds: string = "00";
  timerMinutes: string = "15";
  interval: any;


  constructor(private clientSettingsService: ClientSettingsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openSettingsDialog(true);
  }

  restart(): void {
    this.stopTimer();
    this.restartEvent.emit(this.attemptsAvaiable);
    this.startTimer();
  }

  toggleDarkMode(): void {
    this.clientSettingsService.toggleDarkMode();
  }

  getDarkMode(): boolean {
    return this.clientSettingsService.getDarkMode();
  }

  finishQuiz(): void {
    this.stopTimer();
    this.quizFinishedEvent.emit();
    console.log("GG")
    this.openQuizFinishedDialog();
  }

  startTimer() {
    this.timerTimeLeft = this.timerSetting*60;
    if (this.timerTimeLeft%60 > 9) this.timerSeconds = "" + this.timerTimeLeft%60;
    else this.timerSeconds = "0" + this.timerTimeLeft%60;

    if (this.timerTimeLeft/60 > 9) this.timerMinutes = "" + Math.floor(this.timerTimeLeft/60);
    else this.timerMinutes = "0" + Math.floor(this.timerTimeLeft/60);

    this.interval = setInterval(() => {
      this.timerTimeLeft--;
      if (this.timerTimeLeft%60 > 9) this.timerSeconds = "" + this.timerTimeLeft%60;
      else this.timerSeconds = "0" + this.timerTimeLeft%60;

      if (this.timerTimeLeft/60 > 9) this.timerMinutes = "" + Math.floor(this.timerTimeLeft/60);
      else this.timerMinutes = "0" + Math.floor(this.timerTimeLeft/60);

      if (this.timerTimeLeft == 0) {
        this.finishQuiz();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

  

  openQuizFinishedDialog(): void {
    let dialogRef
    if (!this.clientSettingsService.getDarkMode())
      dialogRef = this.dialog.open(QuizFinishedDialogComponent, { 
        data: this.clientSettingsService.getDarkMode(),
        panelClass: 'panel-class'
      });
    else
      dialogRef = this.dialog.open(QuizFinishedDialogComponent, { 
        data: this.clientSettingsService.getDarkMode(),
        panelClass: 'panel-class-dark'
      });
    

      dialogRef.afterClosed().subscribe();
  }

  openSettingsDialog(first: boolean): void {
    let dialogRef
    if (!this.clientSettingsService.getDarkMode())
      dialogRef = this.dialog.open(SettingsDialogComponent, { 
        data: {
          first: first,
          attemptsAvaiable: this.attemptsAvaiable,
          timerSetting: this.timerSetting
        },
        panelClass: 'panel-class'
      });
    else
      dialogRef = this.dialog.open(SettingsDialogComponent, { 
        data: {
          first: first,
          attemptsAvaiable: this.attemptsAvaiable,
          timerSetting: this.timerSetting
        },
        panelClass: 'panel-class-dark'
      });
    

      dialogRef.afterClosed().subscribe(result => {
        this.attemptsAvaiable = result.attemptsAvaiable;
        this.timerSetting = result.timerSetting;
        if (result.restart)
          this.restart();
      });
  }


  openHelpDialog(): void {
    let dialogRef
    if (!this.clientSettingsService.getDarkMode())
      dialogRef = this.dialog.open(HelpDialogComponent, { 
        data: this.clientSettingsService.getDarkMode(),
        panelClass: 'panel-class'
      });
    else
      dialogRef = this.dialog.open(HelpDialogComponent, { 
        data: this.clientSettingsService.getDarkMode(),
        panelClass: 'panel-class-dark'
      });
    

      dialogRef.afterClosed().subscribe();
  }
}
