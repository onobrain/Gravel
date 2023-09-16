// -=> enemieState.js

const states = {
  MOVE_LEFT: 0,
  MOVE_RIGHT: 1,
  ATTACK_LEFT: 2,
  ATTACK_RIGHT: 3,
  DIE: 4,
  HIT_LEFT : 5,
  HIT_RIGHT: 6,
};

class State {
  constructor(state, enemy) {
    this.state = state;
    this.enemy = enemy;
  }
}

//------------------------------------------------------------------------
// -move l
export class MoveLeft extends State {
  constructor(enemy) {
    super("MOVE left", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.maxFrame = 4;
        this.enemy.speedModifier = Math.random() * 5 + 5;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.sproutMoveImage;
        break;
      case "seeker":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = Math.random() * 3 + 3;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.seekerMoveImage;
        break;
      case "golem":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = Math.random() * 2.5 + 1;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.golemMoveImage;
        break;
    }
  }

  transition(player, deltaTime) {
    if (this.enemy.isAttacking) {
      return;
    }

    if (this.enemy.checkCollision()) {
      this.enemy.setState(states.ATTACK_LEFT);
    } else if (this.enemy.x < player.x) {
      this.enemy.setState(states.MOVE_RIGHT);
    } else if (this.enemy.x > player.x) {
      this.enemy.setState(states.MOVE_LEFT);
    } else if (this.enemy.checkCollision() && player.isAttacking && (this.enemy.lives > 0)) {
      this.enemy.setState(states.HIT_LEFT);
    } else if(this.enemy.lives == 0) {
        this.enemy.setState(states.DIE)
    }
  }
}
//------------------------------------------------------------------------
// -move r
export class MoveRight extends State {
  constructor(enemy) {
    super("MOVE right", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.maxFrame = 4;
        this.enemy.speedModifier = Math.random() * 5 + 5;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.sproutMoveImage;
        break;
      case "seeker":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = Math.random() * 3 + 3;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.seekerMoveImage;
        break;
      case "golem":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = Math.random() * 2.5 + 1;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.golemMoveImage;
        break;
    }
  }

  transition(player, deltaTime) {
    if (this.enemy.isAttacking) {
      return;
    }

    if (this.enemy.checkCollision()) {
      this.enemy.setState(states.ATTACK_RIGHT);
    } else if (this.enemy.x > player.x) {
      this.enemy.setState(states.MOVE_LEFT);
    } else if (this.enemy.x < player.x) {
      this.enemy.setState(states.MOVE_RIGHT);
    } else if (this.enemy.checkCollision() && player.isAttacking && (this.enemy.lives > 0)) {
      this.enemy.setState(states.HIT_RIGHT);
    } else if(this.enemy.lives == 0) {
        this.enemy.setState(states.DIE)
    }
  }
}
//------------------------------------------------------------------------
// -attack l
export class AttackLeft extends State {
  constructor(enemy) {
    super("ATTACK left", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = true;
        this.enemy.maxFrame = 5;
        this.enemy.image = this.enemy.sproutAttackImage;
        break;
      case "seeker":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.seekerAttackImage;
        break;
      case "golem":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.golemAttackImage;
        break;
    }
  }

  transition(player, deltaTime) {
    if (!this.enemy.isAttacking) {
      this.enemy.isAttacking = true;
    }

    if (
      !this.enemy.checkCollision() &&
      this.enemy.frameY >= this.enemy.maxFrame
    ) {
      this.enemy.isAttacking = false; // Reset isAttacking when transitioning out of attack state
      this.enemy.setState(states.MOVE_LEFT);
    } else if (this.enemy.checkCollision() && player.isAttacking && (this.enemy.lives > 0)) {
      this.enemy.setState(states.HIT_LEFT);
    } else if(this.enemy.lives == 0) {
        this.enemy.setState(states.DIE)
    }
  }
}
//------------------------------------------------------------------------
// -attack r
export class AttackRight extends State {
  constructor(enemy) {
    super("ATTACK right", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = 0;
        this.enemy.image = this.enemy.sproutAttackImage;
        this.enemy.toLeft = false;
        break;
      case "seeker":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.seekerAttackImage;
        break;
      case "golem":
        this.enemy.maxFrame = 5;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.golemAttackImage;
        break;
    }
  }

  transition(player, deltaTime) {
    if (!this.enemy.isAttacking) {
      this.enemy.isAttacking = true;
    }

    if (
      !this.enemy.checkCollision() &&
      this.enemy.frameY >= this.enemy.maxFrame
    ) {
      this.enemy.isAttacking = false; // Reset isAttacking when transitioning out of attack state
      this.enemy.setState(states.MOVE_LEFT);
    } else if (this.enemy.checkCollision() && player.isAttacking && (this.enemy.lives > 0)) {
      this.enemy.setState(states.HIT_RIGHT);
    } else if(this.enemy.lives == 0) {
        this.enemy.setState(states.DIE)
    }
  }
}
//------------------------------------------------------------------------

// -hit l
export class HitLeft extends State {
  constructor(enemy) {
    super("HIT left", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.maxFrame = 4;
        this.enemy.speedModifier = 0;
        this.enemy.image = this.enemy.sproutDamageImage;
        this.enemy.toLeft = true;
        break;
      case "seeker":
        this.enemy.maxFrame = 3;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.seekerDamageImage;
        break;
      case "golem":
        this.enemy.maxFrame = 3;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = true;
        this.enemy.image = this.enemy.golemDamageImage;
        break;
    }
    console.log(this.enemy.lifes);
    

  }

  transition(player, deltaTime) {
    if((this.enemy.lives > 0)) {
      setTimeout(()=>{
        if(this.enemy.frameY >= this.enemy.maxFrame) {
          this.enemy.setState(states.ATTACK_LEFT)
            this.enemy.lives -= 1
            player.isAttacking = false;
        }
      } , deltaTime * 2)
    } else {
        this.enemy.setState(states.DIE)
    }
  }
}
//------------------------------------------------------------------------


// -hit r
export class HitRight extends State {
  constructor(enemy) {
    super("HIT right", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.maxFrame = 4;
        this.enemy.speedModifier = 0;
        this.enemy.image = this.enemy.sproutDamageImage;
        this.enemy.toLeft = false;
        break;
      case "seeker":
        this.enemy.maxFrame = 3;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.seekerDamageImage;
        break;
      case "golem":
        this.enemy.maxFrame = 3;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.golemDamageImage;
        break;
    }
    
    console.log(this.enemy.lives);
  }

  transition(player, deltaTime) {
    if((this.enemy.lives > 0)) {
      setTimeout(()=>{
        if(this.enemy.frameY >= this.enemy.maxFrame) {
          this.enemy.setState(states.ATTACK_RIGHT)
            this.enemy.lives -= 1
            player.isAttacking = false;
        }
          } , deltaTime * 2)
    } else {
        this.enemy.setState(states.DIE)
    }
  }
  }
//------------------------------------------------------------------------


// -die
export class Die extends State {
  constructor(enemy) {
    super("Die", enemy);
  }

  enter(enemyName) {
    switch (enemyName) {
      case "sprout":
        this.enemy.maxFrame = 7;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.sproutDeathImage;
        break;
      case "seeker":
        this.enemy.maxFrame = 4;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.seekerDeathImage;
        break;
      case "golem":
        this.enemy.maxFrame = 9;
        this.enemy.speedModifier = 0;
        this.enemy.toLeft = false;
        this.enemy.image = this.enemy.golemDeathImage;
        break;
    }

  }

  transition(player, deltaTime) {
    if (this.enemy.frameY >= this.enemy.maxFrame) {
      this.enemy.markedForDeletion = true;
    }
  }
}
//------------------------------------------------------------------------
