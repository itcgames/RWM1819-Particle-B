"use strict";

function Emitter(point, velocity, spread) {
  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 30;
  this.drawColor = "red"; // So we can tell them apart from Fields later
}

Emitter.prototype.emitParticle = function() {
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
  var magnitude = this.velocity.getMagnitude();
  var position = new Vector(this.position.x, this.position.y);

  var velocity = Vector.fromAngle(angle, magnitude);
  velocity.x = velocity.x/4;
  velocity.y = velocity.y/4;
  return new Particle(position,velocity);
};
