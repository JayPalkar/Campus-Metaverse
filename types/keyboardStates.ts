import Phaser from "phaser";

export type KeyboardStates = {
  W: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

export type controlKeys = KeyboardStates &
  Phaser.Types.Input.Keyboard.CursorKeys;
