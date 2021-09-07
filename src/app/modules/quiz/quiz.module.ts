import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatDialogModule } from '@angular/material/dialog';

import { QuizItemComponent } from './components/quiz-item/quiz-item.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizMapComponent } from './components/dialogs/quiz-map/quiz-map.component';
import { QuizComponent } from './quiz.component';
import { QuizBarComponent } from './components/quiz-bar/quiz-bar.component';
import { HelpDialogComponent } from './components/dialogs/help-dialog/help-dialog.component';
import { QuizFinishedDialogComponent } from './components/dialogs/quiz-finished-dialog/quiz-finished-dialog.component';
import { SettingsDialogComponent } from './components/dialogs/settings-dialog/settings-dialog.component';



@NgModule({
  declarations: [
    QuizItemComponent,
    QuizListComponent,
    QuizMapComponent,
    QuizComponent,
    QuizBarComponent,
    HelpDialogComponent,
    QuizFinishedDialogComponent,
    SettingsDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  entryComponents: [
    QuizMapComponent
  ],
  exports: [QuizComponent]
})
export class QuizModule { }
