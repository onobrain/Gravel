export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            if (
              (e.key === "s" ||
                e.key === "d" ||
                e.key === "q" ||
                e.key === "z" ||
                e.key === " ") &&
              this.keys.indexOf(e.key) === -1
            ) {
              this.keys.push(e.key);
            } else if (e.key === "e") this.game.debug = !this.game.debug;
      
            // Check if the 'r' key is pressed and the game is over
            if (e.key === "r" && this.game.gameOver) {
              this.game.restartGame();
              // Request a new animation frame to restart the game loop
            }        


          });

          window.addEventListener("keyup", (e) => {
            if (
              e.key === "s" ||
              e.key === "d" ||
              e.key === "q" ||
              e.key === "z" ||
              e.key === " "
            ) {
              this.keys.splice(this.keys.indexOf(e.key), 1);
            }         
          });

    }   
}
