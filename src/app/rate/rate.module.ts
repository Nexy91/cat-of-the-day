import { RatingComponent } from './rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { RateComponent } from './rate.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'rate', component: RateComponent }
]

@NgModule({
  declarations: [RateComponent, RatingComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, // TODO: Remove after lazy loading
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: []
})
export class RateModule { }
