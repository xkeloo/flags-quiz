import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { Country } from '../../models/country.model';
import { ClientSettingsService } from '../../services/client-settings.service';
import { CountryService } from '../../services/country.service';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  @Input() numberOfTries: number;
  @ViewChildren("quizItem") quizItems: QueryList<QuizItemComponent>;
  @Output() scoreEvent = new EventEmitter<string>();
  @Output() finishEvent = new EventEmitter();
  countryIds: number[] = [];
  score: number = 0;

  constructor(private clientSettingsService: ClientSettingsService, private countryService: CountryService) { }

  ngOnInit(): void {
  }

  getDarkMode(): boolean {
    return this.clientSettingsService.getDarkMode();
  }

  setCountriesIds(countryIds: number[]): void {
    this.countryIds = countryIds;
  }

  getCountryById(id: number): Country {
    return this.countryService.getById(id);
  }

  onItemClick(event: Event) {
    let element = (event.currentTarget as Element);

    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  updateScore(): void {
    this.score++;
    this.scoreEvent.emit(this.score + "/" + 3*this.countryIds.length);
  }

  focusNextItem(index: number): void {
    if(this.quizItems.find(item => item.isCompleted() == false) == null)
        this.finishTest();
    else if(this.quizItems.find(item => (item.id > index) && !item.isCompleted())){
      let testItem = this.quizItems.find(item => (item.id > index) && !item.isCompleted());
      testItem?.nameInput.nativeElement.focus();
      testItem?.toView();
    }
    else {
      let testItem = this.quizItems.find(item => !item.isCompleted());
      testItem?.nameInput.nativeElement.focus();
      testItem?.toView();
    }
  }

  finishTest(): void {
    this.finishEvent.emit();
  }

  reset(): void {
    this.quizItems.forEach(item => {
      item.reset();
    });

    this.score = 0;
  }

}
