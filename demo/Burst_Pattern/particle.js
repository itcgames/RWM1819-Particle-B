"use strict";

function Particle(point, velocity, acceleration) {
  this.position = point || new VectorTwo(0, 0);
  this.velocity = velocity || new VectorTwo(0, 0);
  this.acceleration = acceleration || new VectorTwo(0, 0);
}

Particle.prototype.move = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

function killSwitch(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [];

  for (var i = 0; i < gameNs.particles.length; i++) {
    var particle = gameNs.particles[i];
    var pos = particle.position;
    gameNs.life++;

    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;

    if (gameNs.life < gameNs.maxLife)
    {
      particle.move();
      currentParticles.push(particle);
    }
    else{
      gameNs.life = 0;
    }
  }
  gameNs.particles = currentParticles;
}

function update() {
  gameNs.ctx.clearRect(0, 0, gameNs.canvas.width, gameNs.canvas.height);
  if (gameNs.loop === true ){
    addNewParticles();
  }
  
  killSwitch(gameNs.canvas.width, gameNs.canvas.height);
  //gravity();
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  drawParticles();
// drawFadedParticles();
  //drawAnimationParticles();
  gameNs.emitters.forEach(drawCircle);

}
function addNewParticles() {
  for (var i = 0; i < gameNs.emitters.length; i++) {
    if(gameNs.particles.length < gameNs.maxParticles){
      gameNs.particles.push(gameNs.emitters[i].emitParticle());
      gameNs.maxLife = Math.floor(Math.random() * 100) + 50;
    }
  }
}
function addBurstParticles() {
  for (var i = 0; i < gameNs.emitters.length; i++) {
    for(var j = 0; j < gameNs.maxParticles; j++){
      gameNs.particles.push(gameNs.emitters[i].emitParticle());
      gameNs.maxLife = Math.floor(Math.random() * 100) + 50;
      //change velocity
      gameNs.emitters[i].spread = 90;
    }
  }
}
function drawParticles() {
  gameNs.ctx.fillStyle = 'rgb(255,0,0)';
  for (var i = 0; i < gameNs.particles.length; i++) {
    var position = gameNs.particles[i].position;
    gameNs.ctx.fillRect(position.x, position.y, gameNs.particleSize, gameNs.particleSize);
  }
}
function gravity() {
  var gravity = 0.0098;
  for (var i = 0; i < gameNs.particles.length; i++) {
    var velocity = gameNs.particles[i].velocity;
    velocity.y +=gravity;
  }
}
function drawFadedParticles() {
  var timer = 255;
  for (var i = 0; i < gameNs.particles.length; i++) {
    var position = gameNs.particles[i].position;
    gameNs.ctx.beginPath();
    gameNs.ctx.fillStyle = 'rgb(255,0,0)';

    timer = timer - 10;
    if(timer<=0){
      timer==0;
    }

    gameNs.ctx.globalAlpha = timer;
    gameNs.ctx.fillRect(position.x, position.y, gameNs.particleSize, gameNs.particleSize);
    gameNs.ctx.closePath();
  }
}

function drawAnimationParticles() {
var timer = 100;
  gameNs.ctx.fillStyle = 'rgb(0,0,0)';
  for (var i = 0; i < gameNs.particles.length; i++) {
    var position = gameNs.particles[i].position;
    //didnt do just yet
    var random = Math.floor((Math.random() * 3) + 1);

    gameNs.ctx.beginPath();
    gameNs.ctx.fillStyle = 'rgb(255,255,255)';

    gameNs.particleSize = random;
    gameNs.ctx.fillRect(position.x, position.y, gameNs.particleSize, gameNs.particleSize);
    gameNs.ctx.closePath();
  }
}

function drawCircle(object) {
  gameNs.ctx.fillStyle = object.drawColor;
  gameNs.ctx.beginPath();
  gameNs.ctx.arc(object.position.x, object.position.y, gameNs.objectSize, 0, Math.PI * 2);
  gameNs.ctx.closePath();
  gameNs.ctx.fill();
}
