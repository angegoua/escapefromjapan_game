const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")

class Player {
    constructor(posX, posY, direction, speed, skin) {

        this.posX = posX; //Position du joueur
        this.posY = posY;   //Position du joueur Y
        this.direction = direction; //Direction du joueur 
        this.speed = speed; //Vitesse du joueur
        this.skin = skin;
    }
    
    createPlayer(){

        console.log('ok')
        let image = new Image()
        image.src = 'images/player.png'
        
        ctx.drawImage(image, this.posX, this.posY) 
    }
    
}

let player = new Player(40, 100, 'down', 1, 'images/player.png')

player.createPlayer()
