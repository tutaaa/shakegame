import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import {AngularFireDatabase,AngularFireObject} from '@angular/fire/database'
@Component({
  selector: 'game-play-app',
  templateUrl: 'game-play.page.html',
  styleUrls: ['game-play.page.scss'],
})
export class GamePlayPage {
counter = 0
countRef: AngularFireObject<any>;
constructor(
  private vibration: Vibration,
  private deviceMotion: DeviceMotion ,
  private db: AngularFireDatabase,
  ) { 
    this.countRef = db.object('counter');
    this.countRef.valueChanges().subscribe(v=>{
      this.counter = v.value
      if(this.counter % 10 ==0){
        this.vibration.vibrate(1000);
  }
})
  }

  inc(){
    this.countRef.update({value: this.counter +1});
    }
  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;
  private subscription:any
  ionViewWillEnter(){
    this.subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe(acc => {
      console.log(acc);

      if(!this.lastX) {
        this.lastX = acc.x;
        this.lastY = acc.y;
        this.lastZ = acc.z;
        return;
      }

      let deltaX:number, deltaY:number, deltaZ:number;
      deltaX = Math.abs(acc.x-this.lastX);
      deltaY = Math.abs(acc.y-this.lastY);
      deltaZ = Math.abs(acc.z-this.lastZ);

      if(deltaX + deltaY + deltaZ > 3) {
        this.moveCounter++;
      } else {
        this.moveCounter = Math.max(0, --this.moveCounter);
      }

      if(this.moveCounter > 2) { 
        console.log('SHAKE');
        this.inc();
        this.moveCounter=0; 
      }

      this.lastX = acc.x;
      this.lastY = acc.y;
      this.lastZ = acc.z;

    });
  }
  ionViewWillLeave(){ this.subscription.unsubscribe();}


}