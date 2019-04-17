const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")
const devMod = false //devMod qui sert à afficher un block
let gamePlaying = true //Fonction used to pause the game
let player

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
                player.posX = player.posX + player.speed
                
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
                    player.posX = player.posX - player.speed
                    
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
                    player.posY = player.posY - player.speed
                    
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
                    player.posY = player.posY + player.speed // + largeur du player
                    
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
    new Guard(900, 400, 'right', 10, 'resource_pack/cop/cop_right.png'),
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
    for(let i = 0; i < walls.length; i++){

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

//Creating of zoneObjects
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

//Collision with zoneObjects
function checkCollisionZoneObjects() {

    for(let i = 0; i < zoneObjects.length; i++){

        zoneObjects[i].checkCollision()

        //Si zone ocjet = victoire et et que collision renvoit rue alors
        if(zoneObjects[i].type == 'victoryZone' && zoneObjects[i].checkCollision() == true)
        {
            alert('Vous avez gagné')
        }

        //Si type objet = caméra et que collisioon alors 
        if(zoneObjects[i].type == 'camera' && zoneObjects[i].checkCollision() == true){

            alert('Vous avez été repérés par une caméra')

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
    //console.log(counterPause)
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

/*
UI
*/

let UIdiv = document.querySelector('.gameDisplay')
let gameDisplayTitle = document.querySelector('.gameDisplayTitle')
let gameDisplayButton1 = document.querySelector('.gameDisplayButton1')
let gameDisplayButton2 = document.querySelector('.gameDisplayButton2')

//Displaying of the menu
function uiDivDisplay(action) {

    UIdiv.style.display = 'block'

    if(action == 'gamePause'){

        //Changing text of buttons
        gameDisplayTitle.innerHTML = 'Paused'
        gameDisplayButton1.innerHTML = 'Resume'
        gameDisplayButton2.innerHTML = 'Quit'

        //If the client click on the button "Paused"
        gameDisplayButton1.addEventListener(
            'click',
            function(){
                alert('On continue le jeu')
                uiDivHide()
            }
        )

        //If the client click on the button "Quit"
        gameDisplayButton2.addEventListener(
            'click',
            function(){
                document.location.href="index.html"
            }
        )
    }
    else if(action == 'gameLose'){

        //Changing text of buttons
        gameDisplayTitle.innerHTML = 'You lose'
        gameDisplayButton1.innerHTML = 'Retry'
        gameDisplayButton2.innerHTML = 'Quit'

        //If the client click on the button "Retry"
        gameDisplayButton1.addEventListener(
            'click',
            function(){
                
                //fonction qui fait recommencer le niveau
            }
        )

        //If the client click on the button "Quit"
        gameDisplayButton2.addEventListener(
            'click',
            function(){
                document.location.href="index.html"
            }
        )
    }
    else if(action == 'gameWon'){

        //Changing text of buttons
        gameDisplayTitle.innerHTML = 'You won'
        gameDisplayButton1.innerHTML = 'Next level'
        gameDisplayButton2.innerHTML = 'Restart'

        //If the client click on the button "Next level"
        gameDisplayButton1.addEventListener(
            'click',
            function(){
                
                //fonction which move the player to the next level
            }
        )

        //If the client click on the button "Restart level"
        gameDisplayButton2.addEventListener(
            'click',
            function(){
                
                //Fonction which retry the level

            }
        )
    }
}

//hidding of the menu
function uiDivHide(){
    UIdiv.style.display = 'block' 
}