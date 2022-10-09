import { TopRatedComponent } from './top-rated.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'top-rated', component: TopRatedComponent }
]

@NgModule({
  declarations: [TopRatedComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, // TODO: Remove after lazy loading
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: []
})
export class TopRatedModule { }
