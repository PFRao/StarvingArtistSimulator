/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Paint = __webpack_require__(1);
	var Palette = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var clickX = [];
	var clickY = [];
	var clickDrag = [];
	var paint;

	var colorPurple = "#cb3594";
	var colorGreen = "#659b41";
	var colorYellow = "#ffcf33";
	var colorBrown = "#986928";
	var curColor = colorPurple;
	var clickColor = [];

	var clickSize = [];
	var curSize = "normal";

	var clickTool = [];

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

	  // context.strokeStyle = "#df4b26";
	  context.lineJoin = "round";
	  // context.lineWidth = 5;

	  // for(var i=0; i < clickX.length; i++) {
	  //   context.beginPath();
	  //   if(clickDrag[i] && i){
	  //     context.moveTo(clickX[i-1], clickY[i-1]);
	  //    }else{
	  //      context.moveTo(clickX[i]-1, clickY[i]);
	  //    }
	  //    context.lineTo(clickX[i], clickY[i]);
	  //    context.closePath();
	  //    context.strokeStyle = clickColor[i];
	  //
	  //    var radius = 5;
	  //    context.lineWidth = radius;
	  //
	  //    context.stroke();
	  // }

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	console.log(colorPurple);


/***/ }
/******/ ]);