export class PlayGame extends Phaser.Scene {

    obstacleGroup: Phaser.Physics.Arcade.Group;
    firstBounce: number;
    ground: Phaser.Physics.Arcade.Sprite;
    ball: Phaser.Physics.Arcade.Sprite;
    score: number = 0;
    topScore: string | number;
    scoreText: Phaser.GameObjects.Text;
    obstacle: any;
    game;
    betweenObstacle: number;

    gameOptions = {
        bounceHeight: 300,
        ballGravity: 1200,
        ballPower: 1200,
        obstacleSpeed: 250,
        obstacleDistanceRange: [100, 250],
        localStorageName: 'bestballscore'
    }
    constructor() {
        super('PlayGame');
    }
    preload() {
        this.load.image('ground', '../../assets/ballgame/ground.png');
        this.load.image('ball', '../../assets/ballgame/ball.png');
        this.load.image('obstacle', '../../assets/ballgame/obstacle.png');
    }
    create() {
        this.obstacleGroup = this.physics.add.group();
        this.firstBounce = 0;

        this.ground = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 4 * 3, 'ground');
        this.ground.setImmovable(true);

        this.ball = this.physics.add.sprite(this.game.config.width / 10 * 2, this.game.config.height / 4 * 3 - this.gameOptions.bounceHeight, 'ball');
        this.ball.body.gravity.y = this.gameOptions.ballGravity;
        this.ball.setBounce(1);
        this.ball.setCircle(25);

        let obstacleX = this.game.config.width;
        for (let i = 0; i < 101; i++) {
            this.obstacle = this.obstacleGroup.create(obstacleX, this.ground.getBounds().top, 'obstacle');
            this.obstacle.setOrigin(0.5, 1);
            this.obstacle.setImmovable(true);
            this.betweenObstacle = Phaser.Math.Between(this.gameOptions.obstacleDistanceRange[0], this.gameOptions.obstacleDistanceRange[1]);
            obstacleX += this.betweenObstacle;
        }
        this.obstacleGroup.setVelocityX(-this.gameOptions.obstacleSpeed);
        this.input.on('pointerdown', this.boost, this);
        this.score = 0;
        this.topScore = 101;
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);
    }
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = 'World Best Score: ' + this.topScore + '\nScore: ' + this.score;
    }
    boost() {
        if (this.firstBounce != 0) {
            this.ball.body.velocity.y = this.gameOptions.ballPower;
        }
    }

    update() {
        this.physics.world.collide(this.ground, this.ball, function () {
            if (this.firstBounce == 0) {
                this.firstBounce = this.ball.body.velocity.y;
                //this.ball.body.gravity.y = 3980;//1080 - 3980
            }
            else {
                this.updateScore(1);

                this.ball.body.velocity.y = this.firstBounce;
            }
        }, null, this);

        this.physics.world.collide(this.ball, this.obstacleGroup, function () {
            this.scene.start('PlayGame');
        }, null, this);

        this.obstacleGroup.getChildren().forEach(function () {
            if (this.obstacle.getBounds().right < 0) {
                this.updateScore(1);
            }
        }, this)
    }
}