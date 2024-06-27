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
    }

    create() {
        // Background
        this.add.image(0, 0, 'background').setOrigin(0);
        // Ground
        this.physics.add.staticImage(0, this.game.config.height, 'ground').setOrigin(0, 1)
        // platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(100, 300, 'platform').setOrigin(0, 0);
        this.platforms.create(150, 250, 'platform').setOrigin(0, 0);
        this.platforms.create(250, 250, 'platform').setOrigin(0, 0);
        this.platforms.create(300, 300, 'platform').setOrigin(0, 0);
    }
}
