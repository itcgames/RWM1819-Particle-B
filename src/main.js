var gameNs = {};

gameNs.maxParticles = 200;
gameNs.particleSize = 1;
gameNs.objectSize = 10;
gameNs.life = 0;
gameNs.maxLife = 200;
gameNs.loop = false;
gameNs.alpha = 255;

gameNs.particles = [];
gameNs.canvas = document.querySelector('canvas');
gameNs.ctx = gameNs.canvas.getContext('2d');
gameNs.canvas.width = window.innerWidth;
gameNs.canvas.height = window.innerHeight;
gameNs.emitters = [new Emitter(new VectorTwo(30, 30 ), VectorTwo.fromAngle(0, 2))];

update();

addBurstParticles();



draw();
