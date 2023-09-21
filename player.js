// -=> player.js
import {
  IdleLeft,
  IdleRight,
  RunLeft,
  RunRight,
  KneelLeft,
  KneelRight,
  JumpLeft,
  JumpRight,
  Die,
  AttackLeft,
  AttackRight,
  FallLeft,
  FallRight,
  standLeft,
  standRight,
} from "./playerStates.js";  //importing player states.

// player class :
export class player {
  constructor(game) {
    //player properties.
    this.game = game;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 3;
    this.speedX = 0;
    this.vy = 0;
    this.weight = 1;
    this.jumpStrength = 20;
    this.isOnGround = true; // Initialize the player on the ground
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = PlayerImage;
    this.frameY = 0;
    this.frameX = 0;
    this.maxFrame = 0;
    this.fps = 60;
    this.frameTimer = 0;
    this.frameInterval = 5000 / this.fps;
    this.currentState = null;
    this.flipLeft = false;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.attackInterval = 1000;
    
    this.hitBox = {
      x : (this.x + this.width / 2) - 10,
      y : (this.y + this.height / 2) - 10 ,
      width : 20,
      height : 20
    }
    // player states :
    this.states = [
      new IdleLeft(this.game),
      new IdleRight(this.game),
      new RunLeft(this.game),
      new RunRight(this.game),
      new KneelLeft(this.game),
      new KneelRight(this.game),
      new JumpLeft(this.game),
      new JumpRight(this.game),
      new Die(this.game),
      new AttackLeft(this.game),
      new AttackRight(this.game),
      new FallLeft(this.game),
      new FallRight(this.game),
      new standLeft(this.game),
      new standRight(this.game),
    ];
  }

  // -pd
  draw(context) {
    
    //drawing the player based on his direction.
    const scaleX = this.flipLeft ? -1 : 1;
    // drawing player box.
    if (this.game.debug) {
      context.strokeStyle = "red";
      context.strokeRect(this.x, this.y, this.width, this.height);
      // draw player hitBox.
      if(this.flipLeft) {
        this.hitBox = {
          x : (this.x - this.width / 2) - 10,
          y : (this.y + this.height / 2) - 10 ,
          width : 20,
          height : 20
        }    
        context.fillStyle = "yellow";
        context.fillRect(this.hitBox.x , this.hitBox.y , this.hitBox.width, this.hitBox.height)
      } else {
        this.hitBox = {
          x : (this.x + this.width *1.5) - 10,
          y : (this.y + this.height / 2) - 10 ,
          width : 20,
          height : 20
        }    

        context.fillStyle = "yellow";
        context.fillRect(this.hitBox.x, this.hitBox.y , this.hitBox.width, this.hitBox.height)
      }
    }
    context.save();
    context.scale(scaleX, 1);
    if (this.flipLeft) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
    } else {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x * scaleX,
        this.y,
        this.width,
        this.height
      );
    }
    context.restore();
  }

// -pu
update(deltaTime, input) {
  // control horizontal and vertical movement of the player.
  this.playerMovement(input);
  // animate spritesheet :
  this.spriteAnimation(deltaTime);
  // input state handling.
  this.currentState.HandleInput(input);

  // Handle player attack logic
  if (this.attackTimer < this.attackInterval) {
    this.attackTimer += deltaTime;
  } else if (input.includes(' ')) {
    this.isAttacking = true;
    this.attackTimer = 0; // Reset attack timer when the attack occurs
  }

  // Check for collisions with enemies using the player's hitbox
  for (const enemy of this.game.enemies) {
    if (this.checkHitBoxCollision(enemy, this.hitBox)) {
      // Handle collision actions here
    }
  }
}

  playerMovement(input) {
    // horizontal movement
    // this.x += this.speedX;
    this.game.speed = this.speedX;

    if (
      input.includes("q") &&
      this.currentState !== this.states[4] &&
      this.currentState !== this.states[9] &&
      this.currentState !== this.states[10]
    ) {
      this.speedX = -20;
    } else if (
      input.includes("d") &&
      this.currentState !== this.states[5] &&
      this.currentState !== this.states[10] &&
      this.currentState !== this.states[9]
    ) {
      this.speedX = 20;
    } else {
      this.speedX = 0;
    }

    // horizontal boundaries
    if (this.x <= 0) this.x = 0;
    else if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movement
    if (input.includes("z") && this.isOnGround) {
      this.vy = -this.jumpStrength; // Jump upwards
      this.isOnGround = false; // Player is now in the air
    }

    // Update the hitbox y position based on the player's y position
    this.hitBox.y = (this.y + this.height / 2) - 10;


    this.y += this.vy;

    // Apply gravity
    this.vy += this.weight;

    // Check if the player landed on the ground
    if (this.y >= this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin; // Snap player to the ground
      this.vy = 0; // Reset vertical velocity
      this.isOnGround = true; // Player is on the ground
    }
  }

  spriteAnimation(deltaTime) {
    //periodically animate player spritesheet.
    if (this.frameTimer >= this.frameInterval) { //check if frame timer more or equal frame Intervale.
      if (this.frameX < this.maxFrame) { //check if currentframe is less than. max frame.
        this.frameX++; //increment the frame.
      } else {
        this.frameX = 0;//reset the fraem.
      }
      this.frameTimer = 0;//reset frame timer.
    } else {
      this.frameTimer += deltaTime; //increment frame timer by deltatime.
    }
  }

  // check if player's hitbox collided with enemy.
  checkHitBoxCollision(enemy, hitbox) {
    // Collision conditions.
    if (
      enemy.x < hitbox.x + hitbox.width &&
      enemy.x + enemy.width > hitbox.x &&
      enemy.y < hitbox.y + hitbox.height &&
      enemy.y + enemy.height > hitbox.y
    ) {
      return true; // Collision detected
    }
  
    return false; // No collision detected
  }
  
  setState(state, speed) { 
    //set the current state to the state that has been switched to from player states.
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed; //modify game speed based on the current state.

    this.currentState.enter(); //enter the current state.
  }

  isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin; //check if player is on ground.
  }
}
