import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from './main-scene';
import { SettingsMenu } from './settings-menu';

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
      height: 600,
      width: 800,
      scene: [MainScene, SettingsMenu],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
