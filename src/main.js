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

var midX = canvas.width / 2;
var midY = canvas.height / 2;
var emitters = [new Emitter(new Vector(midX - 150, midY), Vector.fromAngle(0, 2))];

function addNewParticles() {
  for (var i = 0; i < emitters.length; i++) {
      particles.push(emitters[i].emitParticle());
  }
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
