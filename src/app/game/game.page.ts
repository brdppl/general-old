import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public players = []

  constructor(
    private gameService: GameStateService,
    private nav: NavController,
    private alert: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.loadPlayers()
  }

  private loadPlayers() {
    this.storage.get(this.gameService.playersToken).then(data => {
      this.players = data
    })
  }

  public calcTotal(player) {
    let newArr = []
    this.players.forEach((el, i) => {
      if(i === player.index) {
        newArr.push({
          total: (el.ponto1 || 0)+(el.ponto2 || 0)+(el.ponto3 || 0)+(el.ponto4 || 0)+(el.ponto5 || 0)+(el.ponto6 || 0)+(el.pontoS || 0)+(el.pontoF || 0)+(el.pontoP || 0)+(el.pontoG || 0)
        })
        player.total = newArr[0].total
      }
    })
    this.gameService.storagePlayers(this.players)
  }

  public finish() {
    this.handle()
  }

  async handle() {
    const alert = await this.alert.create({
      header: 'Atenção',
      message: 'Deseja realmente finalizar esta partida?',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            this.nav.navigateRoot(['/home'])
            this.storage.remove(this.gameService.playersToken)
          }
        }
      ]
    });

    await alert.present();
  }

}
