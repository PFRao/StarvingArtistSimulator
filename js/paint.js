var clickX = [];
var clickY = [];
var clickDrag = [];
var clickSize = [];
var clickTool = [];

var paint;

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var colorCyan = "#5cd5d1";
var colorBlack = "#000000";

var curColor = colorPurple;
var clickColor = [];

var timer = new Clock();

var curSize = "normal";

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
      radius = 2;
    }else if(clickSize[i] == "normal"){
      radius = 5;
    }else if(clickSize[i] == "large"){
      radius = 10;
    }else if(clickSize[i] == "huge"){
      radius = 20;
    }else{
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

    if(clickTool[i] == "eraser"){
      //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
      context.strokeStyle = 'white';
    }else{
      //context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
      context.strokeStyle = clickColor[i];
    }
    // context.strokeStyle = curColor;
    context.lineJoin = "round";
    context.lineWidth = radius;
    context.stroke();

  }
}

var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', 500);
canvas.setAttribute('height', 500);
canvas.setAttribute('id', 'theCanvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

var paletteDiv = document.getElementById('pictureDiv');

var pictureDiv = document.getElementById('pictureDiv');
picture = document.createElement('img');

whichPic = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
console.log("Selecting picture #", whichPic);
var picString = 'assets/' + whichPic + '.jpg';

picture.setAttribute('width', 500);
picture.setAttribute('height', 500);
picture.setAttribute('src', picString);
pictureDiv.appendChild(picture);

var timerDiv = document.getElementById('timerDiv');

var scoreDiv = document.getElementById('scoreDiv');
$('#scoreDiv').html("Score: 0");

// BRUSH CONTROLS

$('#smallBrush').click(function (e) {
  curSize = "small";
});

$('#normalBrush').click(function (e) {
  curSize = "normal";
});

$('#largeBrush').click(function (e) {
  curSize = "large";
});

$('#hugeBrush').click(function (e) {
  curSize = "huge";
});

// COLOR CONTROLS

$('#purplePaint').click(function (e) {
  curColor = colorPurple;
});

$('#greenPaint').click(function (e) {
  curColor = colorGreen;
});

$('#yellowPaint').click(function (e) {
  curColor = colorYellow;
});

$('#brownPaint').click(function (e) {
  curColor = colorBrown;
});

$('#cyanPaint').click(function (e) {
  curColor = colorCyan;
});

$('#blackPaint').click(function (e) {
  curColor = colorBlack;
});

// PAINTING

$('#theCanvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

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

// TIMER

function Clock () {
  // 1. Create a bunch of things.
  this.currentTime = 5;

  this.printTime = function () {
    $('#timerDiv').html(this.currentTime.toString());
  };

  this._tick = function () {
    if (this.currentTime > 1) {
      this._incrementSeconds();
      this.printTime();
    } else {
      $('#timerDiv').html("Time!");
      window.clearInterval(this.interval);
      compare();
    }
  };

  this._incrementSeconds = function () {
    this.currentTime -= 1;
  };
  // 3. Call printTime.
  this.printTime();

  // 4. Schedule the tick at 1 second intervals.
  // this.interval = window.
  this.interval = window.setInterval(this._tick.bind(this), 1000);
}

// COMPARISON

var compare = function () {

  var finished = document.getElementById("theCanvas");

  finished.toBlob(function(blob) {
    var newImg = document.createElement("img"),
    url = URL.createObjectURL(blob);

    var diff = resemble(url).compareTo(picString).ignoreColors().onComplete(function(data){
      var theScore = (100 - data.rawMisMatchPercentage);
      countUp(theScore * 10000);
    });

  });
};

var countUp = function (target) {

  var count = 0;
  console.log("Your score is:", target);
  var theInterval = window.setInterval(function () {
    $('#scoreDiv').html("Score: " + count);
    if (count < target) {
      count += 1;
    } else {
      window.clearInterval(theInterval);
    }
  }, 1);

};
