import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPlayersPage } from '../modals/add-players/add-players.page';
import { GameStateService } from '../services/game-state.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public faDice = faDice

  public players = []

  constructor(
    private modalController: ModalController,
    private gameService: GameStateService
  ) { }

  ionViewDidEnter() {
    this.players = this.gameService.listPlayers()
  }

  async addPlayers() {
    const modal = await this.modalController.create({
      component: AddPlayersPage
    });
    return await modal.present()
  }


}
