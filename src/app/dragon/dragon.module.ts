import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonListComponent } from './dragon-list/dragon-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragonRoutingModule } from './dragons.routing';
import { DragonEditComponent } from './dragon-edit/dragon-edit.component';
import { DragonService } from './services/dragon.service';

@NgModule({
  declarations: [DragonListComponent, DragonEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragonRoutingModule
  ],
  providers: [DragonService]
})
export class DragonModule { }
