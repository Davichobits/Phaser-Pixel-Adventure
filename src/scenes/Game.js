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

        this.load.spritesheet('frog', 'frog_idle.png', { frameWidth: 32, frameHeight: 32 });
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
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.1);
        // Collisions
        this.physics.add.collider(this.player, this.ground);
    }
}
