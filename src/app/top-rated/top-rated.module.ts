import { TopRatedComponent } from './top-rated.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: TopRatedComponent }]
@NgModule({
  declarations: [TopRatedComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: []
})
export class TopRatedModule { }
