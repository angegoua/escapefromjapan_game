var canvas = document.querySelector('#game')
var ctx = canvas.getContext("2d")

ctx.beginPath();
ctx.rect(20, 40, 40, 40);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.rect(100, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();