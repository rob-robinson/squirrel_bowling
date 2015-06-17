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

var c = [
    {x:160,y:160},
    {x:140,y:140},
    {x:180,y:140},
    {x:120,y:120},
    {x:160,y:120},
    {x:180,y:120},
    {x:100,y:100},
    {x:140,y:100},
    {x:180,y:100},
    {x:220,y:100}
];

var pins = [
    {   id:1,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },

    {   id:2,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },
    {   id:3,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },

    {   id:4,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },
    {   id:5,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },
    {   id:6,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },

    {   id:7,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },
    {   id:8,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },
    {   id:9,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    },
    {   id:10,
        status:1,
        coordinates:c[this.id-1],
        draw: function(){
            var s = new Image();
            s.src = "img/pin.png";
            context.drawImage(s, this.coordinates.x, this.coordinates.y, 30, 120);
        }
    }
];
console.log(pins);
var player = {
    color: "#00A",
    x: 1024 / 2, // start point ... center
    y: 700 / 2, // start point ... center
    dx: 0, // amt to accelerate by -- horizontal
    dy: 0, // amt to accelerate by -- vertical
    width: 20,
    height: 10,
    draw: function () {
        'use strict';

        var s = new Image();
        var newX = this.x += this.dx/3;
        var newY = this.y += this.dy/3;
        var tempScore, score;

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        s.src = "img/home_page_squirrel2.png";
        context.drawImage(s, this.x, this.y, 80, 60);

        if (newX >= (canvasWidth - 128)) {
            newX = 0;
        }
        if (newX < 0) {
            newX = (canvasWidth - 128);
        }
        if (newY >= (canvasHeight - 100)) {
            newY = 0;
        }

        // scoring hacks...
        if (newY < 80) {
            newY = 550;
            newX = 550;
            this.dy = 0;
            this.dx = 0;

            tempScore = Math.abs(432 - this.x);
            score = 0;

            if (tempScore < 2.5) {
                score = 10;
            } else if (tempScore < 15) {
                score = 9;
            } else if (tempScore < 25) {
                score = 8;
            } else if (tempScore < 35) {
                score = 7;
            } else if (tempScore < 45) {
                score = 6;
            } else if (tempScore < 55) {
                score = 5;
            }

            document.getElementById("score").innerHTML = "Landed on : " + this.x + " TempScore : " + tempScore + " Score : " + score;
            // perfect is 432:
            // score is Math.abs(432-this.x)
        }

        this.x = newX;
        this.y = newY;
    } // end draw
};

function draw(){
    'use strict';
    player.draw();
    for(var i=pins.length-1;i>=0; i-=1){
        pins[i].draw();
    }

}


window.addEventListener('load', function() {
    'use strict';
    init();
}, false);



