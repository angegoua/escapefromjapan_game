const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")
const devMod = true //devMod qui sert à afficher un block

//Objet joueur
class Player {
    constructor(posX, posY, direction, speed, skin) {
        
        this.posX = posX; //Position du joueur
        this.posY = posY;   //Position du joueur Y
        this.direction = direction; //Direction du joueur 
        this.speed = 5; //Vitesse du joueur
        this.skin = skin; //Personnage
        this.height = 40;
        this.width = 40;
    }
    
    // GESTION MOUVEMENT DU PLAYER ET ATTRIBUTION DES KEYCODES
    movePlayer(){
        window.addEventListener('keydown', move, false)
        function move(key){
            if(key.keyCode == '39'){ //KeyRight
            
            ctx.clearRect(player.posX, player.posY, 40,40)
            player.posX = player.posX + player.speed // + largeur du player
            
                if(checkCollision(player)) {

                    player.posX = player.posX - player.speed 

                }

                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 

            }
            else if(key.keyCode == '37'){ //KeyLeft
            
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posX = player.posX - player.speed // + largeur du player
                
                if(checkCollision(player)) {

                    player.posX = player.posX + player.speed 

                }

                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 
                player.skin = 'resource_pack/carlos/gif_right.gif'
                
            
            }
            if(key.keyCode == '38'){ //KeyUp
            
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posY = player.posY - player.speed// + largeur du player
                
                if(checkCollision(player)) {

                    player.posY = player.posY + player.speed

                }

                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 
                player.skin = 'resource_pack/carlos/gif_back.gif'

                
    
            }
            else if(key.keyCode == '40'){ //KeyDown
            
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posY = player.posY + player.speed // + largeur du player
                
                if(checkCollision(player)) {

                    player.posY= player.posY - player.speed

                }

                ctx.drawImage(image, player.posX, player.posY)
                image.src = player.skin 
                player.skin = 'resource_pack/carlos/gif_face.gif'
    
            }
        }
            
    }
}


let player = new Player(250, canvas.height - 80, 'down', 1, 'resource_pack/carlos/carlos_back.png')

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
    constructor(posX, posY, width, height, display, tile){
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.display = display
        this.tile = 'resource_pack/background/wall/front_wall.png'
    }
    create(){
        
        //Si on choisit de l'afficher
        if(devMod){
            // let imageWall = new Image
            // imageWall.onload = function(){
            //   ctx.drawImage (image, walls.posX, walls.posY)  
            // }
            
            // imageWall.src = walls.tile

            ctx.fillStyle = 'blue'
            ctx.fillRect(this.posX, this.posY, this.width, this.height)
        }

        
    }
}

/*
GUARD PART
*/
class Guard{
    constructor(posX, posY, direction, speed, skin) {
        this.posX = posX; //Position du joueur
        this.posY = posY;   //Position du joueur Y
        this.direction = direction; //Direction du joueur 
        this.speed = speed; //Vitesse du joueur
        this.skin = skin; //Personnage
        this.height = 40;
        this.width = 40;
    }
}

let guards = [
    new Guard(20, 40, 'left', 5, 'resource_pack/cop/cop_face.png'),
    new Guard(20, 80, 'left', 5, 'resource_pack/cop/cop_face.png')
]

let guardsImages = new Array()

//Spawning of Guards
for(let i = 0; i < guards.length; i++){
   
    //PLAYER'S CREATE
    guardsImages[i] = new Image()

    guardsImages[i].onload = function(){
        ctx.drawImage(guardsImages[i], guards[i].posX, guards[i].posY)
    }
    guardsImages[i].src = guards[i].skin 
}

/*
WALL PART
*/

// Arrays of walls Wall(x, y, width, height)
let walls = [
    new Wall(0, 0, 1300, 10),//bordure haut
    new Wall(0, 721, 1300, 10),//bordure bas
    new Wall(0, 0, 10, 731),//bordure gauche
    new Wall(1290, 0, 10, 731),//bordure droit
    new Wall(60, 600, 60, 60),
    new Wall(10, 300, 60, 60),
    new Wall(600, 200, 100, 60)
]

//Creating of walls
for(let i = 0; i < walls.length; i++){
    walls[i].create(walls[i].posX, walls[i].posY, walls[i].width, walls[i].height)
}

//Test of collisigion
function checkCollision(object){
    for(let i = 0; i < walls.length; i++){

        //If a collision is détected
        if (object.posX + object.width > walls[i].posX && 
            object.posX < walls[i].posX + walls[i].width &&
            object.posY < walls[i].posY + walls[i].height && 
            object.posY + object.height > walls[i].posY
            ) {

            return true

         }
    } 
}

