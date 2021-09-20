import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {
  private darkMode: boolean;

  constructor() { }
  
  getDarkMode(): boolean {
    return this.darkMode;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }
}
