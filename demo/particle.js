"use strict";

var maxParticles = 20,
  particleSize = 1,
  objectSize = 3,
  life = 0,
  maxLife = 200,
  alpha = 255;

var particles = [];


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(point, velocity, acceleration) {
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
}


Particle.prototype.move = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

Vector.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.getAngle = function () {
  return Math.atan2(this.y,this.x);
};

Vector.fromAngle = function (angle, magnitude) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};


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

var midX = canvas.width / 2;
var midY = canvas.height / 2;
var emitters = [new Emitter(new Vector(midX - 150, midY), Vector.fromAngle(0, 2))];

function addNewParticles() {
  //if (particles.length > maxParticles) return;

  for (var i = 0; i < emitters.length; i++) {
      particles.push(emitters[i].emitParticle());
  }
}

function killSwitch(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [];

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var pos = particle.position;
    life++;

    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;

    if (life < maxLife)
    {
      particle.move();
      currentParticles.push(particle);
    }
    else{
      life = 0;
    }
  }
  particles = currentParticles;
}


function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  addNewParticles();
  killSwitch(canvas.width, canvas.height);
  draw();
  window.requestAnimationFrame(update);
}

update();

function draw() {
  drawParticles();
  emitters.forEach(drawCircle);
}

function drawParticles() {
  ctx.fillStyle = 'rgb(255,255,255)';
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
  }
}

function drawCircle(object) {
  ctx.fillStyle = object.drawColor;
  ctx.beginPath();
  ctx.arc(object.position.x, object.position.y, objectSize, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function loop() {
  clear();
  update();
  draw();
  queue();
}


function queue() {
  window.requestAnimationFrame(loop);
}
