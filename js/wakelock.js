var NoSleep = require('nosleep.js');

var noSleep = new NoSleep();
var wakeLockEnabled = false;

var switchedOff = document.querySelector("#light-switched-off");
var switchedOn = document.querySelector("#light-switched-on");

var makeVisible = (element) => {
  element.classList.remove('not-visible');
  element.classList.add('visible');
};

var makeInvisible = (element) => {
  element.classList.remove('visible');
  element.classList.add('not-visible');
};

document.querySelector("#light-switch").addEventListener('click', () => {
  if (!wakeLockEnabled) {
    noSleep.enable();
    wakeLockEnabled = true;

    makeVisible(switchedOn);
    makeInvisible(switchedOff);
  } else {
    noSleep.disable();
    wakeLockEnabled = false;

    makeVisible(switchedOff);
    makeInvisible(switchedOn);
  }
}, false);
