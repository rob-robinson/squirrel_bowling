window.requestAnimationFrame = function () {
    'use strict';
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (f) {
                window.setTimeout(f, 1e3 / 60);
            };
};

var Assets = {

};

var canvas;
var context;

var canvasWidth,canvasHeight;

var mouseIsDown = false;

var clickX,clickY;
var releaseX,releaseY;

// event delegates



function onMouseMove(evt) {
    'use strict';
    evt.preventDefault();

    if (mouseIsDown) {
        console.log("mouse is down X:" + evt.changedTouches[0].pageX + " Y:" + evt.changedTouches[0].pageY);

        if (evt.changedTouches && evt.changedTouches.length > 0) {
            player.x = evt.changedTouches[0].pageX;
            player.y = evt.changedTouches[0].pageY;
        } else {
            player.x = evt.pageX;
            player.y = evt.pageY;
        }
    }
}

function onMouseStart(e) {
    'use strict';
    e.preventDefault();

    if (e.changedTouches && e.changedTouches.length > 0) {
        clickX = e.changedTouches[0].pageX;
        clickY = e.changedTouches[0].pageY;
    } else {
        clickX = e.pageX;
        clickY = e.pageY;
        player.x = e.pageX;
        player.y = e.pageY;
    }

    mouseIsDown = true;
}

function onMouseEnd(e) {
    'use strict';
    e.preventDefault();
    mouseIsDown = false;
    //releaseX;
    //releaseY;

    if (e.changedTouches && e.changedTouches.length > 0) {
        releaseX = e.changedTouches[0].pageX;
        releaseY = e.changedTouches[0].pageY;
    } else {
        releaseX = e.pageX;
        releaseY = e.pageY;
    }

    player.x = releaseX;
    player.y = releaseY;

    // velocity hack...
    player.dx = (clickX - releaseX) / 10;
    player.dy = (clickY - releaseY) / 10;
}

function keyCheck(event) {
    'use strict';
    var KeyID = event.keyCode;

    if (KeyID === 39) {
        //console.log('right');
        player.dx = Math.abs(player.dx);
    } else if (KeyID === 37) {
        //console.log('left');
        player.dx = Math.abs(player.dx) * -1;
    } else if (KeyID === 38) {
        //console.log('up');
        player.dy = Math.abs(player.dy) * -1;
    } else if (KeyID === 40) {
        //console.log('down');
        player.dy = Math.abs(player.dy);
    }
}

// end event delegates

function init() {
    'use strict';
    canvas = document.createElement('canvas');
    canvas.width = "1024"; // dynamic please
    canvas.height = "700"; // dynamic please
    canvas.id = "gameboard";

    canvas.style.background = "url(img/gameboard.jpg)";

    document.body.appendChild(canvas);

    // delegates
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mousedown', onMouseStart, false);
    canvas.addEventListener('mouseup', onMouseEnd, false);
    canvas.addEventListener('touchmove', onMouseMove, false);
    canvas.addEventListener('touchstart', onMouseStart, false);
    canvas.addEventListener('touchend', onMouseEnd, false);

    document.addEventListener('keyup', keyCheck, false);

    context = canvas.getContext("2d");

    canvasWidth = 1024;
    canvasHeight = 700;
    var FPS = 30;

    setInterval(function () {
        //update();
        draw();
    }, 1 / FPS);
}


var game = {
  tempScore:0,
  score:0
};

var coordinates = [
    {x:160,y:160},
    {x:140,y:140},
    {x:180,y:140},
    {x:120,y:120},
    {x:160,y:120},
    {x:200,y:120},
    {x:100,y:100},
    {x:140,y:100},
    {x:180,y:100},
    {x:220,y:100}
];

var pinImage = new Image();
pinImage.src = "img/pin.png";

var pins = [];

for(var i=0; i<=9; i+=1){
  pins.push(
    {
      x:coordinates[i].x+300,
      y:coordinates[i].y-30,
      width:40,
      height:114,

        status:1,
        draw: function(){
            context.drawImage(pinImage, this.x, this.y, this.width, this.height);
        }
    }
  );
}

var squirrelImage = new Image();
squirrelImage.src = "img/home_page_squirrel1.png";

var player = {
    color: "#00A",
    x: 1024 / 2, // start point ... center
    y: 700 / 2, // start point ... center
    newX:this.x,
    newY:this.y,
    dx: 0, // amt to accelerate by -- horizontal
    dy: 0, // amt to accelerate by -- vertical
    width: 20,
    height: 10,
    draw: function () {
        'use strict';


        this.newX = this.x += this.dx/3;
        this.newY = this.y += this.dy/3;

        if(this.dx == 0 && this.dy == 0){
          squirrelImage.src = "img/home_page_squirrel1.png";
        } else {
          squirrelImage.src = "img/home_page_squirrel2.png";
        }

        context.drawImage(squirrelImage, this.x, this.y, 100, 100);

        if (this.newX >= (canvasWidth - 350)) {
          this.newY = this.y;
          this.newX = this.x;
          this.dx = 0;
          this.dy = 0;
        } else
        if (this.newX <= 220) {
          this.newY = this.y;
          this.newX = this.x;
          this.dx = 0;
          this.dy = 0;
        } else
        if (this.newY >= (canvasHeight - 100)) {
          this.newY = this.y;
          this.newX = this.x;
          this.dx = 0;
          this.dy = 0;
        } else
        if (this.newY <= 55) {
            this.newY = this.y;
            this.newX = this.x;
            this.dx = 0;
            this.dy = 0;
        }


        document.getElementById("score").innerHTML = "Landed on : " + parseInt(this.x) + " TempScore : " + parseInt(game.tempScore) + " Score : " + game.score;
            // perfect is 432:
            // score is Math.abs(432-this.x)


        this.x = this.newX;
        this.y = this.newY;
    } // end draw
};

function draw(){
    'use strict';
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for(var i=pins.length-1;i>=0; i-=1){


      if (pins[i].x < player.x + player.width &&
         pins[i].x + pins[i].width > player.x &&
         pins[i].y < player.y + player.height &&
         pins[i].height + pins[i].y > player.y &&
       pins[i].status == 1 ) {
          // collision detected!
          pins[i].status = 0;

          game.score += 1;
      }
      if(pins[i].status == 1){
        pins[i].draw();
      }

    }

    player.draw();

}


window.addEventListener('load', function() {
    'use strict';
    init();
}, false);
