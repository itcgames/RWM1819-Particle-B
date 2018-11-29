"use strict";

function Particle(point, velocity, acceleration) {
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
}

Particle.prototype.move = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

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
  if (loop === true ){
    addNewParticles();
  }

  killSwitch(canvas.width, canvas.height);
  //gravity();
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  drawParticles();
  //drawFadedParticles();
  //drawAnimationParticles();
  emitters.forEach(drawCircle);

}
function addNewParticles() {
  for (var i = 0; i < emitters.length; i++) {
    if(particles.length < maxParticles){
      particles.push(emitters[i].emitParticle());
      maxLife = Math.floor(Math.random() * 100) + 50;

    }

  }
}
function addBurstParticles() {
  for (var i = 0; i < emitters.length; i++) {
    for(var j = 0; j < maxParticles; j++){
      particles.push(emitters[i].emitParticle());
      maxLife = Math.floor(Math.random() * 100) + 50;
      //change velocity
      emitters[i].spread = 90;

    }
  }
}
function drawParticles() {
  ctx.fillStyle = 'rgb(255,255,255)';
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
  }
}
function gravity() {
  var gravity = 0.0098;
  for (var i = 0; i < particles.length; i++) {
    var velocity = particles[i].velocity;
    velocity.y +=gravity;
  }
}
function drawFadedParticles() {
  var timer = 255;
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255,255,255)';

    timer = timer - 10;
    if(timer<=0){
      timer==0;
    }

    ctx.globalAlpha = timer;
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
    ctx.closePath();
  }
}

function drawAnimationParticles() {
var timer = 100;
  ctx.fillStyle = 'rgb(255,255,255)';
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    //didnt do just yet
    var random = Math.floor((Math.random() * 3) + 1);

    ctx.beginPath();
    ctx.fillStyle = 'rgb(255,255,255)';



    particleSize = random;
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
    ctx.closePath();
  }
}

function drawCircle(object) {
  ctx.fillStyle = object.drawColor;
  ctx.beginPath();
  ctx.arc(object.position.x, object.position.y, objectSize, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}
