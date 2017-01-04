function Util(){
    let self = this;

  self.distanceBetweenPoints =  function(Xa, Xb, Ya, Yb) {

  let xDifference = Xa - Xb;
  let yDifference = Ya - Yb;
  let square = Math.pow(xDifference, 2) + Math.pow(yDifference, 2);
  let distance = Math.sqrt(square)

  return distance;
}
}