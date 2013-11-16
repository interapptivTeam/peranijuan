var cl = new CanvasLoader('canvasloader-container');
		cl.setShape('spiral'); // default is 'oval'
		cl.setDiameter(93); // default is 40
		cl.setDensity(93); // default is 40
		cl.setRange(0.9); // default is 1.3
		cl.setFPS(60); // default is 24
		cl.show(); // Hidden by default
		
		// This bit is only for positioning - not necessary
		  var loaderObj = document.getElementById("canvasLoader");
  		loaderObj.style.position = "absolute";
  		loaderObj.style["top"] = cl.getDiameter() * -0.5 + "px";
  		loaderObj.style["left"] = cl.getDiameter() * -0.5 + "px";
