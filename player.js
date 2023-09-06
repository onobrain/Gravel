// -=> player.js
import { IdleLeft , IdleRight , RunLeft ,RunRight , KneelLeft , KneelRight , JumpLeft , JumpRight , Die , AttackLeft , AttackRight , FallLeft ,FallRight , standLeft , standRight } from "./playerStates.js";

// player class : 
export class player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 32;
        this.spriteHeight = 32
        this.width = this.spriteWidth * 3
        this.height = this.spriteHeight * 3
        this.speedX = 0;
        this.vy = 0;
        this.weight = 1;
        this.jumpStrength = 20;
        this.isOnGround = true; // Initialize the player on the ground
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = PlayerImage
        this.frameY = 0
        this.frameX = 0
        this.maxFrame = 0
        this.fps = 60;
        this.frameTimer = 0;
        this.frameInterval = 5000 / this.fps
        this.currentState = null
        this.flipLeft = false;
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
            new standRight(this.game)
          ];
       }

    // -pd
    draw(context) {
        const scaleX = this.flipLeft ? -1 : 1;
        if(this.game.debug) {
            context.strokeStyle = 'red'
            context.strokeRect(this.x, this.y , this.width , this.height)    
        }
        context.save()
        context.scale(scaleX , 1)
        if(this.flipLeft) {
            context.drawImage(this.image , this.frameX * this.spriteWidth , this.frameY * this.spriteHeight , this.spriteWidth ,this.spriteHeight , -this.x - this.width, this.y , this.width , this.height);
        } else {
            context.drawImage(this.image , this.frameX * this.spriteWidth , this.frameY * this.spriteHeight , this.spriteWidth ,this.spriteHeight , this.x * scaleX , this.y , this.width , this.height);
        }
        context.restore();
    }
    

    // -pu
    update(deltaTime, input) {
        // control horizontal and vertical movement of the player.
        this.playerMovement(input);
        // animate spritesheet : 
        this.spriteAnimation(deltaTime)
        // input state handeling.
        this.currentState.HandleInput(input);

    }

    playerMovement(input) {
        // horizontal movement
        // this.x += this.speedX;
        this.game.speed = this.speedX

        if(input.includes('q') && ((this.currentState !== this.states[4]) && this.currentState !== this.states[9] && this.currentState !== this.states[10]) ) {
            this.speedX = -20
        }else if(input.includes('d')  && ((this.currentState !== this.states[5] && this.currentState !== this.states[10]  && this.currentState !== this.states[9]))){
            this.speedX = 20
        }else {
            this.speedX = 0
          }
      
        // horizontal boundaries
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement
        if (input.includes('z')  && this.isOnGround) {
            this.vy = -this.jumpStrength; // Jump upwards
            this.isOnGround = false; // Player is now in the air
        }

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
        if(this.frameTimer >= this.frameInterval) {
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0
            }
            this.frameTimer = 0
        } else  {
            this.frameTimer += deltaTime;
        }
    }

    collideWithEnemy() {
        // Check for collisions with enemies
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x  > this.x &&
                enemy.y < this.y + this.height && 
                enemy.y + enemy.height > this.y
            ) {
                return true; // Collision detected
            }
            
            return false; // No collision detected    
        });
    }
          
        setState(state , speed) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed;

        this.currentState.enter()
    }
    
    isOnGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin
    }
}
