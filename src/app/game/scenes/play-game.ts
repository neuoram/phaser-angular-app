
// window.onload = function() {
//     let gameConfig = {
//         type: Phaser.AUTO,
//         backgroundColor:0x87ceeb,
//         scale: {
//             mode: Phaser.Scale.FIT,
//             autoCenter: Phaser.Scale.CENTER_BOTH,
//             parent: 'thegame',
//             width: 750,
//             height: 500
//         },
//         physics: {
//             default: 'arcade'
//         },
//         scene: PlayGame
//     }
//     game = new Phaser.Game(gameConfig);
//     window.focus();
// }

export class PlayGame extends Phaser.Scene{
    obstacleGroup: Phaser.Physics.Arcade.Group;
    firstBounce: number;
    ground: Phaser.Physics.Arcade.Sprite;
    ball: Phaser.Physics.Arcade.Sprite;
    score: number;
    topScore: string | number;
    scoreText: Phaser.GameObjects.Text;

    game;
    gameOptions = {
    bounceHeight: 300,
    ballGravity: 1200,
    ballPower: 1200,
    obstacleSpeed: 250,
    obstacleDistanceRange: [100, 250],
    localStorageName: 'bestballscore'
}
    constructor(){
        super('PlayGame');
    }
    preload(){
        this.load.image('ground', '../../assets/ballgame/ground.png');
        this.load.image('ball', '../../assets/ballgame/ball.png');
        this.load.image('obstacle', '../../assets/ballgame/obstacle.png');
    }
    create(){
        this.obstacleGroup = this.physics.add.group();
        this.firstBounce = 0;
        this.ground = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 4 * 3, 'ground');
        this.ground.setImmovable(true);
        this.ball = this.physics.add.sprite(this.game.config.width / 10 * 2, this.game.config.height / 4 * 3 - this.gameOptions.bounceHeight, 'ball');
        this.ball.body.gravity.y = this.gameOptions.ballGravity;
        this.ball.setBounce(1);
        this.ball.setCircle(25);
        let obstacleX = this.game.config.width;
        for(let i = 0; i < 10; i++){
            let obstacle = this.obstacleGroup.create(obstacleX, this.ground.getBounds().top, 'obstacle');
            obstacle.setOrigin(0.5, 1);
            obstacle.setImmovable(true);
            obstacleX += Phaser.Math.Between(this.gameOptions.obstacleDistanceRange[0], this.gameOptions.obstacleDistanceRange[1])
        }
        this.obstacleGroup.setVelocityX(-this.gameOptions.obstacleSpeed);
        this.input.on('pointerdown', this.boost, this);
        this.score = 0;
        this.topScore = localStorage.getItem(this.gameOptions.localStorageName) == null ? 0 : localStorage.getItem(this.gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);
    }
    updateScore(inc){
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
    }
    boost(){
        if(this.firstBounce != 0){
            this.ball.body.velocity.y = this.gameOptions.ballPower;
        }
    }
    getRightmostObstacle(){
        let rightmostObstacle = 0;
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            rightmostObstacle = Math.max(rightmostObstacle, this.obstacle.x);
        });
        return rightmostObstacle;
    }
    update(){
        this.physics.world.collide(this.ground, this.ball, function(){
            if(this.firstBounce == 0){
                this.firstBounce = this.ball.body.velocity.y;
            }
            else{
                this.ball.body.velocity.y = this.firstBounce;
            }
        }, null, this);
        this.physics.world.collide(this.ball, this.obstacleGroup, function(){
            localStorage.setItem(this.gameOptions.localStorageName, this.Math.max(this.score, this.topScore));
            this.scene.start('PlayGame');
        }, null, this);
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            if(this.obstacle.getBounds().right < 0){
                this.updateScore(1);
                this.obstacle.x = this.getRightmostObstacle() + Phaser.Math.Between(this.gameOptions.obstacleDistanceRange[0], this.gameOptions.obstacleDistanceRange[1]);
            }
        }, this)
    }
}