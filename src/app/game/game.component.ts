import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
//import { MainScene } from './main-scene';
//import { SettingsMenu } from './settings-menu';
import { PlayGame } from './scenes/play-game';

@Component({
  selector: 'app-game',
  template: ''
})
export class GameComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      backgroundColor:0x87ceeb,
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: 'thegame',
          width: 750,
          height: 500
      },
      physics: {
          default: 'arcade'
      },
      scene: [PlayGame]

      // type: Phaser.AUTO,
      // height: 600,
      // width: 800,
      // scene: [MainScene, SettingsMenu],
      // parent: 'gameContainer',
      // physics: {
      //   default: 'arcade',
      //   arcade: {
      //     gravity: { y: 100 }
      //   }
      // }
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
    //window.focus();
  }
}
