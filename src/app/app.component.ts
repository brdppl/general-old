import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GameStateService } from './services/game-state.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Regras',
      url: '/rules',
      icon: 'bookmarks'
    }
  ];

  public faDice = faDice

  public isIOS: boolean
  public players = []

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public gameService: GameStateService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#111111');
      this.splashScreen.hide();
      this.isIOS = this.platform.is('ios')

      this.storage.get(this.gameService.playersToken).then(data => {
        this.players = data
      })
  
      this.gameService.getEmit().subscribe(data => {
        this.players = data
      })
    });
  }
}
