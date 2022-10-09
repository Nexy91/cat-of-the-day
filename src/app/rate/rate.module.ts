import { RatingComponent } from './rating/rating.component';
import { RouterModule, Routes } from '@angular/router';
import { RateComponent } from './rate.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: RateComponent }]
@NgModule({
  declarations: [RateComponent, RatingComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: []
})
export class RateModule { }
