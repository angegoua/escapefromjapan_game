function startNewGame(){
    //Removing player data
    localStorage.removeItem('currentLevel')
    document.location.href="play.html";
}