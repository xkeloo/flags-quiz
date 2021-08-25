import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBarComponent } from './quiz-bar.component';

describe('QuizBarComponent', () => {
  let component: QuizBarComponent;
  let fixture: ComponentFixture<QuizBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
