/*! p1Particle v0.0.0 - MIT license */
'use strict';

var p1Particle = function () {
  // your code goes here
  return true;
}

var particleCount = function () {
  var particles = [];
  var maxParticles = 20;
  for (var i = 0; i < maxParticles; i++) {
      particles.push("1");
  }
  return particles.length;

}

var gravityTest = function(){
  var gravity = 0.0098;
  var velocity = 20;
  var oldVelocity = velocity;
  var velocity +=gravity;

 if (velocity> oldVelocity){
   return true;
 }
 return false;
}

var loopTest = function(){
  var loop = true;
  if (loop === true ){
    return true;
  }
  return false;
}

var fadeTest = function(){
  var timer = 10;
  //ctx.fillStyle = 'rgb(255,0,0)';

    timer = timer - 10;
    if(timer<=0){
      timer==0;
    }
    //set alpha value to timer
    //gameNs.ctx.globalAlpha = timer;
    if(timer =< 0){
      return true;
    }
    return false;
}

var animationTest = function(){
    var random = Math.floor((Math.random() * 3) + 1);
    var particleSize = random;
    if (particleSize >3 || particleSize < 0){
      return false;
    }
    return true;

    //gameNs.ctx.fillRect(position.x, position.y, gameNs.particleSize, gameNs.particleSize);

}
