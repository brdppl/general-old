import { Injectable, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  public playersToken = '12345@@@PlAyErS###54321'

  constructor(private storage: Storage) { }

  @Output() fireListPlayers: EventEmitter<any> = new EventEmitter<any>()

  public storagePlayers(players) {
    this.storage.set(this.playersToken, players)
    this.fireListPlayers.emit(players)
  }

  public getEmit = () => this.fireListPlayers

  public destroyGame() {
    this.storage.remove(this.playersToken)
    this.fireListPlayers.emit(null)
  }
}
