const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")
const devMod = true //devMod qui sert à afficher un block
let gamePlaying = true //Fonction used to pause the game

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

            //If the game is playing
            if(gamePlaying){

                if(key.keyCode == '39'){ //KeyRight
                
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posX = player.posX + player.speed // + largeur du player
                
                    checkCollisionGuards(player)

                    if(checkCollision(player)) {

                        player.posX = player.posX - player.speed 

                    }

                    ctx.drawImage(image, player.posX, player.posY)
                    image.src = 'resource_pack/carlos/gif_left.gif' 

                }
                else if(key.keyCode == '37'){ //KeyLeft
                
                    ctx.clearRect(player.posX, player.posY, 40,40)
                    player.posX = player.posX - player.speed // + largeur du player
                    
                    checkCollisionGuards(player)

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
                    
                    checkCollisionGuards(player)

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
                    
                    checkCollisionGuards(player)

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
}


let player = new Player(70, 15, 'down', 1, 'resource_pack/carlos/carlos_face_stopover.png')

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
        this.height = 50;
        this.width = 50;
    }
    move() {
        
        ctx.clearRect(this.posX, this.posY, 50,50)

        switch (this.direction) {
            case 'up':
                this.posY = this.posY - this.speed

                if(checkCollision(this)) {

                    this.posY = this.posY + this.speed
                    this.direction = 'down'
                    this.skin = 'resource_pack/cop/cop_face.png'
                }

                break
            case 'down':
                this.posY = this.posY + this.speed

                if(checkCollision(this)) {

                    this.posY = this.posY - this.speed
                    this.direction = 'up'
                    this.skin = 'resource_pack/cop/cop_back.png'
                }

                break
            case 'left':
                
                this.posX = this.posX - this.speed

                if(checkCollision(this)) {

                    this.posX = this.posX + this.speed
                    this.direction = 'right'
                    this.skin = 'resource_pack/cop/cop_right.png'
                }

                break
            case 'right':

                this.posX = this.posX + this.speed

                if(checkCollision(this)) {

                    this.posX = this.posX - this.speed
                    this.direction = 'left'
                    this.skin = 'resource_pack/cop/cop_left.png'
                }
        }
    }
}

let guards = [
    new Guard(250, 400, 'down', 5, 'resource_pack/cop/cop_face.png'),
    new Guard(900, 400, 'right', 10, 'resource_pack/cop/cop_right.png'),
    new Guard(700, 630, 'right', 10, 'resource_pack/cop/cop_right.png')
]

let guardsImages = new Array()


//Spawning of Guards
for(let i = 0; i < guards.length; i++){
   
    //PGUARD'S CREATE
    guardsImages[i] = new Image()

    guardsImages[i].onload = function(){
        ctx.drawImage(guardsImages[i], guards[i].posX, guards[i].posY)
    }
    guardsImages[i].src = guards[i].skin 
}

let moveGuardInterval = setInterval(moveGuards, 100)

function moveGuards(){

    //Creating of walls
    for(let i = 0; i < walls.length; i++){

        guards[i].move()

        ctx.drawImage(guardsImages[i], guards[i].posX, guards[i].posY)
        guardsImages[i].src = guards[i].skin 
    }

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
    new Wall(55, 610, 132, 70), //Salle à manger bas à gauche
    new Wall(250, 610, 132, 70),//Salle à manger bas à gauche 2
    new Wall(10, 190, 100, 40),//Mur porte cellule
    new Wall(150, 0, 10, 380), // Mur droit cellule
    new Wall(150, 190, 690, 40),// Mur douche
    new Wall(835, 190, 10, 300), // Mur relié à droite de mur douche
    new Wall(835, 490, 128, 40),
    new Wall(835, 350, 128, 40),

    new Wall(0, 450, 335,40),
    new Wall(420, 450, 195,40),
    new Wall(600, 450, 10, 120),
    new Wall(80, 540,550, 25),
    new Wall(600, 630, 10, 120),
    new Wall(1065, 580, 10, 170),
]

//Creating of walls
for(let i = 0; i < walls.length; i++){
    walls[i].create(walls[i].posX, walls[i].posY, walls[i].width, walls[i].height)
}

//Test of collision
function checkCollision(object){
    for(let i = 0; i < walls.length; i++){

        //If a collision is detected
        if (object.posX + object.width > walls[i].posX && 
            object.posX < walls[i].posX + walls[i].width &&
            object.posY < walls[i].posY + walls[i].height && 
            object.posY + object.height > walls[i].posY
            ) {

            return true

         }
    } 
}


//COLLISION GUARDS AND PLAYER
function checkCollisionGuards(object){
    for(let i = 0; i < guards.length; i++){

        //If a collision is detected
        if (object.posX + object.width > guards[i].posX - 50 && 
            object.posX < guards[i].posX  + guards[i].width +50 &&
            object.posY < guards[i].posY + guards[i].height +50 && 
            object.posY + object.height > guards[i].posY -50
            ) {
                alert('Mort')
                init()
            return true

         }
    } 
}




/*
PAUSE STATUTS
*/

window.addEventListener('keydown', gamePause, false)
let counterPause = 0

function gamePause(key) {
    if(key.keyCode == '80'){
        clearInterval(moveGuardInterval);
    gamePlaying = false
    counterPause++
    }
    console.log(counterPause)
    if(counterPause % 2 == 0){
        gameContinue()
        counterPause++
    }
}

function gameContinue() {
    let moveGuardInterval = setInterval(moveGuards, 100)
    gamePlaying = true
}


function init(){
    player = new Player(70, 15, 'down', 1, 'resource_pack/carlos/carlos_face_stopover.png')

}

