import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, // TODO: Remove after lazy loading
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: []
})
export class HomeModule { }
