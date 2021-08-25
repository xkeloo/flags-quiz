import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit {
  @ViewChild("quizList") quizList: QuizListComponent;
  darkMode: boolean = false;
  score: string = "0/0";

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setAllCountriesList(); 
  }

  updateScore(score: string) {
    this.score = score;
  }

  setAllCountriesList(): void {
    let list = this.countryService.getAllRandomizedIds();
    this.quizList.countryIds = list;
    this.score = "0/" + list.length;
  }

  reset(): void {
    this.setAllCountriesList();
    this.quizList.reset();
    this.quizList.testItems.first.toView();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    console.log("theme changed!" + this.darkMode)
  }

  finishTest(): void {

  }
}
