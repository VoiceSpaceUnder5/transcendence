import {Socket} from 'net';
import Phaser from 'phaser';
import {GameScene} from './GameScene';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {y: 0},
    },
  },
  scene: [GameScene],
};
