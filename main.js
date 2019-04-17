var ctx = document.getElementById("canvas");
var pen = ctx.getContext('2d');

let ball = new Ball(random(),random(),15,1,1)
let bar = new Bar(0,450,100,5);

function random() {
    return Math.floor(Math.random()*500)
}



function Ball(x,y,radius,speedX,speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
}

Ball.prototype.draw = function (pen) {
    pen.clearRect(0,0,500,500);
    pen.beginPath();
    pen.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
    pen.closePath();
    pen.fill()

}

Ball.prototype.move = function (ballx) {
    ballx.x += ballx.speedX; //tọa độ x của bóng + tốc độ
    ballx.y += ballx.speedY; // tọa độ y của bóng + tốc độ

    ballx.left = ballx.x - ballx.radius; //bên trái của bóng
    ballx.top = ballx.y - ballx.radius; //bên trên của bóng
    ballx.right = ballx.x + ballx.radius; //bên phải của bóng
    ballx.bottom = ballx.y + ballx.radius; // bên dưới của bóng
}

Ball.prototype.checkCollision = function () {
    if (this.left <=0 || this.right >= ctx.width){ // nếu bên trái bóng bé hơn 0 và bên phải lớn hơn khung thì tốc độ đảo ngược.
        this.speedX = -this.speedX;
    }
    if (this.top <=0 || this.bottom >= ctx.height){
        this.speedY = -this.speedY;
    }
}

Ball.prototype.death = function (bar,ball) {
    if (!check(bar,ball) && ball.y === (450 - ball.radius) ){
        alert("you lose")
    }
}



function Bar(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Bar.prototype.move = function(){
    window.addEventListener('keydown',moveBar);
}

Bar.prototype.draw = function (x){
    x.fillRect(bar.x,bar.y,bar.w,bar.h);
}

Bar.prototype.replay = function (bar,ball) {
    if (ball.bottom >= bar.y || bar.top <=0){
        ball.speedY = -ball.speedY
    }
}

function moveBar(evt) {
    switch (evt.key) {
        case "ArrowLeft":
            bar.x -= 30;
            break;
        case "ArrowRight":
            bar.x += 30;
            break;
    }
}
function check(bar,ball) {
    for (i=0;i<=100;i++){
        if (bar.x+i === ball.x){
            return true;
        }
    }
}
function speedUp(bar,ball) {
    let count = 0;
    let speedup = 1;
    if (check(bar,ball)&&ball.y === (450-ball.radius)){
         count++;
    }

    if (count === 2){
        return speedup /= 1,1;
        count =0;
    }
}


function gameStart() {
    ball.move(ball);
    ball.checkCollision();
    ball.draw(pen);
    bar.draw(pen);
    bar.move();
    ball.death(bar,ball);
    bar.replay(bar,ball);
}

