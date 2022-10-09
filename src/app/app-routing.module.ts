import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RateComponent } from './rate/rate.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { RateModule } from './rate/rate.module';
import { TopRatedModule } from './top-rated/top-rated.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

// TODO: Implement lazy loading
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'rate',
    component: RateComponent
    // loadChildren: () => import('./rate/rate.module').then(m => m.RateModule)
  },
  {
    path: 'top-rated',
    component: TopRatedComponent,
    // loadChildren: () => import('./top-rated/top-rated.module').then(m => m.TopRatedModule)
  },
  {
    path: "**",
    redirectTo: 'home'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // TODO: Remove after lazy loading
    HomeModule,
    RateModule,
    TopRatedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
