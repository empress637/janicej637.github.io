function regularPolygonGeometry(n,innerColor,outerColor){

var canvas=document.getElementById("canvas"); //here canvas is the name of the html5 tag id canvas where you want to insert shape;

var canvasShape=canvas.getContext("2d"); //drawing context of the canvas

canvasShape.beginPath();//begins the path of the shape

var xCenter=100,yCenter=100;//say center of the shape is 100,100

var radius=20;//radius of the shape

canvasShape.moveTo(100,100);//center of the shape

for(var i=0;i<=n;i++){ //to get n edges of the polygon

canvasShape.lineTo(xCenter+radius* Math.cos(i * 2 * Math.PI / n), yCenter+radius* Math.sin(i * 2 * Math.PI / n));//draw line from one point to another with center distance as radius

//you can add color over here also for edge shape

}

canvasShape.closePath();//to close path of the shape

canvasShape.fillStyle = innerColor; //fill shape with innerColor provided

canvasShape.strokeStyle = outerColor;//fill shape sides with outerColor provided

canvasShape.lineWidth = 1; //shape line width

canvasShape.stroke(); //draw shape

canvasShape.fill();//to fill color in the shape

}

