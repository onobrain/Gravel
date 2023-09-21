// -=> playerStates.js

// states enums
const states = {
  IDLE_LEFT: 0,
  IDLE_RIGHT: 1,
  RUN_LEFT: 2,
  RUN_RIGHT: 3,
  KNEEL_LEFT: 4,
  KNEEL_RIGHT: 5,
  JUMP_LEFT: 6,
  JUMP_RIGHT: 7,
  DIE: 8,
  ATTACK_LEFT: 9,
  ATTACK_RIGHT: 10,
  FALL_LEFT: 11,
  FALL_RIGHT: 12,
  STAND_LEFT: 13,
  STAND_RIGHT: 14,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

//-----------------------------------------------------------------------

// -idl l
export class IdleLeft extends State {
  constructor(game) {
    super("IDLE LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 0;
    this.game.player.maxFrame = 1;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("z")) {
      this.game.player.setState(states.JUMP_LEFT, 0);
    } else if (input.includes("q")) {
      this.game.player.setState(states.RUN_LEFT, -2);
    } else if (input.includes("d")) {
      this.game.player.setState(states.RUN_RIGHT, 2);
    } else if (input.includes("s")) {
      this.game.player.setState(states.KNEEL_LEFT, 0);
    } else if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    }
  }
}

//-----------------------------------------------------------------------

// -idl r
export class IdleRight extends State {
  constructor(game) {
    super("IDLE RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 0;
    this.game.player.maxFrame = 1;
    this.game.player.flipLeft = false;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("z")) {
      this.game.player.setState(states.JUMP_RIGHT, 0);
    } else if (input.includes("q")) {
      this.game.player.setState(states.RUN_LEFT, -2);
    } else if (input.includes("d")) {
      this.game.player.setState(states.RUN_RIGHT, 2);
    } else if (input.includes("s")) {
      this.game.player.setState(states.KNEEL_RIGHT, 0);
    } else if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    }
  }
}

//-----------------------------------------------------------------------

// -run l
export class RunLeft extends State {
  constructor(game) {
    super("RUN LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 7;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("d")) {
      this.game.player.setState(states.RUN_RIGHT, 2);
    } else if (input.includes("s")) {
      this.game.player.setState(states.KNEEL_LEFT, 0);
    } else if (input.includes("z")) {
      this.game.player.setState(states.JUMP_LEFT, 0);
    } else if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    } else if (!input.includes("q")) {
      this.game.player.setState(states.IDLE_LEFT, 0);
    }
  }
}
//-----------------------------------------------------------------------

// -run r
export class RunRight extends State {
  constructor(game) {
    super("RUN RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 7;
    this.game.player.flipLeft = false;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("q")) {
      this.game.player.setState(states.RUN_LEFT, -2);
    } else if (input.includes("s")) {
      this.game.player.setState(states.KNEEL_RIGHT, 0);
    } else if (input.includes("z")) {
      this.game.player.setState(states.JUMP_RIGHT, 0);
    } else if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    } else if (!input.includes("d")) {
      this.game.player.setState(states.IDLE_RIGHT, 0);
    }
  }
}

//-----------------------------------------------------------------------
// -kneel l
export class KneelLeft extends State {
  constructor(game) {
    super("KNEEL LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 3;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes("d")) {
      this.game.player.setState(states.KNEEL_RIGHT, 0);
    } else if (!input.includes("s")) {
      this.game.player.setState(states.IDLE_LEFT, 0);
    } else {
      // Continue to update the player's frame as long as the "down" key is held.
      this.game.player.frameX = 3;
    }
  }
}
//-----------------------------------------------------------------------
// -kneel r
export class KneelRight extends State {
  constructor(game) {
    super("KNEEL RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 3;
    this.game.player.flipLeft = false;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes("q")) {
      this.game.player.setState(states.KNEEL_LEFT, 0);
    } else if (!input.includes("s")) {
      this.game.player.setState(states.IDLE_RIGHT, 0);
    } else {
      // Continue to update the player's frame as long as the "down" key is held.
      this.game.player.frameX = 3;
    }
  }
}

//-----------------------------------------------------------------------
// -stand l
export class standLeft extends State {
  constructor(game) {
    super("STAND LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 3;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 5;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (this.game.player.frameX >= 5) {
      this.game.player.setState(states.IDLE_LEFT, 0);
    } else if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes("d")) {
      this.game.player.setState(states.STAND_RIGHT, 0);
    }
  }
}
//-----------------------------------------------------------------------
// -stand r
export class standRight extends State {
  constructor(game) {
    super("STAND RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 3;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 5;
    this.game.player.flipLeft = false;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (this.game.lives <= 0) {
      this.game.player.setState(states.DIE, 0);
    } else if (input.includes("q")) {
      this.game.player.setState(states.STAND_LEFT, 0);
    }
  }
}
//-----------------------------------------------------------------------

// -jum l
export class JumpLeft extends State {
  constructor(game) {
    super("JUMP LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 3;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("d")) {
      this.game.player.setState(states.JUMP_RIGHT, 0);
    } else if (
      this.game.player.y >=
        this.game.height - this.game.player.height - this.game.groundMargin &&
      this.game.player.vy >= 0
    ) {
      this.game.player.setState(states.IDLE_LEFT, 0);
    } else if (this.game.player.vy > 0) {
      this.game.player.setState(states.FALL_LEFT, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    }
  }
}
//-----------------------------------------------------------------------
// -jum r
export class JumpRight extends State {
  constructor(game) {
    super("JUMP RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 3;
    this.game.player.flipLeft = false;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("q")) {
      this.game.player.setState(states.JUMP_LEFT, 0);
    } else if (
      this.game.player.y >=
        this.game.height - this.game.player.height - this.game.groundMargin &&
      this.game.player.vy >= 0
    ) {
      this.game.player.setState(states.IDLE_RIGHT, 0);
    } else if (this.game.player.vy > 0) {
      this.game.player.setState(states.FALL_RIGHT, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    }
  }
}
//-----------------------------------------------------------------------
// -fal l
export class FallLeft extends State {
  constructor(game) {
    super("FALL LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 4;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 7;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("d")) {
      this.game.player.setState(states.FALL_RIGHT, 0);
    } else if (
      this.game.player.y >=
      this.game.height - this.game.player.height - this.game.groundMargin
    ) {
      this.game.player.setState(states.IDLE_LEFT, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    }
  }
}
//-----------------------------------------------------------------------
// -fal r
export class FallRight extends State {
  constructor(game) {
    super("FALL RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 4;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 7;
    this.game.player.flipLeft = false;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (input.includes("q")) {
      this.game.player.setState(states.FALL_LEFT, 0);
    } else if (
      this.game.player.y >=
      this.game.height - this.game.player.height - this.game.groundMargin
    ) {
      this.game.player.setState(states.IDLE_RIGHT, 0);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    }
  }
}
//-----------------------------------------------------------------------

// -die
export class Die extends State {
  constructor(game) {
    super("DIE", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 7;
    this.game.player.maxFrame = 7;

    if(this.game.player.frameX >= this.game.player.maxFrame) {
      this.game.gameOver = true; //set gameOver to true when the die animation ends.
    }
  }
}
//-----------------------------------------------------------------------

// -attack l
export class AttackLeft extends State {
  constructor(game) {
    super("ATTACK LEFT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 8;
    this.game.player.maxFrame = 8;
    this.game.player.flipLeft = true;
  }

  // handle specific inputs only in this state.
  HandleInput(input) {
    if (
      this.game.player.frameX >= 8 &&
      this.game.player.currentState === states.JUMP_LEFT
    ) {
      this.game.player.setState(states.JUMP_LEFT, 0);
    } else if (
      this.game.player.frameX >= 8 &&
      this.game.player.currentState === states.FALL_LEFT
    ) {
      this.game.player.setState(states.FALL_LEFT, 0);
    } else if (this.game.player.frameX >= 8) {
      this.game.player.setState(states.IDLE_LEFT, 0);

    }
  }
}

// -attack r
export class AttackRight extends State {
  constructor(game) {
    super("ATTACK RIGHT", game);
  }

  // perform specific actions when we enter this state
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 8;
    this.game.player.maxFrame = 8;
    this.game.player.flipLeft = false;
  }


  // handle specific inputs only in this state.
  HandleInput(input) {
    if (
      this.game.player.frameX >= 8 &&
      this.game.player.currentState === states.JUMP_RIGHT
    ) {
      this.game.player.setState(states.JUMP_RIGHT, 0);
    } else if (
      this.game.player.frameX >= 8 &&
      this.game.player.currentState === states.FALL_RIGHT
    ) {
      this.game.player.setState(states.FALL_RIGHT, 0);
    } else if (this.game.player.frameX >= 8) {
      this.game.player.setState(states.IDLE_RIGHT, 0);
    }
  }
}
