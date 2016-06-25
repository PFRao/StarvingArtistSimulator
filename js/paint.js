var clickX = [];
var clickY = [];
var clickDrag = [];
var clickSize = [];
var clickTool = [];

var paint;
var started;

var curColor = "#000000";
var clickColor = [];

var timer = new Clock();

var curSize = "large";

var theIndex = 0;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}

function redraw(){
  // context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  var radius;

  for(var i = theIndex; i < clickX.length; i++)
  {
    if(clickSize[i] == "small"){
      radius = 5;
    } else if(clickSize[i] == "normal") {
      radius = 10;
    } else if(clickSize[i] == "large") {
      radius = 20;
    } else if(clickSize[i] == "huge") {
      radius = 30;
    } else if(clickSize[i] == "ginormous") {
      radius = 40;
    } else {
      alert("Error: Radius is zero for click " + i);
      radius = 5;
    }

    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }else{
      context.moveTo(clickX[i], clickY[i]);
    }

    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineJoin = "round";
    context.lineWidth = radius;
    context.stroke();

    theIndex = i;
  }
}

var canvasDiv = document.getElementById('canvasDiv');
var canvas = document.createElement('canvas');
canvas.setAttribute('width', 500);
canvas.setAttribute('height', 500);
canvas.setAttribute('id', 'theCanvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, 500, 500);

var paletteDiv = document.getElementById('paletteDiv');

var pictureDiv = document.getElementById('pictureDiv');

whichPic = Math.floor(Math.random() * (52 - 1 + 1)) + 1;
console.log("Selecting picture #", whichPic);
var picString = 'assets2/' + whichPic + '.png';

var image = new Image();
image.height = 500;
image.width = 500;
image.crossOrigin = "Anonymous";
image.src = picString;

var picture = document.createElement('canvas');
picture.setAttribute('width', 500);
picture.setAttribute('height', 500);
picture.setAttribute('id', 'thePicture');
pictureDiv.appendChild(picture);

image.onload = function () {

  if(typeof G_vmlCanvasManager != 'undefined') {
    picture = G_vmlCanvasManager.initElement(picture);
  }
  pictureContext = picture.getContext("2d");
  pictureContext.drawImage(image, 0, 0, 500, 500);

  var child = $l.createWithId("ul", "leaderboard");
  document.body.appendChild(child);

  renderLeaderboard();
  selectBtn("largeBrush");
  updateBrush();

};

$l('#scoreDisplay').html("Score: 0");

// BRUSH CONTROLS

function selectBtn(brushId) {
  var sel = document.getElementsByClassName('brushButton');
  for (var i=0; i<sel.length; i++) {
	sel[i].style.border = "";
  }
  document.getElementById(brushId).style.border = '2px solid white';
}

$l('#smallBrush').on('click', function (e) {
  curSize = "small";
  selectBtn("smallBrush");
});

$l('#normalBrush').on('click', function (e) {
  curSize = "normal";
  selectBtn("normalBrush");
});

$l('#largeBrush').on('click', function (e) {
  curSize = "large";
  selectBtn("largeBrush");
});

$l('#hugeBrush').on('click', function (e) {
  curSize = "huge";
  selectBtn("hugeBrush");
});

$l('#ginormousBrush').on('click', function (e) {
  curSize = "ginormous";
  selectBtn("ginormousBrush");
});

// PAINTING

$l('#theCanvas').on('mousedown', function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  if (!started) {
    started = true;
    timer.startGame();
  }

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$l('#theCanvas').on('mousemove', function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$l('#theCanvas').on('mouseup', function(e){
  paint = false;
});

$l('#theCanvas').on('mouseleave', function(e){
  paint = false;
});

// COLOR PICKING

$l('#thePicture').on('click', function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  var imgData = pictureContext.getImageData(x, y, 1, 1);
  var r = imgData.data[0];
  var g = imgData.data[1];
  var b = imgData.data[2];

  var newHex = rgbToHex(r, g, b);
  curColor = "#" + newHex;
  updateBrush();
});

$l('#thePicture').on('mousemove', function (event) {
  if (document.getElementById('hover')) {
    document.getElementById('hover').remove();
  }
  var hover = $l.createWithId("div", "hover");

  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  var imgData = pictureContext.getImageData(x, y, 1, 1);
  var r = imgData.data[0];
  var g = imgData.data[1];
  var b = imgData.data[2];

  var newHex = rgbToHex(r, g, b);
  hoveredColor = "#" + newHex;

  hover.style.left = event.pageX + 5 + "px";
  hover.style.top = event.pageY + 5 + "px";

  hover.style.background = hoveredColor;
  document.body.appendChild(hover);
});

$l('#thePicture').on('mouseleave', function (event) {
  document.getElementById('hover').remove();
});

$l('#eraser').on('click', function (e) {
  curColor = "#FFFFFF";
  updateBrush(true);
});

function rgbToHex(r,g,b) {
  return toHex(r)+toHex(g)+toHex(b);
}

function toHex(n) {
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}

// TIMER

function Clock () {
  this.currentTime = 3;

  this.printTime = function () {
    $l('#timerDiv').html(this.currentTime.toString());
  };

  this._tick = function () {
    if (this.currentTime > 1) {
      this._incrementSeconds();
      this.printTime();
    } else {
      $l('#timerDiv').html("Time's up!");
      window.clearInterval(this.interval);
      compare();
    }
  };

  this._incrementSeconds = function () {
    this.currentTime -= 1;
  };

  $l('#timerDiv').html("Start drawing to begin the game!");

  this.startGame = function () {
    this.printTime();
    this.interval = window.setInterval(this._tick.bind(this), 1000);
  };
}

// COMPARISON

var compare = function () {

  var finished = document.getElementById("theCanvas");
  var goalPic = document.getElementById("thePicture");
  var handicap;

  finished.toBlob(function(blob) {
    var url, url2;
    var newImg = document.createElement("img");
    url = URL.createObjectURL(blob);
    newImg.onload = function() {
      URL.revokeObjectURL(url);
    };
    goalPic.toBlob(function(blob) {
      var newImg = document.createElement("img");
      url2 = URL.createObjectURL(blob);

      newImg.onload = function() {
        URL.revokeObjectURL(url2);
      };
      $l('#canvasDiv').html("<img id='theResult' src='" + url + "' />");

      var biff = resemble(url).compareTo("../assets/blank.jpg").onComplete(function (data) {
        handicap = (100 - data.rawMisMatchPercentage);
      });

      var diff = resemble(url).compareTo(url2).onComplete(function(data){
        var theScore = (100 - data.rawMisMatchPercentage);
        if (handicap < 5) {
          countUp(0);
        } else {
          countUp((theScore) * 50);
        }
      });
    });

  });

};

// LEADERBOARD

var renderLeaderboard = function () {
  leaderboard = leaderboard.sort(function (a, b) {
    return b[1] - a[1];
  });
  leaderboard.forEach(function (element, index) {
    var newListing = $l.create("li", "listing");

    $l(newListing).append(element[0], element[1], element[2]);
    $l('#leaderboard').append(newListing);
  });
};

var updateLeaderboard = function (name, score, picture) {
  leaderboard.push([name, score, picture]);
};

// UTILITY STUFF

var updateBrush = function () {
  document.getElementById('currentColor').style.background = curColor;
};

var countUp = function (target) {

  var count = 0;

  var playerName;
  if($l('#playerName').val().length > 0) {
    playerName = $l('#playerName').val() + " - ";
  } else {
    playerName = "anonymous - ";
  }

  var theResult = document.getElementById('theResult');
  var theMasterpiece = theResult.cloneNode(false);
  theMasterpiece.removeAttribute('id');

  if (target > 0) {
    updateLeaderboard(playerName, Math.ceil(target), theMasterpiece);
  }
  var theInterval = window.setInterval(function () {
    $l('#scoreDisplay').html("Score: " + count);
    if (count < target) {
      count += 1;
    } else {
      window.clearInterval(theInterval);
    }
  }, 1);

};
