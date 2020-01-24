import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private playersToken = '12345@@@PlAyErS###54321'

  constructor() { }

  public storagePlayers = (players) => localStorage.setItem(this.playersToken, JSON.stringify(players))

  public listPlayers = () => JSON.parse(localStorage.getItem(this.playersToken))

  public destroyGame = () => localStorage.removeItem(this.playersToken)
}
