import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AddPlayersPage } from '../modals/add-players/add-players.page';
import { GameStateService } from '../services/game-state.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Storage } from '@ionic/storage';

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
    private gameService: GameStateService,
    private alert: AlertController,
    private storage: Storage
  ) { }

  ionViewDidEnter() {
    this.storage.get(this.gameService.playersToken).then(data => {
      this.players = data
    })
  }

  public addPlayers() {
    if(this.players) {
      this.handle()
    } else {
      this.createModal()
    }
  }

  private async createModal() {
    const modal = await this.modalController.create({
      component: AddPlayersPage
    });
    return await modal.present()
  }

  async handle() {
    const alert = await this.alert.create({
      header: 'Atenção',
      subHeader: 'Jogo em andamento!',
      message: 'Você já possui um jogo em andamento, deseja começar outro do zero?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'OK',
          handler: () => {
            this.createModal()
          }
        }
      ]
    });

    await alert.present();
  }

}
