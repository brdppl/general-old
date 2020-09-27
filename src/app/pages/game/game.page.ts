import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UtilsService } from 'src/app/services/utils.service';
import * as _ from 'lodash';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public players = []

  public isShowingAnimation: boolean = false
  public result: string
  public score: string

  constructor(
    private gameService: GameStateService,
    private nav: NavController,
    private alert: AlertController,
    private storage: Storage,
    private util: UtilsService,
    private keyboard: Keyboard
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
    
    setTimeout(() => {
      this.runAnimation(this.players)
    }, 2000)
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
            this.gameService.destroyGame()
          }
        }
      ]
    });

    await alert.present();
  }

  private runAnimation(players) {
    this.keyboard.hide()
    const values = []
    const participants = []
    players.forEach(el => {
      Object.values(el).forEach(val => {
        values.push(val)
      })
      participants.push({name: el.name, total: el.total})
    })
    if(!values.includes(null)) {
      this.isShowingAnimation = true
      // const winner = participants.reduce((a, b) => (a.total > b.total) ? a : b)
      const winner = _.maxBy(participants, 'total')

      let draw = []
      const counts = _.countBy(participants, 'total')
      draw = _.filter(participants, x => counts[x.total] > 1)

      if(draw.length) {
        const tmpDraw = []
        draw.forEach(el => {
          if(winner.total > el.total) {
            this.result = this.util.randomMessage(winner.name)
            this.score = `Com ${winner.total} pontos`
          } else {
            tmpDraw.push(el.name)
            if(tmpDraw.length > 2) {
              this.result = `${tmpDraw.join(', ').replace(/, ((?:.(?!, ))+)$/, ' e $1')} empataram`
              this.score = `Com ${winner.total} pontos`
            } else {
              this.result = `${tmpDraw.join(' e ')} empataram`
              this.score = `Com ${winner.total} pontos`
            }
          }
        })
      } else {
        this.result = this.util.randomMessage(winner.name)
        this.score = `Com ${winner.total} pontos`
      }
    }
  }

  public closeAnimation() {
    if(this.isShowingAnimation) this.isShowingAnimation = false
  }

}
