export class Button extends Phaser.GameObjects.Container {
    targetScene: any;
    currentText: any;
  
    constructor(scene, x, y, fontColor, key1, key2, text, type, name, targetScene?) {
      super(scene);
  
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.name = name;
  
      if (type === 'navigation') {
        this.targetScene = targetScene;
      } else if (type === 'toggle') {
        this.currentText = text;
      }
  
      const button = this.scene.add.image(x, y, key1).setInteractive();
      // tslint:disable-next-line:prefer-const
      let buttonText = this.scene.add.text(x, y, text, {
        fontSize: '28px', color: fontColor
      });
      Phaser.Display.Align.In.Center(buttonText, button);
      this.add(button);
      this.add(buttonText);
      button.on('pointerdown', () => {
        button.setTexture(key2);
        scene.playButtonSound();
      });
      button.on('pointerup', () => {
        button.setTexture(key1);
        if (this.targetScene) {
          setTimeout(() => {
            this.scene.scene.launch(targetScene);
            this.scene.scene.stop(scene);
          }, 300);
        } else if (this.currentText) {
          buttonText.text = buttonText.text === 'On' ? 'Off' : 'On';
          scene.toggleItem(this, buttonText.text);
        }
      });
      this.scene.add.existing(this);
    }
}