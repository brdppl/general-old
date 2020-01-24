import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public players = []

  private oldArr = []

  constructor(
    private gameService: GameStateService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.loadPlayers()
  }

  private loadPlayers() {
    this.players = this.gameService.listPlayers()
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
    this.nav.navigateRoot(['/home'])
    this.gameService.destroyGame()
  }

}
