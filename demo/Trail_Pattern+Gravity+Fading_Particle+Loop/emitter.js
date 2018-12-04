"use strict";

function Emitter(point, velocity, spread) {
  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 30;
  this.drawColor = "red"; // So we can tell them apart from Fields later
}

Emitter.prototype.emitParticle = function() {
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 10);
  var magnitude = this.velocity.getMagnitude();
  var position = new VectorTwo(this.position.x, this.position.y);

  var velocity = VectorTwo.fromAngle(angle, magnitude);
  var random = Math.floor((Math.random() * 4) + 1);
  velocity.x = velocity.x/random;
  velocity.y = velocity.y/random;
  return new Particle(position,velocity);
};
