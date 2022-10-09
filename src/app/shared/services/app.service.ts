import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class APPService {
  // Number of images in assets
  public totalCats = 5;

  public getRandomCat(previousCat: number): number {
    let random: number;
    do { random = Math.floor(Math.random() * this.totalCats); }
    while (random === 0 || previousCat == random);
    return random;
  }
}