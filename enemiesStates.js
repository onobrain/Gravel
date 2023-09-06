// -=> enemieState.js


const states = {
    MOVE_LEFT : 0,
    MOVE_RIGHT : 1,
    ATTACK_LEFT: 2,
    ATTACK_RIGHT : 3,
}


class State {
    constructor(state , enemy) {
        this.state = state;
        this.enemy = enemy;
    }
}

//------------------------------------------------------------------------
// -move l
export class MoveLeft extends State {
    constructor(enemy) {
        super("MOVE left" , enemy)
    }

    enter(enemyName, deltaTime) {
        switch(enemyName) {
            case 'sprout' : 
                this.enemy.maxFrame = 4;
                this.enemy.speedModifier = Math.random() * 5 + 5
                this.enemy.toLeft = true;
                this.enemy.image = this.enemy.sproutMoveImage;
            break;
        }

    }

    transition(player){
        if(this.enemy.isAttacking) {
            return;
        }


        if(this.enemy.checkCollision()){
            this.enemy.setState(states.ATTACK_LEFT)
        }else if(this.enemy.x < player.x){
            this.enemy.setState(states.MOVE_RIGHT)
        }else if(this.enemy.x > player.x) {
            this.enemy.setState(states.MOVE_LEFT)
        } 
    }
}
//------------------------------------------------------------------------
// -move r
export class MoveRight extends State {
    constructor(enemy) {
        super("MOVE right" , enemy)
    }

    enter(enemyName, deltaTime) {
        switch(enemyName) {
            case 'sprout' : 
                this.enemy.maxFrame = 4;
                this.enemy.speedModifier = Math.random() * 5 + 5
                this.enemy.toLeft = false;
                this.enemy.image = this.enemy.sproutMoveImage;
            break;
        }

    }

    transition(player){
        if (this.enemy.isAttacking) {
            return
          }
      
        if(this.enemy.checkCollision()){
            this.enemy.setState(states.ATTACK_RIGHT)
        }else if(this.enemy.x > player.x){
            this.enemy.setState(states.MOVE_LEFT)
        }else if(this.enemy.x < player.x) {
            this.enemy.setState(states.MOVE_RIGHT)
        } 
    }
}
//------------------------------------------------------------------------
// -attack l
export class AttackLeft extends State {
    constructor(enemy) {
        super("ATTACK left" , enemy);
        this.attackTimer = 0;
        this.attackInterval = 1000;
    }

    enter(enemyName, deltaTime) {
        switch(enemyName) {
            case 'sprout' : 
                this.enemy.speedModifier = 0;
                this.enemy.toLeft = true;
                this.enemy.maxFrame = 5;
                this.enemy.image = this.enemy.sproutAttackImage;
                this.attackTimer = 0; // Reset the attackTimer
            break;
        }
    }

    transition(player, deltaTime) {
        if (!this.enemy.isAttacking) {
            if (this.attackTimer >= this.attackInterval) {
                this.enemy.isAttacking = true;
            } else {
                this.attackTimer += deltaTime;
            }
        }
        
        if (!this.enemy.checkCollision() && this.enemy.frameY >= this.enemy.maxFrame) {
            this.enemy.isAttacking = false; // Reset isAttacking when transitioning out of attack state
            this.enemy.setState(states.MOVE_LEFT);
        } 
    }
}
//------------------------------------------------------------------------
// -attack r
export class AttackRight extends State {
    constructor(enemy) {
        super("ATTACK right" , enemy)
        this.attackTimer = 0,
        this.attackInterval = 1000;

    }

    enter(enemyName, deltaTime) {
        switch(enemyName) {
            case 'sprout' : 
                this.enemy.maxFrame = 5;
                this.enemy.speedModifier = 0;
                this.enemy.image = this.enemy.sproutAttackImage;
                this.enemy.toLeft = false;
                if(this.attackTimer >= this.attackInterval) {
                    this.enemy.isAttacking = true;
                }
            break;
        }
    }

    transition(player) {
        if (!this.enemy.checkCollision() && this.enemy.frameY >= this.enemy.maxFrame) {
            this.enemy.isAttacking = false; // Reset isAttacking when transitioning out of attack state
            this.enemy.setState(states.MOVE_LEFT);
        } 
    }
    }
//------------------------------------------------------------------------