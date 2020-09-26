import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public players = []

  public showAnimation: boolean = false

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
    this.triggerAnimation(player.total)
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

  private triggerAnimation(total) {
    console.log('aaa', total)
    if(total !== 280) {
      return
    } else {
      this.animation()
    }
  }

  private animation() {
    this.showAnimation = true

    function random(num) {
      return Math.floor(Math.random()*num)
    }
    
    function getRandomStyles() {
      const r = random(255)
      const g = random(255)
      const b = random(255)
      const mt = random(200)
      const ml = random(50)
      const dur = random(5)+5
      return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r-10},${g-10},${b-10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite;
      `
    }
    
    function createBalloons(num) {
      const balloonContainer = window.document.getElementById('balloon-container')
      for (let i = num; i > 0; i--) {
        const balloon = window.document.createElement('div')
        balloon.className = 'balloon'
        balloon.style.cssText = getRandomStyles()
        balloonContainer.append(balloon)
      }
    }
    
    // window.onload = function() {
      createBalloons(100)
    // }
  }

}
