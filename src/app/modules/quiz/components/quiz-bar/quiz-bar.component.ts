import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  reset(): void {
    this.resetEvent.emit();
  }

  toggleDarkMode(): void {
    this.darkModeEvent.emit();
  }
}
