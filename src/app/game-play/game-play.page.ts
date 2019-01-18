import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.page.html',
  styleUrls: ['./game-play.page.scss'],
})
export class GamePlayPage implements OnInit {

  constructor(
    private route1:ActivatedRoute,
  ) { }

  ngOnInit(
    this.team = parseInt(this.route1.snapshot.paramMap);

  ) {
  }

}
