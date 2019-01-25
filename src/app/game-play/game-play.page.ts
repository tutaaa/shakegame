import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import {AngularFireDatabase,AngularFireObject} from '@angular/fire/database'
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
