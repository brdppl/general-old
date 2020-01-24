import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(data => {
      console.log('dados do modal', data)
    })
  }

  ngOnInit() {
  }

}
