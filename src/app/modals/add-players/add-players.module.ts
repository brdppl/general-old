import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlayersPageRoutingModule } from './add-players-routing.module';

import { AddPlayersPage } from './add-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddPlayersPageRoutingModule
  ],
  declarations: [AddPlayersPage]
})
export class AddPlayersPageModule {}
