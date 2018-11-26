"use strict";

var maxParticles = 200,
  particleSize = 1,
  objectSize = 3,
  life = 0,
  maxLife = 200,
  loop = false,
  alpha = 255;

var particles = [];


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var midX = canvas.width / 2;
var midY = canvas.height / 2;
var emitters = [new Emitter(new Vector(midX - 150, midY), Vector.fromAngle(0, 2))];


//addNewParticles();
update();

addBurstParticles();



draw();
