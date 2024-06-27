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
        this.platforms.create(0, 300, 'platform');
        this.platforms.create(600, 400, 'platform');
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');
    }
}
