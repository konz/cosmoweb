var NoSleep = require('nosleep.js');

var noSleep = new NoSleep();
var wakeLockEnabled = false;

var switchedOff = document.querySelector("#light-switched-off");
var switchedOn = document.querySelector("#light-switched-on");

document.querySelector("#light-switch").addEventListener('click', function() {
  if (!wakeLockEnabled) {
    noSleep.enable();
    wakeLockEnabled = true;

    switchedOn.classList.remove('not-visible');
    switchedOn.classList.add('visible');

    switchedOff.classList.remove('visible');
    switchedOff.classList.add('not-visible');
  } else {
    noSleep.disable();
    wakeLockEnabled = false;

    switchedOff.classList.remove('not-visible');
    switchedOff.classList.add('visible');

    switchedOn.classList.remove('visible');
    switchedOn.classList.add('not-visible');
  }
}, false);
