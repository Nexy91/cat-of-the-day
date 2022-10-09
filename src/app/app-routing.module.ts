import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'rate',
    loadChildren: () => import('./rate/rate.module').then(m => m.RateModule)
  },
  {
    path: 'top-rated',
    loadChildren: () => import('./top-rated/top-rated.module').then(m => m.TopRatedModule)
  },
  {
    path: 'server-down',
    loadChildren: () => import('./server-down/server-down.module').then(m => m.ServerDownModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
