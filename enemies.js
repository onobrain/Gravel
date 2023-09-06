// -=> enemies.js
import { MoveLeft, MoveRight , AttackLeft , AttackRight} from "./enemiesStates.js";
// parent class:
class Enemy {
  constructor(game) {
    this.game = game;
    this.frameY = 0;
    this.fps = 20;
    this.deltaTime = 0
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = 0;
    this.toLeft = false;
    this.isAttacking = false; 
    this.states = [
        new MoveLeft(this),
        new MoveRight(this),
        new AttackLeft(this),
        new AttackRight(this)
    ];
    this.player = this.game.player;
    this.currentState = this.states[0]
  }

  // -enu
  update(deltaTime) {
    this.deltaTime = deltaTime
    // animate sprite
    if (this.frameTimer > this.frameInterval) {
      if (this.frameY < this.maxFrame) this.frameY++;
      else this.frameY = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    //check if dead :
    if (this.lives <= 0) {
      this.markedForDeletion = true;
    }
    // handle states transitions
    this.currentState.transition(this.player , deltaTime)
    // handle attack
  
  }

  checkCollision() {
    if (
        this.player &&
        this.x < this.player.x + this.player.width &&
        this.x + this.width > this.player.x &&
        this.y < this.player.y + this.player.height &&
        this.y + this.height > this.player.y
    ) {
        return true;
    } else {
        return false;
    }
}

  // -end
  draw(context) {
    context.save();
    context.strokeStyle = "red";

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    if (this.toLeft) {
      context.scale(-1, 1);
      context.drawImage(
        this.image,
        0,
        this.frameY * this.SpriteHeight,
        this.SpriteWidth,
        this.SpriteHeight,
        -this.x - this.width + this.xAdjustment,
        this.y + this.yAdjustment,
        this.scaledWidth,
        this.scaledHeight
      );

      context.restore();
    } else {
      context.drawImage(
        this.image,
        0,
        this.frameY * this.SpriteHeight,
        this.SpriteWidth,
        this.SpriteHeight,
        this.x + this.xAdjustment,
        this.y + this.yAdjustment,
        this.scaledWidth,
        this.scaledHeight
      );
    }
  }

  // enemy state;
  setState(state) {
    this.currentState = this.states[state]
    this.currentState.enter(this.enemyName , this.deltaTime)
  }
}

// LEVEL 1 ENEMIES
export class Sprout extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.enemyName ='sprout';
    this.SpriteWidth = 96;
    this.SpriteHeight = 96;
    this.width = this.SpriteWidth;
    this.height = this.SpriteHeight;
    this.scaledWidth = this.SpriteWidth * 2.5;
    this.scaledHeight = this.SpriteHeight * 2.5;
    this.xAdjustment = (this.width - this.scaledWidth) / 2;
    this.yAdjustment = -this.height;
    this.x = Math.random() * this.game.width - this.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.maxFrame = 4
    this.speedModifier;

    this.currentState = this.states[0]
    // images :
    this.sproutIdleImage = document.getElementById("sproutIdle");

    this.sproutMoveImage = document.getElementById("sproutMove");

    this.sproutDamageImage = document.getElementById("sproutDamage");

    this.sproutAttackImage = document.getElementById("sproutAttack");

    this.sproutDeathImage = document.getElementById("sproutDeath");

    this.image = this.sproutMoveImage;
    this.speedX = 1;
    this.lives = 2;
  }

update(deltaTime) {
    super.update(deltaTime);
    // mouvement.
    if (this.toLeft) {
      this.x -= this.speedX * this.game.speed + this.speedModifier;
    } else {
      this.x -= this.speedX * this.game.speed - this.speedModifier;
    }
  }
}

// export class Seeker extends Enemy {
//     constructor(game) {
//         super();
//         this.game = game;
//         this.enemyName = 'seeker'
//         this.SpriteWidth = 120
//         this.SpriteHeight = 120
//         this.width = this.SpriteWidth;
//         this.height = this.SpriteHeight;;
//         this.scaledWidth = this.SpriteWidth * 1.5;
//         this.scaledHeight = this.SpriteHeight * 1.5;
//         this.xAdjustment = (this.width - this.scaledWidth) / 2;
//         this.yAdjustment = (this.height - this.scaledHeight) / 2;
//         this.x = Math.random() * this.game.width - this.width;
//         this.y = this.game.height - this.height - this.game.groundMargin;
//         this.maxFrame;;
//         this.image;
//         this.speedX = 1;
//         this.lives = 2
//     }
// }

// export class Golem extends Enemy {
//     constructor(game) {
//         super();
//         this.game = game;
//         this.enemyName = 'golem'
//         this.SpriteWidth = 160
//         this.SpriteHeight = 160
//         this.width = this.SpriteWidth;
//         this.height = this.SpriteHeight;;
//         this.scaledWidth = this.SpriteWidth * 2.5;
//         this.scaledHeight = this.SpriteHeight * 2.5;
//         this.xAdjustment = (this.width - this.scaledWidth) / 2;
//         this.yAdjustment = (-this.height);
//         this.x = Math.random() * this.game.width - this.width;
//         this.y = this.game.height - this.height - this.game.groundMargin;
//         this.maxFrame;;
//         this.image;
//         this.speedX = 1;
//         this.lives = 4
//     }
// }
// // ***************************************************************************************
