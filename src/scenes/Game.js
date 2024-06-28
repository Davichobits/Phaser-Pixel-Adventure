import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    score = 0;
    scoreText;

    preload() {
        this.load.setPath('assets');
        // IMAGES
        this.load.image('background', 'bg.png');
        this.load.image('ground', 'ground.png');
        this.load.image('platform', 'platform.png');
        this.load.image('spike', 'spike.png');
        // SPRITES
        // frog
        this.load.spritesheet('frog', 'frog_idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('frog_jump', 'frog_jump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('frog_run', 'frog_run.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('collected', 'collected.png', { frameWidth: 32, frameHeight: 32 });
        // apple
        this.load.spritesheet('apple', 'apple.png', { frameWidth: 32, frameHeight: 32 });
        // Fonts
        this.load.bitmapFont("pixelfont", "fonts/pixelfont.png", "fonts/pixelfont.xml");
    }
    create() {
        // Background
        this.add.image(0, 0, 'background').setOrigin(0);
        // Ground
        this.ground = this.physics.add.staticImage(0, this.game.config.height - 48, 'ground').setOrigin(0, 0).refreshBody();
        // platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(100, 300, 'platform').setOrigin(0, 0).refreshBody();
        this.platforms.create(150, 250, 'platform').setOrigin(0, 0).refreshBody();
        this.platforms.create(250, 250, 'platform').setOrigin(0, 0).refreshBody();
        this.platforms.create(300, 300, 'platform').setOrigin(0, 0).refreshBody();
        // player
        this.player = this.physics.add.sprite(0, 300, 'frog');
        this.player.body.setSize(20, 25);
        this.player.body.setOffset(6, 6);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.1);
        // Collisions
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        // animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('frog', { start: 0, end: 10 }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('frog_run', { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'frog_jump', frame: 0 }],
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 0, end: 16 }),
            frameRate: 20,
            repeat: -1
        })
        // this.anims.create({
        //     key: 'collected',
        //     frames: this.anims.generateFrameNumbers('collected', { start: 0, end: 5 }),
        //     frameRate: 20,
        //     repeat: 1
        // })
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        // apples
        this.apple = this.physics.add.group({
            key: 'apple',
            repeat: 11,
            setXY: { x: 110, y: 0, stepX: 20 }
        });
        this.apple.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.body.setSize(13, 13);
            child.anims.play('apple', true);
        });
        this.physics.add.collider(this.apple, this.platforms);
        this.physics.add.collider(this.apple, this.ground);
        // collect
        this.physics.add.overlap(this.player, this.apple, this.collectApple, undefined, this);
        // score
        this.points_text = this.add.bitmapText(20, 20, "pixelfont", "Score: 0", 24);
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('run', true);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('run', true);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle', true);
        }
        // jump
        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.player.anims.play('jump', true);
        }

        // Play jump animation while in the air
        if (!this.player.body.touching.down && this.player.anims.currentAnim.key !== 'jump') {
            this.player.anims.play('jump', true);
        }
    }
    collectApple(player, apple) {
        apple.disableBody(true, true);
        this.score += 10;
        this.points_text.setText('Score: ' + this.score);
    }
}
