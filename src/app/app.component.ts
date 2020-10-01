import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GameStateService } from './services/game-state.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';

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
      icon: 'home',
      route: 'root'
    },
    {
      title: 'Regras',
      url: '/rules',
      icon: 'bookmarks',
      route: 'forward'
    }
  ];

  public faDice = faDice

  public isIOS: boolean
  public players = []

  public isDarkMode: boolean

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public gameService: GameStateService,
    private storage: Storage,
    private device: Device
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false)
      this.statusBar.backgroundColorByHexString('#111111')
      this.splashScreen.hide()

      this.isIOS = this.platform.is('ios')

      this.storage.get(this.gameService.playersToken).then(data => {
        this.players = data
      })
  
      this.gameService.getEmit().subscribe(data => {
        this.players = data
      })

      this.storage.get('dark-mode').then(data => {
        this.isDarkMode = data
        if(data) {
          document.body.setAttribute('data-theme', 'dark')
        } else {
          document.body.removeAttribute('data-theme')
        }
      })
    });
  }

  public toggleTheme() {
    if(this.isDarkMode) {
      document.body.removeAttribute('data-theme');
      this.isDarkMode = false
      this.storage.set('dark-mode', this.isDarkMode)
    } else {
      document.body.setAttribute('data-theme', 'dark');
      this.isDarkMode = true
      this.storage.set('dark-mode', this.isDarkMode)
    }
  }

  public toggleDark(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
      this.isDarkMode = true
      this.storage.set('dark-mode', this.isDarkMode)
    } else {
      document.body.removeAttribute('data-theme');
      this.isDarkMode = false
      this.storage.set('dark-mode', this.isDarkMode)
    }
  }

   private colorTest(systemInitiatedDark) {
    if(systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }

  public checkDeviceVersion() {
    const major = Number(this.device.version.split('.')[0])
    let version
    if(!this.isIOS) {
      version = major >= 10
    } else {
      version = major >= 13
    }
    return version
  }
}
