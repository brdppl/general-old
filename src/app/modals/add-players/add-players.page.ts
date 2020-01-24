import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.page.html',
  styleUrls: ['./add-players.page.scss'],
})
export class AddPlayersPage implements OnInit {

  public players = [{name: ''}]
  public player

  constructor(
    private modalCtrl: ModalController,
    private nav: NavController
  ) { }

  ngOnInit() { }

  public dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  public newPlayer() {
    this.players.push({name: this.player})
  }

  public dropPlayer(index) {
    this.players.splice(index, 1)
  }

  public begin() {
    this.nav.navigateForward(['/game'])
    this.dismiss()
  }

}
