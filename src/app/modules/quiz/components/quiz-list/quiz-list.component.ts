import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  @Input() darkMode: boolean;
  @ViewChildren("testItem") testItems: QueryList<QuizItemComponent>;
  @Output() scoreEvent = new EventEmitter<string>();
  @Output() finishEvent = new EventEmitter();
  countryIds: number[] = [];
  score: number = 0;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
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

  updateScore(index: number): void {
    this.score++;
    this.scoreEvent.emit(this.score + "/" + this.countryIds.length);
    if(this.testItems.find(item => item.isCompleted() == false) == null)
        this.finishTest();
    else if(this.testItems.find(item => (item.id > index) && !item.isCompleted())){
      let testItem = this.testItems.find(item => (item.id > index) && !item.isCompleted());
      testItem?.nameInput.nativeElement.focus();
      testItem?.toView();
    }
    else {
      let testItem = this.testItems.find(item => !item.isCompleted());
      testItem?.nameInput.nativeElement.focus();
      testItem?.toView();
    }
  }

  finishTest(): void {
    this.finishEvent.emit();
  }

  reset(): void {
    this.testItems.forEach(item => {
      item.reset();
    });

    this.score = 0;
  }

}
