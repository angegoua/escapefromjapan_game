/*
    ____________________________________________
    *******  HELLO
         WELCOME IN OUR HOME
        I HOPE YOU WILL ENJOY
        WE ARE OPENED FOR REMARKS
                THANKS *******
    _______________________________________________
*/


const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")
const devMod = false //TO see block of wall
let gamePlaying = true //Function used to pause the game
let player
const newShittySong = new Audio('resource_pack/sound_effect/bg_sound.mp3')
document.addEventListener(
    'keydown',
    ()=>{
        newShittySong.play();
    }
)

//OBJECT PLAYER
class Player {
    constructor(posX, posY, direction, speed, skin) {
        
        this.posX = posX; //player position on x
        this.posY = posY;   //player position on y
        this.direction = direction; //player direction 
        this.speed = 5; //player speed
        this.skin = skin; //player
        this.height = 40;
        this.width = 40;
    }
    
    
    // PLAYER'S MOVESAND KEYCODES ATTRIBUTION
    movePlayer(){
        window.addEventListener('keydown', move, false)
        function move(key){
            

            //If the game is playing
            if(gamePlaying){

                if(key.keyCode == '39'){ //KeyRight
                
                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posX = player.posX + player.speed // + width player
                
                    checkCollisionGuards(player)

                    if(checkCollision(player)) {

                        player.posX = player.posX - player.speed 

                    }

                    ctx.drawImage(image, player.posX, player.posY)
                    image.src = 'resource_pack/carlos/gif_left.gif'
                    checkCollisionZoneObjects() 

                }
                else if(key.keyCode == '37'){ //KeyLeft
                
                    ctx.clearRect(player.posX, player.posY, 40,40)
                    player.posX = player.posX - player.speed // + width player
                    
                    checkCollisionGuards(player)

                    if(checkCollision(player)) {

                        player.posX = player.posX + player.speed 

                    }

                    ctx.drawImage(image, player.posX, player.posY)
                    image.src = player.skin 
                    player.skin = 'resource_pack/carlos/gif_right.gif'
                    checkCollisionZoneObjects()
                    
                
                }
                if(key.keyCode == '38'){ //KeyUp
                
                    ctx.clearRect(player.posX, player.posY, 40,40)
                    player.posY = player.posY - player.speed// +witdh player
                    
                    checkCollisionGuards(player)

                    if(checkCollision(player)) {

                        player.posY = player.posY + player.speed

                    }

                    ctx.drawImage(image, player.posX, player.posY)
                    image.src = player.skin 
                    player.skin = 'resource_pack/carlos/gif_back.gif'
                    checkCollisionZoneObjects()

                    
        
                }
                else if(key.keyCode == '40'){ //KeyDown
                
                    ctx.clearRect(player.posX, player.posY, 40,40)
                    player.posY = player.posY + player.speed // + width player
                    
                    checkCollisionGuards(player)

                    if(checkCollision(player)) {

                        player.posY= player.posY - player.speed

                    }

                    ctx.drawImage(image, player.posX, player.posY)
                    image.src = player.skin 
                    player.skin = 'resource_pack/carlos/gif_face.gif'
                    checkCollisionZoneObjects()
        
                }
            }
        }
            
    }
}

init()

//PLAYER'S CREATE
let image = new Image()

image.onload = function(){
    ctx.drawImage(image, player.posX, player.posY)
}

image.src = player.skin 

//PLAYER'S MOVE
player.movePlayer()

/*
GUARD PART
*/
class Guard{
    constructor(posX, posY, direction, speed, skin) {
        this.posX = posX; //x Position of guard
        this.posY = posY;   //y Poistion of guard
        this.direction = direction; //Player guard
        this.speed = speed; //speed guard
        this.skin = skin; //guad perso
        this.height = 50;
        this.width = 50;
    }
    move() {
      
        ctx.clearRect(this.posX, this.posY, 50,50)

        //Checking direction of cops

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

//Declaration of guards variable
let guards = [
    new Guard(250, 400, 'down', 5, 'resource_pack/cop/cop_face.png'),
    new Guard(1100, 400, 'right', 10, 'resource_pack/cop/cop_right.png'),
    new Guard(700, 630, 'right', 10, 'resource_pack/cop/cop_right.png')
]

//Declaration of Guard image variable
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

//Interval of guards which activate the function of moving
let moveGuardInterval = setInterval(moveGuards, 100)

function moveGuards(){
    

    //Creating of walls
    for(let i = 0; i < guards.length; i++){
        console.log(i)
        guards[i].move()

        ctx.drawImage(guardsImages[i], guards[i].posX, guards[i].posY)
        guardsImages[i].src = guards[i].skin 
        
    }

}


/*
WALL PART
*/
//Wall object
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

// Arrays of walls Wall(x, y, width, height)
let walls = [
    new Wall(0, 0, 1300, 10),//bordure haut
    new Wall(0, 721, 1300, 10),//bordure bas
    new Wall(0, 0, 10, 731),//bordure gauche
    new Wall(1290, 0, 10, 731),//bordure droit
    new Wall(55, 610, 132, 70), //Salle à manger bas à gauche
    new Wall(250, 610, 132, 70),//Salle à manger bas à gauche 2
    new Wall(10, 190, 100, 40),//Mur porte cellule
    new Wall(150, 0, 10, 370), // Mur droit cellule
    new Wall(150, 190, 690, 40),// Mur douche
    new Wall(835, 190, 10, 300), // Mur relié à droite de mur douche
    new Wall(835, 490, 128, 40), // Mur bas petit carré milieu map
    new Wall(835, 350, 128, 40), // Mur haut petit carré milieu map
    new Wall(945, 350, 20, 150), // Mur droite petit carré milieu map
    new Wall(150, 85, 97, 35), // Mur entre 2 toilettes
    new Wall(1061, 0, 10, 200), // Mur gauche bureau
    new Wall(1061, 190, 182, 35), // Mur bas bureau
    new Wall(1127, 0, 22, 100), // Bureau dans bureau
    new Wall(0, 450, 335,40), // Mur haut cantine
    new Wall(420, 450, 195,40), // Mur haut droite cantine
    new Wall(600, 450, 10, 120), // Mur droite petit cantine
    new Wall(80, 540, 550, 25), // Longue table cantine
    new Wall(600, 620, 10, 120), // Mur droite petit en bas cantine
    new Wall(1065, 580, 10, 170), // Mur gauche sortie
    new Wall(1065, 575, 140, 35), // Mur haut sortie
    new Wall(1260, 575, 30, 35), // Mur haut petit sortie
    new Wall(10, 92, 18, 35), // Toilette cellule
    new Wall(160, 130, 17, 35), // Toilettes bas douche
    new Wall(160, 60, 17, 25), // Toilettes haut douche
    new Wall(325, 425, 110, 10), //Mur renfoncement haut cantine
]

//Creating of walls
for(let i = 0; i < walls.length; i++){
    walls[i].create(walls[i].posX, walls[i].posY, walls[i].width, walls[i].height)
}

/*
zoneObject Part
*/
class ZoneObject{
    constructor(posX, posY, width, height, type, skin){
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.type = type
        this.skin = skin 
    }
    //Si on choisit de l'afficher
    create(){
        
        //Si on choisit de l'afficher
        if(devMod){

            ctx.fillStyle = 'green'
            ctx.fillRect(this.posX, this.posY, this.width, this.height)
        }
        
    }
    checkCollision(){

        if (player.posX > this.posX && 
            player.posX < this.posX + this.width - 40 &&
            player.posY < this.posY + this.height - 40 && 
            player.posY + player.height -40 > this.posY) {

            return true

        }
    }
}

// Arrays of zoneObjects ZoneObject(x, y, width, height)
let zoneObjects = [
    new ZoneObject(1170, 660, 80, 100, 'victoryZone'),
    new ZoneObject(10, 230, 90, 90, 'camera'),//First camera on the left
    new ZoneObject(971, 20, 90, 90, 'camera'),//First camera on the right
    new ZoneObject(1200, 20, 90, 100, 'camera')//First camera on the extrem right 
]

//Creating of walls
for(let i = 0; i < zoneObjects.length; i++){
    zoneObjects[i].create(zoneObjects[i].posX, zoneObjects[i].posY, zoneObjects[i].width, zoneObjects[i].height, zoneObjects[i].type, zoneObjects[i].skin)
}

/*
COLLISIONS TESTING
*/
//Test of collision with walls
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
        if (object.posX + object.width > guards[i].posX - 20 && 
            object.posX < guards[i].posX  + guards[i].width +20 &&
            object.posY < guards[i].posY + guards[i].height +20 && 
            object.posY + object.height > guards[i].posY -20
            ) {
                alert('Mort')
                init()
            return true

         }
    } 
}
function checkCollisionPlayer(object){
    // for(let i = 0; i < guards.length; i++){

        //If a collision is detected
        if (object.posX + object.width > player.posX - 20 && 
            object.posX < player.posX  + player.width +20 &&
            object.posY < player.posY + player.height +20 && 
            object.posY + object.height > player.posY -20
            ) {
                alert('Mort')
                init()
            return true

         }
    // } 
}


//Collision with zoneObjects
function checkCollisionZoneObjects() {

    for(let i = 0; i < zoneObjects.length; i++){

        zoneObjects[i].checkCollision()

        //if zone ocjet == victory and collision == true
        if(zoneObjects[i].type == 'victoryZone' && zoneObjects[i].checkCollision() == true)
        {
            alert('Vous avez gagné')
        }

        //if zone ocjet == camera and collision == true

        if(zoneObjects[i].type == 'camera' && zoneObjects[i].checkCollision() == true){

            alert('Vous avez été repérés par une caméra')

        }
    }

}

/*
PAUSE STATUTS
*/
window.addEventListener('keydown', gamePause, false)


function gamePause(key) {
    if(key.keyCode == '80' && gamePlaying){
        clearInterval(moveGuardInterval);
    gamePlaying = false

    }
    //console.log(counterPause)
    else if(key.keyCode == '80' && !gamePlaying){
        gameContinue()

    }
}

function gameContinue() {
    moveGuardInterval = setInterval(moveGuards, 100)
    gamePlaying = true
}


function init(){

    player = new Player(70, 15, 'down', 1, 'resource_pack/carlos/carlos_face_stopover.png')
}


// function playAudio(){
//     var audio = document.createElement('audio');
//     audio.src = 'resource_pack/sound_effect/bg_sound.mp3';
//     audio.style.display = "none"; //added to fix ios issue
//     audio.autoplay = false; //avoid the user has not interacted with your page issue
//     audio.onended = function(){
//       audio.remove(); //remove after playing to clean the Dom
//     };
//     document.body.appendChild(audio);
//   }

// let audio = document.querySelector('audio')
// canvas.addEventListener('click', audio.play())
// checkCollisionGuards(player)