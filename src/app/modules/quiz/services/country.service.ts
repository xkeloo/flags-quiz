import { Injectable } from '@angular/core';

import { COUNTRIES } from '../models/countries-list';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getById(id: number): Country {
    return COUNTRIES[id];
  }

  getAllRandomizedIds(): number[] {
    let array: number[] = new Array(COUNTRIES.length);
    for(let i = 0; i < array.length; i++) 
      array[i] = i;

    return this.shuffleArray(array);
  }

  shuffleArray(array: any[]): any[] {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] =  [array[j], array[i]];
    }
    return array;
  }
}
