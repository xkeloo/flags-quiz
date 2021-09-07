import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  attemptsAvaiable: number;
  timerSetting: number;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      first: boolean,
      attemptsAvaiable: number,
      timerSetting: number
    }) { }

  ngOnInit(): void {
    this.attemptsAvaiable = this.data.attemptsAvaiable;
    this.timerSetting = this.data.timerSetting;
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape")
        this.onClose(false);
    })

    this.dialogRef.backdropClick().subscribe(event => {
      this.onClose(false);
    })
  }

  onClose(restart: boolean): void {
    this.dialogRef.close({
      attemptsAvaiable: this.attemptsAvaiable,
      timerSetting: this.timerSetting,
      restart: restart
    });
  }


  attemptsSliderMoved(sliderValue: string): void {
    this.attemptsAvaiable = +sliderValue;
  }

  minutesSliderMoved(sliderValue: string): void {
    this.timerSetting = +sliderValue;
  }
}
