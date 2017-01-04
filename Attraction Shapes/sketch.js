// for red, green, and blue color values
var r, g, b;
var shape;
var mouseShape;
var shapes = [];
var gravity;
var util;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // Pick colors randomly
  r = 255;//random(255);
  g = 255//random(255);
  b = 250//random(255);
  gravity = new Gravity(29.9);

  createShapes(100);
  //static shapes
  //createNoRandomShapes(100);
  shape = new MyShape(width, 100);
  mouseShape = new MyShape(mouseX, mouseY);
  util = new Util();

}

function draw() {
  background(0);
  // Draw a circle
  //strokeWeight(2);
  //stroke(r, g, b);

  mouseShape.SetXPosition(mouseX);
  mouseShape.SetYPosition(mouseY);


  shapes.forEach(function (shape) {

    //gravity
    applyGravity(shape);

    //attract or reppel
    shapes.forEach(function (shapeToFollow) {
      if (shape.currentX !== shapeToFollow.currentX && shape.currentY !== shapeToFollow.currentY) {
        followShape(shape, shapeToFollow);
        //followShape(shapeToFollow, shape);

      }

    }, this);

    //mouse
    followShape(shape, mouseShape);
    
    //show
    shape.show();

  }, this);

  //mouse
  // shapes.forEach(function (shape) {
  //   followShape(shape, mouseShape);
  // })



  mouseShape.width = 20;
  mouseShape.height = 20;
  mouseShape.show();


}

function createShapes(quantity) {
  let x = 0;
  let y = 0;
  for (var i = 0; i < quantity; i++) {
    x = random(width);
    y = random(height);
    shapes.push(new MyShape(x, y));
  }
}


function createNoRandomShapes(total){

  for(let i = 0; i < total; i++){
    x = width/i;
    y = height/i;
    shapes.push(new MyShape(x, y));
  }
}

function followMouse(shape) {

  if (!isOnMouse(shape)) {
    let distance = util.distanceBetweenPoints(mouseX, shape.currentX, mouseY, shape.currentY);
    let intensity = 1.8 * (Math.pow(distance, 2) / 400);

    if (isPositive(shape)) {
      attract(shape, intensity);
    } else {
      reppel(shape, intensity)
    }
  }
}

function followShape(shape, shapeToFollow) {

  //if (!isCloseToShape(shape, shapeToFollow)) {
    let distance = util.distanceBetweenPoints(shapeToFollow.currentX, shape.currentX, shapeToFollow.currentY, shape.currentY);
    let intensity = Math.sqrt(distance) / 2; /// 0.5;

    let shouldAttract = (isPositive(shape) && !isPositive(shapeToFollow) || !isPositive(shape) && isPositive(shapeToFollow))

    if (shouldAttract) {

    if(distance < 255 && !isCloseToShape(shape, shapeToFollow) ){
    stroke(0, 0,255 - distance);
        line(shape.currentX,shape.currentY, shapeToFollow.currentX,shapeToFollow.currentY)
      attract(shape, intensity, shapeToFollow);
    }
    } else {
      if(distance < 255  ){
      stroke(275 - distance, 0,0);
        line(shape.currentX,shape.currentY, shapeToFollow.currentX,shapeToFollow.currentY)
      reppel(shape, intensity, shapeToFollow)
      }
    }
  //}
}

function attract(shape, intensity, shapeToFollow) {
  let xMov = (shapeToFollow.currentX  - shape.currentX)  / intensity;
  let yMov = (shapeToFollow.currentY  - shape.currentY) / intensity;

  //console.log("x:", shape.currentX + xMov, "y", shape.currentY + yMov);
  let isMovingLeft = (shapeToFollow.currentX - shape.currentX) <= 0;
  let isMovingRight = (shapeToFollow.currentX - shape.currentX) >= 0;
  let isMovingUp = (shapeToFollow.currentY - shape.currentY) < 0;
  let isMovingDown = (shapeToFollow.currentY - shape.currentY) > 0;
  let canMoveToLeft = isMovingLeft && !isOnLeftWall(shape);
  let canMoveToRight = isMovingRight && !isOnRightWall(shape);
  let canMoveToUp = isMovingUp && !isOnTopWall(shape);
  let canMoveToDown = isMovingDown && !isOnTheFloor(shape);

  if (canMoveToLeft || canMoveToRight) {
    shape.SetXPosition(shape.currentX + xMov);

  }

  if (canMoveToUp || canMoveToDown) {
    shape.SetYPosition(shape.currentY + yMov);
     

    //console.log("up:",canMoveToUp,"down:",canMoveToDown)
  }

}

function reppel(shape, intensity, shapeToFollow) {
  let xMov = (shapeToFollow.currentX  - shape.currentX)  / intensity;
  let yMov = (shapeToFollow.currentY  - shape.currentY) / intensity;


  let isMovingLeft = (shapeToFollow.currentX - shape.currentX) >= 0;
  let isMovingRight = (shapeToFollow.currentX - shape.currentX) <= 0;
  let isMovingUp = (shapeToFollow.currentY - shape.currentY) > 0;
  let isMovingDown = (shapeToFollow.currentY - shape.currentY) < 0;
  let canMoveToLeft = isMovingLeft && !isOnLeftWall(shape);
  let canMoveToRight = isMovingRight && !isOnRightWall(shape);
  let canMoveToUp = isMovingUp && !isOnTopWall(shape);
  let canMoveToDown = isMovingDown && !isOnTheFloor(shape);

  if (canMoveToLeft || canMoveToRight) {
    shape.SetXPosition(shape.currentX - xMov);
  

  }

  if (canMoveToUp || canMoveToDown) {

    shape.SetYPosition(shape.currentY - yMov);
   
    //console.log("up:",canMoveToUp,"down:",canMoveToDown)
  }
}



//SUPPORT FUNCTIONS

function isPositive(shape) {
  return shape.charge % 2 === 0;
}

function applyGravity(shape) {
  if (!isShapeOnTheFloor(shape)) {
    gravity.apply(shape);
  }
}

function isShapeOnTheFloor(shape) {
  return isOnTheFloor(shape)//shape.currentY >= height;
}

function isCloseToShape(shape, shapeToFollow) {
  let dist = util.distanceBetweenPoints(shapeToFollow.currentX, shape.currentX, shapeToFollow.currentY, shape.currentY);
 //  console.log("dist", dist)
  return  dist <= shape.width || dist <= shapeToFollow.width || dist < 0;
}

function isOnMouse(shape) {
  return util.distanceBetweenPoints(mouseX, shape.currentX, mouseY, shape.currentY) <= 0;
}

function isShapeOnTheWall(shape) {
  let onLeftWall = isOnLeftWall(shape);
  let onRightWall = isOnRightWall(shape);
  let onTopWall = isOnTopWall(shape)
  let onTheFloor = isOnTheFloor(shape)

  return onLeftWall || onRightWall || onTopWall || onTheFloor;
}

function isOnTheFloor(shape) {
  return shape.currentY >= height - (shape.width);
}

function isOnTopWall(shape) {
  return shape.currentY <= 0 + shape.width/2;
}

function isOnLeftWall(shape) {
  return shape.currentX <= 0 + shape.width/2;
}

function isOnRightWall(shape) {
  return shape.currentX >= width - (shape.width/2);
}

//util

