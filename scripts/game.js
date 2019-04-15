const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")


class Player {
    constructor(posX, posY, direction, speed, skin) {

        this.posX = posX; //Position du joueur
        this.posY = posY;   //Position du joueur Y
        this.direction = direction; //Direction du joueur 
        this.speed = speed; //Vitesse du joueur
        this.skin = skin; //Personnage
    }
    
    movePlayer(){
        canvas.addEventListener('click',function(){

            ctx.clearRect(player.posX, player.posY, 40,40)
            player.posX = player.posX + 40 // + largeur du player
            
            ctx.drawImage(image, player.posX, player.posY)
            image.src = player.skin 

        })
    }
}

let player = new Player(0, 691, 'down', 1, 'images/player.png')

//PLAYER'S CREATE
let image = new Image()

image.onload = function(){
    ctx.drawImage(image, player.posX, player.posY)
}

image.src = player.skin 


//PLAYER'S MOVE
player.movePlayer()



