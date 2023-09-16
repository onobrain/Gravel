// -=> enemies.js
import {
  MoveLeft,
  MoveRight,
  AttackLeft,
  AttackRight,
  Die,
  HitLeft,
  HitRight,
} from "./enemiesStates.js"; //enemies states.

// parent class:
class Enemy {
  constructor(game) {
    //global enemy properties.
    this.game = game;
    this.frameY = 0;
    this.fps = 20;
    this.deltaTime = 0;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.toLeft = false;
    this.isAttacking = false;
    this.isHit = false;
    this.player = this.game.player;
    // enemy states.
    this.states = [
      new MoveLeft(this),
      new MoveRight(this),
      new AttackLeft(this),
      new AttackRight(this),
      new Die(this),
      new HitLeft(this , this.player),
      new HitRight(this , this.player)
    ];
  }

  // -enu enemy update.
  update(deltaTime) {
    this.deltaTime = deltaTime; //define deltatime.
    this.spriteAnimation(deltaTime) // animate sprite
    this.currentState.transition(this.player, deltaTime); // handle states transitions
  }

  spriteAnimation(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameY < this.maxFrame) this.frameY++;
      else this.frameY = 0;
      this.frameTimer = 0;
      // console.log(this.game.eneimes.length)
    } else {
      this.frameTimer += deltaTime;
    }
  }
  
  checkCollision() {
    if (
      this.player &&
      this.x < this.player.x + this.player.width &&
      this.x + this.width > this.player.x &&
      this.y < this.player.y + this.player.height &&
      this.y + this.height > this.player.y
    ) {
      return true; //collision detected.
    } else {
      return false; //no collision with player.
    }
  }

  // enemy state;
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter(this.enemyName, this.deltaTime);
  }
}

// LEVEL 1 ENEMIES
export class Sprout extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.enemyName = "sprout";
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
    this.maxFrame = 4;
    this.speedModifier;
    this.speedX = 1;
    this.lives = 2;

    this.currentState = this.states[0];
    // images :
    this.sproutIdleImage = document.getElementById("sproutIdle");

    this.sproutMoveImage = document.getElementById("sproutMove");

    this.sproutDamageImage = document.getElementById("sproutDamage");

    this.sproutAttackImage = document.getElementById("sproutAttack");

    this.sproutDeathImage = document.getElementById("sproutDeath");

    this.image = this.sproutMoveImage;
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

export class Seeker extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.enemyName = "seeker";
    this.SpriteWidth = 120;
    this.SpriteHeight = 120;
    this.width = this.SpriteWidth;
    this.height = this.SpriteHeight;
    this.scaledWidth = this.SpriteWidth * 1.5;
    this.scaledHeight = this.SpriteHeight * 1.5;
    this.xAdjustment = (this.width - this.scaledWidth) / 2;
    this.yAdjustment = (this.height - this.scaledHeight) / 2;
    this.x = Math.random() * (this.game.width - this.width); // Corrected this line
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.maxFrame = 5;
    this.speedModifier;

    this.currentState = this.states[0];
    // images:
    this.seekerIdleImage = document.getElementById("seekerIdle");
    this.seekerMoveImage = document.getElementById("seekerMove");
    this.seekerDamageImage = document.getElementById("seekerDamage");
    this.seekerAttackImage = document.getElementById("seekerAttack");
    this.seekerDeathImage = document.getElementById("seekerDeath");

    this.image = this.seekerMoveImage;
    this.speedX = 1;
    this.lives = 2;
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

  update(deltaTime) {
    super.update(deltaTime);
    // movement.
    if (this.toLeft) {
      this.x -= this.speedX * this.game.speed + this.speedModifier;
    } else {
      this.x -= this.speedX * this.game.speed - this.speedModifier;
    }
  }
}

export class Golem extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.enemyName = "golem";
    this.SpriteWidth = 160;
    this.SpriteHeight = 160;
    this.width = this.SpriteWidth;
    this.height = this.SpriteHeight;
    this.scaledWidth = this.SpriteWidth * 2.5;
    this.scaledHeight = this.SpriteHeight * 2.5;
    this.xAdjustment = (this.width - this.scaledWidth) / 2;
    this.yAdjustment = -this.height;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.maxFrame = 5;
    this.speedModifier;

    this.currentState = this.states[0];
    // images:
    this.golemIdleImage = document.getElementById("golemIdle");
    this.golemMoveImage = document.getElementById("golemMove");
    this.golemDamageImage = document.getElementById("golemDamage");
    this.golemAttackImage = document.getElementById("golemAttack");
    this.golemDeathImage = document.getElementById("golemDeath");

    this.image = this.golemMoveImage;
    this.speedX = 1;
    this.lives = 4;
  }

  // -end
  draw(context) {
    context.save();
    context.strokeStyle = "red";

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    if (!this.toLeft) {
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

  update(deltaTime) {
    super.update(deltaTime);
    // movement.
    if (this.toLeft) {
      this.x -= this.speedX * this.game.speed + this.speedModifier;
    } else {
      this.x -= this.speedX * this.game.speed - this.speedModifier;
    }
  }
}
