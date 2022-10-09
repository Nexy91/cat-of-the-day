import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class APPService {
  public totalCats = 5; // Number of images in assets

  constructor() { }
}