import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'app-quiz-bar',
  templateUrl: './quiz-bar.component.html',
  styleUrls: ['./quiz-bar.component.scss']
})
export class QuizBarComponent implements OnInit {
  @Input() darkMode: boolean;
  @Input() score: string;
  @Output() resetEvent = new EventEmitter();
  @Output() darkModeEvent = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.resetEvent.emit();
  }

  toggleDarkMode(): void {
    this.darkModeEvent.emit();
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(HelpDialogComponent, { data: this.darkMode });

      dialogRef.afterClosed().subscribe();
  }
}
