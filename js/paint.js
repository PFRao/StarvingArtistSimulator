var clickX = [];
var clickY = [];
var clickDrag = [];
var clickSize = [];
var clickTool = [];

var paint;
var started;

// var colorPurple = "#cb3594";
// var colorGreen = "#659b41";
// var colorYellow = "#ffcf33";
// var colorBrown = "#986928";
// var colorCyan = "#5cd5d1";
// var colorBlack = "#000000";

var curColor = "#000000";
var clickColor = [];

var timer = new Clock();

var curSize = "large";

// var gameMode = "assets";
// var gameExtension = "jpg";
// var gameTime = 90;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  var radius;

  for(var i = 0; i < clickX.length; i++)
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

    // if(clickTool[i] == "eraser"){
    //   //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
    //   context.strokeStyle = 'white';
    // }else{
    //   //context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
    // }

    context.strokeStyle = clickColor[i];
    context.lineJoin = "round";
    context.lineWidth = radius;
    context.stroke();

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

var paletteDiv = document.getElementById('paletteDiv');

var pictureDiv = document.getElementById('pictureDiv');

whichPic = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
console.log("Selecting picture #", whichPic);
var picString = 'assets2/' + whichPic + '.png';

var image = new Image();
image.height = 500;
image.width = 500;
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
  $('body').append("<ul id='leaderboard'>Previous Pictures:</ul>");
  renderLeaderboard();

};

// var pictureDiv = document.getElementById('pictureDiv');
// picture = document.createElement('img');
//
// whichPic = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
// console.log("Selecting picture #", whichPic);
// var picString = 'assets/' + whichPic + '.jpg';
//
// picture.setAttribute('width', 500);
// picture.setAttribute('height', 500);
// picture.setAttribute('src', picString);
// pictureDiv.appendChild(picture);

// var timerDiv = document.getElementById('timerDiv');
//
// var scoreDiv = document.getElementById('scoreDiv');
$('#scoreDisplay').html("Score: 0");

// BRUSH CONTROLS

$('#smallBrush').click(function (e) {
  curSize = "small";
  updateBrush();
});

$('#normalBrush').click(function (e) {
  curSize = "normal";
  updateBrush();
});

$('#largeBrush').click(function (e) {
  curSize = "large";
  updateBrush();
});

$('#hugeBrush').click(function (e) {
  curSize = "huge";
  updateBrush();
});

$('#ginormousBrush').click(function (e) {
  curSize = "ginormous";
  updateBrush();
});

// COLOR CONTROLS

// $('#purplePaint').click(function (e) {
//   curColor = colorPurple;
//   updateBrush();
// });
//
// $('#greenPaint').click(function (e) {
//   curColor = colorGreen;
//   updateBrush();
// });
//
// $('#yellowPaint').click(function (e) {
//   curColor = colorYellow;
//   updateBrush();
// });
//
// $('#brownPaint').click(function (e) {
//   curColor = colorBrown;
//   updateBrush();
// });
//
// $('#cyanPaint').click(function (e) {
//   curColor = colorCyan;
//   updateBrush();
// });
//
// $('#blackPaint').click(function (e) {
//   curColor = colorBlack;
//   updateBrush();
// });

$('#eraser').click(function (e) {
  curColor = "#FFFFFF";
  updateBrush(true);
});

// PAINTING

$('#theCanvas').mousedown(function(e){
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

$('#theCanvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#theCanvas').mouseup(function(e){
  paint = false;
});

$('#theCanvas').mouseleave(function(e){
  paint = false;
});

// COLOR PICKING

$('#thePicture').click(function (event) {
  // var colorPicker = document.getElementById('thePicture');

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
  // 1. Create a bunch of things.
  this.currentTime = 10;

  this.printTime = function () {
    $('#timerDiv').html(this.currentTime.toString());
  };

  this._tick = function () {
    if (this.currentTime > 1) {
      this._incrementSeconds();
      this.printTime();
    } else {
      $('#timerDiv').html("Time's up!");
      window.clearInterval(this.interval);
      compare();
    }
  };

  this._incrementSeconds = function () {
    this.currentTime -= 1;
  };
  // 3. Call printTime.
  $('#timerDiv').html("Start drawing to begin the game!");

  // 4. Schedule the tick at 1 second intervals.
  // this.interval = window.
  this.startGame = function () {
    this.printTime();
    this.interval = window.setInterval(this._tick.bind(this), 1000);
  };
}

// COMPARISON

// var compare = function () {
//
//   var finished = document.getElementById("theCanvas");
//
//   finished.toBlob(function(blob) {
//     var newImg = document.createElement("img"),
//     url = URL.createObjectURL(blob);
//     console.log(url);
//     var diff = resemble(url).compareTo(picString).onComplete(function(data){
//       var theScore = (100 - data.rawMisMatchPercentage);
//       countUp(theScore);
//     });
//
//     newImg.onload = function() {
//       URL.revokeObjectURL(url);
//     };
//
//     $('#canvasDiv').html("<img src='" + url + "' />");
//
//   });
// };

var compare = function () {

  var finished = document.getElementById("theCanvas");
  var goalPic = document.getElementById("thePicture");

  finished.toBlob(function(blob) {
    var url, url2;
    var newImg = document.createElement("img");
    url = URL.createObjectURL(blob);
    // console.log(Url.createObjectURL(blob));
    // console.log(blob);
    newImg.onload = function() {
      URL.revokeObjectURL(url);
    };
    goalPic.toBlob(function(blob) {
      var newImg = document.createElement("img");
      url2 = URL.createObjectURL(blob);

      newImg.onload = function() {
        URL.revokeObjectURL(url2);
      };
      $('#canvasDiv').html("<img id='theResult' src='" + url + "' />");

      var diff = resemble(url).compareTo(url2).onComplete(function(data){
        var theScore = (100 - data.rawMisMatchPercentage);
        countUp(theScore * 10);
      });
    });


  });


};

// LEADERBOARD

var renderLeaderboard = function () {
  leaderboard.forEach(function (element, index) {
    $('#leaderboard').append(
      "<li>" + element[0] + "<br />" + element[1] + "<br />",
      element[2],
      "</li>"
    );
  });
};

var updateLeaderboard = function (name, score, picture) {
  leaderboard.push([name, score, picture]);
};

// UTILITY STUFF

var updateBrush = function () {
  var newSize;

  if (curSize === "small") {
    newSize = 5;
  } else if (curSize === "normal") {
    newSize = 10;
  } else if (curSize === "large") {
    newSize = 20;
  } else if (curSize === "huge") {
    newSize = 30;
  } else {
    newSize = 40;
  }

  $('#currentColor').css('background', curColor);
  $('#currentColor').css('height', newSize);
  $('#currentColor').css('width', newSize);
  $('#currentColor').css('border-radius', newSize/2);
};

var countUp = function (target) {

  var count = 0;
  var playerName = $('#playerName').val();
  var theResult = $('#theResult');
  console.log("Your score is:", target);
  var theInterval = window.setInterval(function () {
    $('#scoreDisplay').html("Score: " + count);
    if (count < target) {
      count += 1;
    } else {
      window.clearInterval(theInterval);
      updateLeaderboard(playerName, count, theResult);
    }
  }, 1);


};
