import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DragonListComponent } from './dragon-list/dragon-list.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { DragonEditComponent } from './dragon-edit/dragon-edit.component';

const routes: Routes = [
  { path: 'dragons', component: DragonListComponent, canActivate: [AuthGuardService] },
  { path: 'dragons/:id', component: DragonEditComponent, canActivate: [AuthGuardService] },
  { path: 'dragons/detail/:id', component: DragonEditComponent, canActivate: [AuthGuardService] },
  { path: 'dragons/new', component: DragonEditComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DragonRoutingModule {}
