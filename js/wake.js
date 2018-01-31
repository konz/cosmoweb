// https://gist.github.com/maccman/5944646

(function($){

    var TIMEOUT = 20000;
    var lastTime = (new Date()).getTime();

    setInterval(function() {
      var currentTime = (new Date()).getTime();
      if (currentTime > (lastTime + TIMEOUT + 2000)) {
        $(document).wake();
      }
      lastTime = currentTime;
    }, TIMEOUT);

    $.fn.wake = function(callback) {
      if (typeof callback === 'function') {
        return $(this).on('wake', callback);
      } else {
        return $(this).trigger('wake');
      }
    };

})(jQuery);
