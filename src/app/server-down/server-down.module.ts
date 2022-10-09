import { ServerDownComponent } from './server-down.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: ServerDownComponent }]
@NgModule({
  declarations: [ServerDownComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: []
})
export class ServerDownModule { }
