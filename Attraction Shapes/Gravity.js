function Gravity(force = 0.9) {
  let self = this;
  self.force = force;
  let util = new Util();

  self.apply = function (shape) {

    atractToFloor(shape);
    //shape.moveDown(self.force);
  }

  function atractToFloor(shape) {
    if(self.force > 0){
    let distance = util.distanceBetweenPoints(shape.currentX, shape.currentX, height, shape.currentY);
    let intensity = (Math.pow(distance, 2) / (100 * self.force))// / self.force;
    let yMov = (height - shape.currentY) / intensity;

    shape.SetYPosition(shape.currentY + yMov);
    }
  }


}
