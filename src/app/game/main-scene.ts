import { Button } from './Button';

export class MainScene extends Phaser.Scene {
  gameSettings: any;
  defaultSettings: any = [
    { setting: 'music', value: true },
    { setting: 'sfx', value: true }
  ];

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.image('gradient', '../../assets/gradient.png');
    this.load.image('button', '../../assets/green_button02.png');
    this.load.image('button_pressed', '../../assets/green_button03.png');
    this.load.audio('buttonSound', '../../assets/switch33.wav');
    this.load.audio('backgroundMusic', '../../assets/Alexander Ehlers - Twists.mp3');
  }

  create() {
    this.gameSettings = JSON.parse(localStorage.getItem('myGameSettings'));
    if (this.gameSettings === null || this.gameSettings.length <= 0) {
      localStorage.setItem('myGameSettings', JSON.stringify(this.defaultSettings));
      this.gameSettings = this.defaultSettings;
    }

    this.add.image(0, 0, 'gradient');
    const settingsButton = new Button(this, 100, 100, '#000', 'button', 'button_pressed', 'Settings', 'navigation', 'settings', 'settings');

    const music = this.sound.add('backgroundMusic', {
      mute: false,
      volume: 1,
      rate: 1,
      loop: true,
      delay: 200
    });

    if (this.gameSettings[0].value) {
      music.play();
    }
  }

  playButtonSound() {
    if (this.gameSettings[1].value) {
      this.sound.play('buttonSound');
    }
  }
}