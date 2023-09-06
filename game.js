// -=> game.js
import { player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background1 } from "./background.js";
import {  Sprout } from "./enemies.js";


window.addEventListener('load' , ()=>{
    const canvas = document.getElementById('canvas')
    const CANVAS_WIDTH = canvas.width = 1200,
        CANVAS_HEIGHT = canvas.height = 793;
    const ctx = canvas.getContext('2d');


    // game class : 
    class Game {
        constructor(canvas , deltaTime) {
            // game properties.
            this.canvas = canvas
            this.width = canvas.width;
            this.height = canvas.height
            this.speed = 0;
            this.maxSpeed = 3;
            this.deltaTime = 0
            this.lives = 5;
            this.gameOver = false;
            this.debug = true;
            this.groundMargin = 35;
            this.maxEnemies = 5;
            this.enemyTimer = 0;
            this.enemyInterval = 1000
            // instances.
            this.background1 = new Background1(this)
            this.player = new player(this)
            this.input = new InputHandler(this)
            // player states
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            // game Objects : 
            this.enemies = [];

        }

        // -gu
        update(deltaTime) {
            // updating game objects
            const input = this.input.keys
            this.player.update(deltaTime , input)
            this.background1.update()
            this.deltaTime = deltaTime;
            this.enemies.forEach(enemy => enemy.update(deltaTime))

            // handle enemies : 
            if(this.enemyTimer > this.enemyInterval ) {
                this.addEnemies()
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime
            }

        }

        // -gd 
        draw(context) {
            //draw game objects
            this.background1.draw(context);
            this.enemies.forEach(enemy => enemy.draw(context))
            this.player.draw(context)
        }

        // -gene
        addEnemies(){
            if(this.enemies.length < this.maxEnemies) {
                this.enemies.push(new Sprout(this))
                // this.enemies.push(new Seeker(this))
                // this.enemies.push(new Golem(this))
            }
        }

        // -gr
        restart(){

        }
    }




    // instanciating game class:
    const game = new Game(canvas)
    // animate the game.
    let lastTime = 0;
    function animate(timeStamp) {
        // clear old rect
        ctx.clearRect(0 ,0 , canvas.width ,canvas.height)
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        // update & draw game.
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }

    animate(0)
})