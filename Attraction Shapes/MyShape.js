function MyShape(X = 0, Y = 0, Z = 0) {
    let self = this;
    self.currentX = X;
    self.currentY = Y;
    self.currentZ = Z;
    self.width = 20;
    self.height = 20;

    self.charge = floor(random(10));

    self.SetXPosition = function (XPosition) {
        self.currentX = XPosition;
    }

    self.SetYPosition = function (YPosition) {
        self.currentY = YPosition;
    }

    self.SetZPosition = function (ZPosition) {
        self.currentZ = ZPosition;
    }

    self.increaseX = function (valueToIncrease) {
        self.SetXPosition(self.currentX + valueToIncrease);
    }

    self.increaseY = function (valueToIncrease) {
        self.SetYPosition(self.currentY + valueToIncrease);
    }

    self.moveRight = function (speed) {
        self.increaseX(speed);
    }

    self.moveLeft = function (speed) {
        self.increaseX(-speed);
    }

    self.moveUp = function (speed) {
        self.increaseY(-speed);
    }

    self.moveDown = function (speed) {
        self.increaseY(speed);
    }

    self.show = function () {
        self.draw(self.currentX, self.currentY);
    }

    self.draw = function (XPosition, YPosition) {
        // let sx = map(XPosition,0,1,0,width);
        //  let sy = map(YPosition,0,1,0,height);
        //console.log(sx,sy, XPosition,YPosition)

        if (self.charge % 2 === 0) {
            stroke(255, 204, 0);
        }
        else {
            stroke('red');
        }


        noFill();
        //point(XPosition,YPosition);
        ellipse(XPosition, YPosition, self.width, self.height);
    }

}
