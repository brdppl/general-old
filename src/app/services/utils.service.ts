import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Random alert message
  public randomMessage(playerName: string) {
    const random = Math.floor(Math.random() * 4)
    
    switch(random) {
      case 0:
        return `${this.capitalize(playerName)} é um losko!`
      case 1:
        return `Nunca duvidei do ${this.capitalize(playerName)}!`
      case 2:
        return `${this.capitalize(playerName)} humilhou geral!`
      case 3:
        return `${this.capitalize(playerName)} é o nome da fera!`
    }
  }
}
