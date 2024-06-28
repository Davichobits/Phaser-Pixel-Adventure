import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');

        this.load.image('background', 'bg.png');
        this.load.image('ground', 'ground.png');
        this.load.image('platform', 'platform.png');

        // spritesheets
        this.load.spritesheet('frog', 'frog_idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('frog_jump', 'frog_jump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('frog_run', 'frog_run.png', { frameWidth: 32, frameHeight: 32 });
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
        this.player = this.physics.add.sprite(0, 0, 'frog');
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
        // Play the animation
        this.player.anims.play('idle');
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();

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
}
