import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFinishedDialogComponent } from './quiz-finished-dialog.component';

describe('QuizFinishedDialogComponent', () => {
  let component: QuizFinishedDialogComponent;
  let fixture: ComponentFixture<QuizFinishedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizFinishedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizFinishedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
