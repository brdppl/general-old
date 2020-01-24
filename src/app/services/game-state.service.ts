import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  public playersToken = '12345@@@PlAyErS###54321'

  constructor(private storage: Storage) { }

  // public storagePlayers = (players) => localStorage.setItem(this.playersToken, JSON.stringify(players))
  public storagePlayers = (players) => this.storage.set(this.playersToken, players)

  // public listPlayers = () => JSON.parse(localStorage.getItem(this.playersToken))

  // public destroyGame = () => localStorage.removeItem(this.playersToken)
}
