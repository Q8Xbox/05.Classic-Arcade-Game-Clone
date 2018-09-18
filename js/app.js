// Game Global Settings
let gameWidth = 700;
let gameHeight = 606;
let tileWidth = 50;
let tileHieght = 85 - (20 + 20);
let gameCols = Math.floor(gameWidth / tileWidth);
let gameRows = Math.floor(gameHeight / tileHieght);
var speed = [200, 500];
var enimiesLeft = [245, 287];
var enimiesRight = [115, 155];
var xarray = [51, 101, 151, 201, 251, 301, 351, 401, 451, 504, 551];
var yarray = [91, 136, 181, 226, 271, 316, 361, 406];
let score = 0;
let timeleft =20;
var gem_img = ['images/item.png'];


// Display Score Panel
function display() {
    document.getElementById('points').textContent = "Your score : " + score + " points";
    document.getElementById('timer').textContent = "Your Time left : " + timeleft + " s";
}

display();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {

        this.image = 'images/bird-front.png';
        this.x = gameWidth / 2;
        this.y = gameHeight - 110;
        // initial position
    }
    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }

    handleInput(keyvalue) {
        if(timeleft > 0){
            switch (keyvalue) {
            case 'left':
                this.image = 'images/bird-left.png';
                this.x -= 50;
                if (this.x < 1) {
                    this.x = 1;
                }
                break;
            case 'up':
                this.image = 'images/bird-back.png';
                this.y -= 45;
                if (this.y <= 1) {
                    this.y = 1;
                }
                break;
            case 'right':
                this.image = 'images/bird-right.png';
                this.x += 50;
                if (this.x > (gameWidth - 60)) {
                    this.x = (gameWidth - 60);
                }
                break;
            case 'down':
                this.image = 'images/bird-front.png';
                this.y += 45;
                if (this.y >= (gameHeight - 65)) {
                    this.y = (gameHeight - 65);
                }
                break;
            }    
        }
        

    }

    update() {
        // TODO: update when a collision happens:
        if(timeleft > 0){
            for (const vehicle of allEnemies) {
            //     Right Side                      Left Side                  Top Side                     Bottom Side
            if (this.x < vehicle.x + 98 && this.x + 45 > vehicle.x && this.y + 10 < vehicle.y + 70 && this.y + 10 > vehicle.y) {
                this.x = gameWidth / 2;
                this.y = gameHeight - 110;
                score -= 10;
                gem_update();
                display();
            }
        }
        }
       

    }
}

// Enemies our player must avoid
class Enemy {
    /*
     *  Variables applied to each of our instances go here,
     *  we've provided one for you to get started
     *  The image/sprite for our enemies, this uses
     *  a helper we've provided to easily load images
     */
    constructor(carUrl, carDir) {
        this.image = carUrl;
        this.direction = carDir;
        if (this.direction === 'left') {
            this.x = 1;
            this.y = enimiesLeft[Math.floor(Math.random() * enimiesLeft.length)];
        } else {
            this.x = gameWidth;
            this.y = enimiesRight[Math.floor(Math.random() * enimiesRight.length)];
        }

        // have to be either slow or fast, 
        // without giving the player the ability to guess neither the position of the coming bug nor the speed
        this.speed = speed[Math.floor(Math.random() * speed.length)];

    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.direction === 'left') {
            this.x += dt * this.speed;
            if (this.x > gameWidth) {
                this.x = -101;
                this.y = enimiesLeft[Math.floor(Math.random() * enimiesLeft.length)];
                this.speed = speed[Math.floor(Math.random() * speed.length)];
                this.x += dt * this.speed;
            }
        } else {
            this.x -= dt * this.speed;
            if (this.x < -80) {
                this.x = gameWidth + 101;
                this.y = enimiesRight[Math.floor(Math.random() * enimiesRight.length)];
                this.speed = speed[Math.floor(Math.random() * speed.length)];
                this.x -= dt * this.speed;
            }
        }
    }


}

class Gem {
    constructor() {
        // we use different gems' images for the same score value
        this.image = gem_img[Math.floor(Math.random() * gem_img.length)];
        this.x = xarray[Math.floor(Math.random() * xarray.length)];
        this.y = yarray[Math.floor(Math.random() * yarray.length)];
    }

    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }

    update() {
        // update when the player collects the gem
        //     Right Side                      Left Side             Top Side                    Bottom Side
        if (player.x < this.x + 40 && player.x + 45 > this.x && player.y < this.y + 27 && player.y + 10 > this.y) {
            this.x = -1000;
            score += 5;
            gem_update();
            display();
        }

    }

}

//timer starts as soon as the game is load! 
const countDown = setInterval(function() {
    timeleft--;
    document.getElementById('timer').textContent = `Your Time left : ${timeleft} s`;
    if (timeleft <= 0) {
        clearInterval(countDown);
        winner.popup();
    }
}, 1000);


// Winner Conditions
class Winner {
    constructor() {
        this.modal = document.getElementById('modal');
        this.page = document.getElementById('container');

    }
    popup() {

        if (timeleft <= 0) {
            display();
            modal_win();
            var congratsBoard = document.getElementById("congrats");

            if(score <= 0){
                congratsBoard.innerHTML = "Opps! You Lost" + "<img src='images/sad.png'>";
            }else{
                congratsBoard.innerHTML = "Congratulations! </br> You won" + "<img src='images/happy.png'>";
            }
            this.modal.classList.replace("hide", "show");
            this.page.classList.add('transparent');
            // TODO: new game
            document.getElementById('button').addEventListener("click", function () {
                location.reload();
            });
        }
    }

}


/*
 *  Now instantiate your objects.
 *  Place all enemy objects in an array called allEnemies
 *  Place the player object in a variable called player
 */

document.getElementById('modal').classList.replace('show', 'hide');
document.getElementById('container').classList.remove('transparent');
var Enemy1 = new Enemy('images/car01_enemy.png', 'left');
var Enemy2 = new Enemy('images/car02_enemy.png', 'left');
var Enemy3 = new Enemy('images/car03_enemy.png', 'right');
var Enemy4 = new Enemy('images/car04_enemy.png', 'right');
var allEnemies = [Enemy1, Enemy2, Enemy3, Enemy4];
var player = new Player();
var gem = new Gem();
var winner = new Winner();


function gem_update() {
    gem.x = xarray[Math.floor(Math.random() * xarray.length)];
    gem.y = yarray[Math.floor(Math.random() * yarray.length)];
    gem.image = gem_img[Math.floor(Math.random() * gem_img.length)];
}

function modal_win() {
    document.getElementById('score').textContent = score;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});

