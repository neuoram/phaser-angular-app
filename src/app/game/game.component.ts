import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
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
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
