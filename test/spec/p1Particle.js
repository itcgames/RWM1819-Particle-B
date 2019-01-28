/* global p1Particle, describe, it, expect, should */

describe('main()', function () {
  'use strict';

  it('exists', function () {
    if (typeof addBurstParticles == 'function') {
    addBurstParticles();
    expect(true);
  }
  else{
      expect(false);
  }
  });

  it('count partilces in array', function () {
    if (typeof addNewParticles == 'function') {
    addNewParticles();
    expect(true);
  }
  else{
      expect(false);
  }
 });

   it('gravity test', function () {
     if (typeof gravity == 'function') {
     gravity();
     expect(true);
   }
   else{
       expect(false);
   }
  });

  it('loop test', function () {
    if (typeof gameNs.loop == 'boolean') {
    expect(true);
  }
  else{
      expect(false);
  }
  });

  it('fade test', function () {
    if (typeof drawFadedParticles == 'function') {
    drawFadedParticles();
    expect(true);
  }
  else{
      expect(false);
  }
  });
  it('burst test', function () {
    if (typeof addBurstParticles == 'function') {
      addBurstParticles();
      expect(true);
  }
  else{
      expect(false);
  }
  });
  it('animation test', function () {
  if (typeof drawAnimationParticles == 'function') {
  drawAnimationParticles();
  expect(true);
}
else{
  expect(false);
}
});

});
