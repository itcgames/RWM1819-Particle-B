/*! p1Particle v0.0.0 - MIT license */
'use strict';

var p1Particle = function () {
  // your code goes here
  var particles = [];
  var maxParticles = 20;


  for (var i = 0; i < maxParticles; i++) {
      particles.push("1");
      console.log(particles.length);
  }
  return particles.length;

}
