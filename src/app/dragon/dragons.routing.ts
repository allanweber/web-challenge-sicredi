import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DragonEditComponent } from './dragon-edit/dragon-edit.component';
import { DragonListComponent } from './dragon-list/dragon-list.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
  { path: 'dragons', component: DragonListComponent, canActivate: [AuthGuard] },
  {
    path: 'dragons/:id',
    component: DragonEditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'dragons/detail/:id',
    component: DragonEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dragons/new',
    component: DragonEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DragonRoutingModule {}
