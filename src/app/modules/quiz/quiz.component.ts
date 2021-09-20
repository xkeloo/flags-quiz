import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QuizBarComponent } from './components/quiz-bar/quiz-bar.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { ClientSettingsService } from './services/client-settings.service';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit {
  @ViewChild("quizList") quizList: QuizListComponent;
  @ViewChild("quizBar") quizBar: QuizBarComponent;
  finished: boolean = false;
  score: string = "0/0";

  constructor(private clientSettingsService: ClientSettingsService,private countryService: CountryService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setAllCountriesList();
  }

  getDarkMode(): boolean {
    return this.clientSettingsService.getDarkMode();
  }

  updateScore(score: string) {
    this.score = score;
  }

  setAllCountriesList(): void {
    let list = this.countryService.getAllRandomizedIds();
    this.quizList.countryIds = list;
    this.score = "0/" + 3*list.length;
  }

  restart(attemptsAvailable: number): void {
    this.finished = false;
    this.setAllCountriesList();
    this.quizList.quizItems.forEach(item => {
      item.nameAttemptsLeft = attemptsAvailable;
      item.capitalAttemptsLeft = attemptsAvailable;
      item.mapAttemptsLeft = attemptsAvailable;
    });
    this.quizList.reset();
    this.quizList.quizItems.first.toView();
  }

  quizFinished(): void {
    if (this.finished) return;
    this.finished = true;
    this.quizList.quizItems.forEach(item => {
      item.dialog.closeAll();
      item.disable();
    });
  }

  quizCompleted(): void {
    if (this.finished) return;
    this.finished = true;
    this.quizBar.stopTimer();
    this.quizBar.openQuizFinishedDialog();
  }
}
