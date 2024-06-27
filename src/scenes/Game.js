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
        this.add.image(0, 0, 'background').setOrigin(0);
        this.add.image(0, this.game.config.height, 'ground').setOrigin(0, 1)
        this.add.image(0, 300, 'platform').setOrigin(0);
    }
}
