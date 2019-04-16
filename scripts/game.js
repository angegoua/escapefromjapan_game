const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")
const devMod = true //devMod qui sert à afficher un block

//Objet joueur
class Player {
    constructor(posX, posY, direction, speed, skin) {
        
        this.posX = posX; //Position du joueur
        this.posY = posY;   //Position du joueur Y
        this.direction = direction; //Direction du joueur 
        this.speed = 20; //Vitesse du joueur
        this.skin = skin; //Personnage
    }
    
    // GESTION MOUVEMENT DU PLAYER ET ATTRIBUTION DES KEYCODES
    movePlayer(){
        window.addEventListener('keydown', move, false)
        function move(key){
            if(key.keyCode == '39'){ //KeyRight
            
            ctx.clearRect(player.posX, player.posY, 40,40)
            player.posX = player.posX + player.speed // + largeur du player
            
            checkCollision(player)

            ctx.drawImage(image, player.posX, player.posY)
            image.src = player.skin 

            }
            if(key.keyCode == '37'){ //KeyLeft
            
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posX = player.posX - player.speed // + largeur du player

                checkCollision(player)

                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 
                
                
            
            }
            else if(key.keyCode == '38'){ //KeyUp
                

                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posY = player.posY - player.speed // + largeur du player

                checkCollision(player)

                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 

                
    
            }
            else if(key.keyCode == '40'){ //KeyDown
            
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posY = player.posY + player.speed // + largeur du player

                checkCollision(player)
                
                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 
    
            }
        }
            
    }
}


let player = new Player(300, canvas.height - 40, 'down', 1, 'images/player.png')

//PLAYER'S CREATE
let image = new Image()

image.onload = function(){
    ctx.drawImage(image, player.posX, player.posY)
}

image.src = player.skin 


//PLAYER'S MOVE
player.movePlayer()

//Objet mur
class Wall{
    constructor(posX, posY, width, height, display){
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.display = display

    }
    create(){
        
        //Si on choisit de l'afficher
        if(devMod){
            ctx.fillStyle = 'blue'
        }

        ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}

//Collision: https://developer.mozilla.org/fr/docs/Games/Techniques/2D_collision_detection

// Arrays of walls Wall(x, y, width, height)
let walls = [
    new Wall(100, 691, 80, 80),
    new Wall(60, 680, 80, 80),
    new Wall(60, 140, 20, 40),
    new Wall(90, 40, 20, 40)
]

//Creating of walls
for(let i = 0; i < walls.length; i++){
    walls[i].create(walls[i].posX, walls[i].posY, walls[i].width, walls[i].height)
}

//Test of collisigion
    function checkCollision(object){
        console.log(object.posX)
    for(let i = 0; i < walls.length; i++){

        if (object.posX <= walls[i].posX + walls[i].width && object.posX + object.width >= walls[i].posX
            ) {
                alert("colision détectée")
        } 
    } 
}
