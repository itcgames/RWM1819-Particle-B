"use strict";

function VectorTwo(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

VectorTwo.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

VectorTwo.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

VectorTwo.prototype.getAngle = function () {
  return Math.atan2(this.y,this.x);
};

VectorTwo.fromAngle = function (angle, magnitude) {
  return new VectorTwo(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};
