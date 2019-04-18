/*
    ____________________________________________
    *******  HELLO
         WELCOME IN OUR HOME
        I HOPE YOU WILL ENJOY
        WE ARE OPENED FOR REMARKS
                THANKS *******
    _______________________________________________

    _by 
    Constant Gillet - Developper
    Catinca Gheorghiu - Developper & Designer
    Nathan Grigné - Designer
    Ange René Goua - Developper
    Johann Givre - Designer
*/

const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")
const levelNameDisplay = document.querySelector('.levelNameDisplay')
const devMod = false //TO see block of wall
let gamePlaying = true //Function used to pause the game
let player
const newBgSong = new Audio('resource_pack/sound_effect/bg_sound.mp3')
const newDeathGameSong = new Audio('resource_pack/sound_effect/game_over.mp3')
let skinVariation = 1
const keysCount =  document.querySelector('.keyCount')
let keysNumber = 0
const gameMessage = document.querySelector('.gameMessage')
const gameMessageKey = document.querySelector('.gameMessageKey')

/*
LEVEL CLASS
*/
class Level{
    constructor(level, background, levelName){
        this.level = level
        this.background = background
        this.levelName = levelName
    }
    nameUpdate(){
        levelNameDisplay.innerHTML = this.levelName
    }
}

let currentLevel = new Level(1, 'map2_whithout_cop_and_car_and_passport.png', 'LEVEL 1 : ESCAPE THE PRISON')

document.addEventListener(
    'keydown',
    ()=>{
        newBgSong.play();
    }
)

//OBJECT PLAYER
class Player {
    constructor(posX, posY, direction, speed, skin) {

        this.posX = posX; //player position on x
        this.posY = posY;   //player position on y
        this.direction = direction; //player direction
        this.speed =5; //player speed
        this.skin = skin; //player
        this.height = 40;
        this.width = 40;
    }
     
    // PLAYER'S MOVESAND KEYCODES ATTRIBUTION
    movePlayer(){
        window.addEventListener('keydown', move, false)
        function move(key){

             checkCollisionKeys(player)

            //If the game is playing
            if(gamePlaying){

                if(key.keyCode == '39'){ //KeyRight

                ctx.clearRect(player.posX, player.posY, 40,40)
                player.posX = player.posX + player.speed // + width player

                    checkCollisionGuards(player)

                    if(checkCollision(player)) {

                        player.posX = player.posX - player.speed

                    }

                    //Fonction which writes the player image
                    drawPlayerImage()

                    if(skinVariation == 1){
                        player.skin = 'resource_pack/carlos/carlos_left.png'
                        skinVariation++
                    }
                    else if(skinVariation == 2){
                        player.skin = 'resource_pack/carlos/carlos_left2.png'
                        skinVariation--
                    }

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

                    if(skinVariation == 1){
                        player.skin = 'resource_pack/carlos/carlos_right.png'
                        skinVariation++
                    }
                    else if(skinVariation == 2){
                        player.skin = 'resource_pack/carlos/carlos_right2.png'
                        skinVariation--
                    }

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

                    if(skinVariation == 1){
                        player.skin = 'resource_pack/carlos/carlos_back.png'
                        skinVariation++
                    }
                    else if(skinVariation == 2){
                        player.skin = 'resource_pack/carlos/carlos_back2.png'
                        skinVariation--
                    }

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

                    if(skinVariation == 1){
                        player.skin = 'resource_pack/carlos/carlos_face.png'
                        skinVariation++
                    }
                    else if(skinVariation == 2){
                        player.skin = 'resource_pack/carlos/carlos_face2.png'
                        skinVariation--
                    }
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
    constructor(posX, posY, direction, speed, skin, visionZone) {
        this.posX = posX; //x Position of guard
        this.posY = posY;   //y Poistion of guard
        this.direction = direction; //Player guard
        this.speed = speed; //speed guard
        this.skin = skin; //guad perso
        this.height = 50;
        this.width = 50;
        this.skinVariation = 1
        this.visionZone = visionZone
    }
    move() {

        ctx.clearRect(this.posX, this.posY, 50,50)

        //Checking direction of cops

        switch (this.direction) {
            case 'up':
                this.posY = this.posY - this.speed

                //Changing of skin to create an "animation"
                if(this.skinVariation == 1){
                    this.skin = 'resource_pack/cop/cop_back.png'
                    this.skinVariation++
                }
                else if(this.skinVariation == 2){
                    this.skin = 'resource_pack/cop/cop_back2.png'
                    this.skinVariation--
                }

                if(checkCollision(this)) {

                    this.posY = this.posY + this.speed
                    this.direction = 'down'
                    this.skin = 'resource_pack/cop/cop_face.png'
                }

                break
            case 'down':
                this.posY = this.posY + this.speed

                //Changing of skin to create an "animation"
                if(this.skinVariation == 1){
                    this.skin = 'resource_pack/cop/cop_face.png'
                    this.skinVariation++
                }
                else if(this.skinVariation == 2){
                    this.skin = 'resource_pack/cop/cop_face2.png'
                    this.skinVariation--
                }

                if(checkCollision(this)) {

                    this.posY = this.posY - this.speed
                    this.direction = 'up'
                    this.skin = 'resource_pack/cop/cop_back.png'
                }

                break
            case 'left':

                this.posX = this.posX - this.speed

                //Changing of skin to create an "animation"
                if(this.skinVariation == 1){
                    this.skin = 'resource_pack/cop/cop_left.png'
                    this.skinVariation++
                }
                else if(this.skinVariation == 2){
                    this.skin = 'resource_pack/cop/cop_left2.png'
                    this.skinVariation--
                }

                if(checkCollision(this)) {

                    this.posX = this.posX + this.speed
                    this.direction = 'right'
                    this.skin = 'resource_pack/cop/cop_right.png'
                }

                break
            case 'right':

                this.posX = this.posX + this.speed

                //Changing of skin to create an "animation"
                if(this.skinVariation == 1){
                    this.skin = 'resource_pack/cop/cop_right.png'
                    this.skinVariation++
                }
                else if(this.skinVariation == 2){
                    this.skin = 'resource_pack/cop/cop_right2.png'
                    this.skinVariation--
                }

                if(checkCollision(this)) {

                    this.posX = this.posX - this.speed
                    this.direction = 'left'
                    this.skin = 'resource_pack/cop/cop_left.png'
                }
        }
    }
}

//Fonction which writes the player image
function drawPlayerImage(){
    ctx.drawImage(image, player.posX, player.posY)
    image.src = player.skin
}

//Declaration of guards variable
let guards = [
    new Guard(250, 400, 'down', 5, 'resource_pack/cop/cop_face.png', 20),
    new Guard(1100, 400, 'right', 5, 'resource_pack/cop/cop_right.png', 20),
    new Guard(700, 630, 'right', 10, 'resource_pack/cop/cop_right.png',20),
    new Guard(0, 560,'left',10,'resource_pack/cop/cop_left.png', 20),
    new Guard(750, 70, 'down', 5, 'resource_pack/cop/cop_face.png', 20)
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

        guards[i].move()
        checkCollisionPlayer(guards[i])
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
    new Wall(0, 0, 1300, 10),//border Up
    new Wall(0, 721, 1300, 10),//border down
    new Wall(0, 0, 10, 731),//border left
    new Wall(1290, 0, 10, 731),// border right
    new Wall(55, 610, 132, 70), //Eating room down left
    new Wall(250, 610, 132, 70),//Eating room down left 2
    new Wall(10, 190, 100, 40),//wall door prison room carlos
    new Wall(150, 0, 10, 370), // right wall door prison room carlos
    new Wall(150, 190, 690, 40),// wall bathroom
    new Wall(835, 190, 10, 300), //wall relied to the the at wall bathroom
    new Wall(835, 490, 128, 40), // wall down square middle of the map
    new Wall(835, 350, 128, 40), // wall up square middle of the map
    new Wall(945, 350, 20, 150), // wall right square middle of the map
    new Wall(150, 85, 97, 35), // wall between toilets
    new Wall(1061, 0, 10, 200), // left wall desktop room
    new Wall(1061, 190, 182, 35), // down wall desktop room
    new Wall(1127, 0, 22, 100), // desktopp in desktop
    new Wall(0, 450, 335,40), // wall up of cantine room
    new Wall(420, 450, 195,40), // wall up of cantine room
    new Wall(600, 450, 10, 120), // wall right of cantine room
    new Wall(80, 540, 550, 15), // widther table in eating room
    new Wall(600, 620, 10, 120), // smamll wall down of cantine room
    new Wall(1065, 580, 10, 170), // wall left exit
    new Wall(1065, 575, 140, 35), // wall up exit
    new Wall(1260, 575, 30, 35), // wall left small exit
    new Wall(10, 92, 18, 35), // toilets
    new Wall(160, 130, 17, 35), //toilet down / bathroom
    new Wall(160, 60, 17, 25), // toilet up right
    new Wall(325, 425, 110, 10), //wall renforcing up eating room
]

generateWall()

function generateWall() {
    //Creating of walls
    for(let i = 0; i < walls.length; i++){
        walls[i].create(walls[i].posX, walls[i].posY, walls[i].width, walls[i].height)
    }
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

    create(){

    //To show block of wall or not

        if(devMod){

            ctx.fillStyle = 'green'
            ctx.fillRect(this.posX, this.posY, this.width, this.height)
        }
    }
    checkCollision(){

        if (player.posX > this.posX &&
            player.posX < this.posX + this.width - 40 &&
            player.posY < this.posY + this.height - 40 &&
            player.posY + player.height - 40 > this.posY) {

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

generatingZoneObjects()

function generatingZoneObjects()
{
    //Creating of zoneObjects
    for(let i = 0; i < zoneObjects.length; i++){
        zoneObjects[i].create(zoneObjects[i].posX, zoneObjects[i].posY, zoneObjects[i].width, zoneObjects[i].height, zoneObjects[i].type, zoneObjects[i].skin)
    }
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
        if (object.posX + object.width > guards[i].posX - guards[i].visionZone &&
            object.posX < guards[i].posX  + guards[i].width +guards[i].visionZone &&
            object.posY < guards[i].posY + guards[i].height +guards[i].visionZone &&
            object.posY + object.height > guards[i].posY - guards[i].visionZone
            ) {
                gamePlaying = false
                uiDivDisplay('gameLose')
            return true

         }
    }
}

function checkCollisionPlayer(object){
    for(i=0; i<guards.length; i++){ 
        //If a collision is detected
        if (object.posX + object.width > player.posX - guards[i].visionZone && 
            object.posX < player.posX  + player.width +guards[i].visionZone &&
            object.posY < player.posY + player.height +guards[i].visionZone && 
            object.posY + object.height > player.posY - guards[i].visionZone
            ) {
                gamePlaying = false
                uiDivDisplay('gameLose')
            return true
            }
        }    
}

//Collision with zoneObjects
function checkCollisionZoneObjects() {

    for(let i = 0; i < zoneObjects.length; i++){

        zoneObjects[i].checkCollision()
        
        if(zoneObjects[i].type == 'victoryZone' && zoneObjects[i].checkCollision() == true && keysNumber == 4 && currentLevel.level == 2)
        {
            gamePlaying = false
            uiDivDisplay('gameVictory')
        }
        
        //if zone ocjet == victory and collision == true
        else if(zoneObjects[i].type == 'victoryZone' && zoneObjects[i].checkCollision() == true && keysNumber == 4)
        {
            gamePlaying = false
            uiDivDisplay('gameWin')
        }

        //if zone ocjet == camera and collision == true

        if(zoneObjects[i].type == 'camera' && zoneObjects[i].checkCollision() == true){

            gamePlaying = false
            uiDivDisplay('gameLose')

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

        uiDivDisplay('gamePause')
        newBgSong.pause()
    }
    //console.log(counterPause)
    else if(key.keyCode == '80' && !gamePlaying){
        gameContinue()
        uiDivHide()
    }
}

function gameContinue() {
    moveGuardInterval = setInterval(moveGuards, 100)
    gamePlaying = true
}

//Fonction which init the game
function init(){
    player = new Player(70, 15, 'down', 1, 'resource_pack/carlos/carlos_face_stopover.png')
    //Setting key to 0
    keysNumber = 0
    keysCount.innerHTML = keysNumber
}

//Function which re init the game
function retry(){

    //Re init of player info
    player.posX = 70
    player.posY = 15
    player.direction = 'down'
    player.skin = 'resource_pack/carlos/carlos_face_stopover.png'

    ctx.drawImage(image, player.posX, player.posY)
    image.src = player.skin

    //Setting key to 0
    keysNumber = 0
    keysCount.innerHTML = keysNumber

    keyCreate()

    for(let i = 0; i < keys.length; i++){
        keys[i].pickUp = false
    }

    //Activating the game
    gamePlaying = true
}
/*
CREATION OF KEYS
*/

class Key{
    constructor(posX, posY, width, height, skin){
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.skin = 'resource_pack/object/key.png'
        this.pickUp = false
    }
}
let keys = [
            new Key(50, 300, 60, 50),
            new Key(1200, 100, 60, 50),
            new Key(350, 460, 60, 50),
            new Key(250, 70,60,50)
        ]

let imageKeys = new Array()

keyCreate()
//Spawning of Keys
function keyCreate(){

    for(let i = 0; i < keys.length; i++){

        //Key'S CREATE
        imageKeys[i] = new Image()

        imageKeys[i].onload = function(){
            ctx.drawImage(imageKeys[i], keys[i].posX, keys[i].posY)
        }
        imageKeys[i].src =keys[i].skin
    }
}
function checkCollisionKeys(player){
    for(let i = 0; i < keys.length; i++){

        //If a collision is detectedkeyNumberBool
        if (player.posX + player.width > keys[i].posX  &&
            player.posX < keys[i].posX  + keys[i].width  &&
            player.posY < keys[i].posY + keys[i].height  &&
            player.posY + keys[i].height > keys[i].posY
            ) {

                if(keys[i].pickUp == false)
                {
                    keysNumber++
                   
                    popUpMessage()
                        
                    
                    keysCount.innerHTML = keysNumber

                    ctx.clearRect(keys[i].posX, keys[i].posY, 60,50)

                    keys[i].pickUp = true
                }

            return true
        }
    }
}

//function which the message if we take a key
function popUpMessage (){
        
        gameMessage.style.opacity = '1' 
        setTimeout(function(){
        gameMessage.style.opacity = '0' 
        }, 2000
    )
    console.log('yes')
}

//Function which load the game from the localStorage
function loadGame(){
    if(localStorage.getItem('currentLevel') != null) {

        currentLevel.level = localStorage.getItem('currentLevel')
        changeLevel(currentLevel)
    }
}

//Loadigng a game from the localstorage
loadGame()

/*
UI ELEMENTS & EVENTS
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

        //If the client click on the button "Resume"
        gameDisplayButton1.addEventListener(
            'click',
            function(){

                if( !gamePlaying){
                    gameContinue()
                }

                //Hidding the menu
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
        newBgSong.pause()
        newDeathGameSong.play()
        //Changing text of buttons
        gameDisplayTitle.innerHTML = 'You have been Caught'
        gameDisplayButton1.innerHTML = 'Retry'
        gameDisplayButton2.innerHTML = 'Quit'

        //If the client click on the button "Retry"
        gameDisplayButton1.addEventListener(
            'click',
            function(){
                ctx.clearRect(player.posX, player.posY, 40, 40)
                //fonction qui fait recommencer le niveau
                retry()

                //Hidding the menu
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
    else if(action == 'gameWin'){

        //Changing text of buttons
        gameDisplayTitle.innerHTML = 'You won'
        gameDisplayButton1.innerHTML = 'Next level'
        gameDisplayButton2.innerHTML = 'Restart'

        //If the client click on the button "Next level"
        gameDisplayButton1.addEventListener(
            'click',
            function(){

                //fonction which move the player to the next level
                currentLevel.level++
                changeLevel(currentLevel)

                //Saving level to the LocalStorage
                localStorage.setItem('currentLevel', currentLevel.level)
                //Hidding the menu
                uiDivHide()

                gamePlaying = true
            }
        )

        //If the client click on the button "Restart level"
        gameDisplayButton2.addEventListener(
            'click',
            function(){

                //Fonction which retry the level
                retry()

                //Hidding the menu
                uiDivHide()
            }
        )
    }
    else if(action == 'gameVictory')
    {
        UIdiv.innerHTML = '<h1 class="gameDisplayTitle">Carlos Is Gone</h1><img class="victoryImage" src="resource_pack/background/carlos_is_gone.gif"><h2 class="gameDisplayButton1">Quit</h2>'

        //If the client click on the button "Quit"
        gameDisplayButton1.addEventListener(
            'click',
            function(){

                alert('Bravo !')
                //Redirection to the index.html
                document.location.href="index.html";
            }
        )
    }
}

//hidding of the menu
function uiDivHide(){
    UIdiv.style.display = 'none'
}

/*
NEXT LEVEL
*/

function changeLevel(levelToLoad) {

    //Removing of all the images and sprites
    ctx.clearRect(0, 0, 1300, 731)

    /*
    LEVEL 2 
    */
    if(levelToLoad.level == 2) {

        //Updating the level name
        currentLevel.levelName = 'LEVEL 2: ESCAPE WITH THE PLANE'
        currentLevel.nameUpdate()

        levelToLoad.background = 'map2_whithout_cop_and_car_and_passport.png'

        canvas.style.background = 'url(resource_pack/background/' + levelToLoad.background + ')'

        walls = [
            new Wall(0, 0, 1300, 10),//bordure haut
            new Wall(0, 721, 1300, 10),//bordure bas
            new Wall(0, 0, 10, 731),//bordure gauche
            new Wall(1290, 0, 10, 731),//bordure droit
            new Wall(205, 10, 90, 45),// Grillage pour Prison 
            new Wall(205, 0, 10, 200),// Grillage droit sapwn
            new Wall(0, 160, 50, 40),// Grillage bas spawn gauche
            new Wall(95, 160, 120, 40),// Grillage bas sapwn droite
            new Wall(0, 285, 210, 50),// Grillage haut poubelle voiture
            new Wall(200, 285, 10, 225),// Grillage droite poubelle voiture
            new Wall(135, 470, 75, 40),// Grillage bas droite poubelle voiture
            new Wall(0, 470, 70, 40),// Grillage bas gauche poubelle voiture
            new Wall(35, 320, 100, 55),// voiture entasse
            new Wall(290, 0, 10, 200),// Grillage gauche maison haut
            new Wall(290, 160, 790, 40),// Grillage haut + maison
            new Wall(1070, 115, 10, 50),// Grillage droite bas maison haut
            new Wall(1070, 0, 10, 70),// Grillage droite haut maison haut
            new Wall(375, 90, 165, 100),// Maison gauche haut
            new Wall(695, 70, 155, 100),// Maison droite haut
            new Wall(300, 285, 455, 40),// Grillage haut maison milieu
            new Wall(375, 325, 10, 75),// Gillage gauche maison milieu
            new Wall(745, 325, 10, 75),// Gillage droite maison milieu
            new Wall(465, 325, 165, 75),// Maison milieu
            new Wall(840, 285, 225, 40),// Grillage gauche herbe droite milieu
            new Wall(1135, 285, 80, 40),// Grillage droite herbe droite milieu
            new Wall(0, 630, 70, 55),// Grillage bas gauche
            new Wall(125, 630, 175, 55),// Grillage bas gauche 2
            new Wall(290, 490, 10, 250),// Grillage gauche plage
            new Wall(300, 490, 150, 55),// grillage haut gauche plage
            new Wall(515, 490, 230, 40),// grillage haut droite plage
            new Wall(740, 490, 10, 235),// Grillage droite plage
            new Wall(300, 680, 450, 55),// Grillage bas plage
            new Wall(840, 480, 10, 155),// Grillage gauche avion
            new Wall(840, 480, 450, 35),// Grillage haut avion
            new Wall(840, 595, 230, 40),// Grillage bas gauche avion
            new Wall(1150, 595, 140, 40),// Grillage bas droite avion
            new Wall(1147, 648, 15, 23),// poubelle avion 1
            new Wall(1123, 665, 15, 23),// poubelle avion 2
            new Wall(1136, 695, 15, 23),// poubelle avion 3
        ]

        guards = [
            new Guard(73, 550, 'down', 5, 'resource_pack/cop/cop_face.png'),
            new Guard(500, 550, 'down', 3, 'resource_pack/cop/cop_face.png'),
            new Guard(580, 110, 'up', 3, 'resource_pack/cop/cop_back.png'),
            new Guard(760, 220, 'down', 5, 'resource_pack/cop/cop_face.png'),
            new Guard(940, 30, 'down', 5, 'resource_pack/cop/cop_face.png')
        ]

        zoneObjects = [
            new ZoneObject(860, 515, 200, 80, 'victoryZone'),
            new ZoneObject(10, 10, 60, 90, 'camera'),//First camera on the left
            new ZoneObject(1200, 33, 90, 93, 'camera'),// Camera on the top right
        ]

        keys = [
            new Key(130, 340, 60, 50),
            new Key(625, 620, 60, 50),
            new Key(300, 110, 60, 50),
            new Key(1248, 100, 60, 50)
        ]
    }

    init()
    generateWall()
    generatingZoneObjects()
    keyCreate()

    //Drawing the player image
    drawPlayerImage()
}
