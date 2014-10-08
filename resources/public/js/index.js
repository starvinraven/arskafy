(function() {
  var getUrl, init, isValidUrl, errorHtml;

  errorHtml = function() {
      return '<p class="error">Oops, couldn\'t load this image!</p>';
  }

  tweetButtonHtml = function(url) {
      return('<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+url+'" data-text="I just took a selfie with Arnold. Take yours: http://arskafy.fi" data-related="ReaktorNow" data-hashtags="reaktorarska">Tweet</a>');
  }

//  fbButtonHtml = function(url) {
//      return('<fb:share-button href="'+url+'">Share on Facebook</fb:share-button>');
//      // return('<div class="fb-share-button" data-href="'+url+'">Share on Facebook</div>');
//  }

  init = function() {
    var inputValid;
    inputValid = $('#url-input').asEventStream('input').map(getUrl).map(isValidUrl).onValue(function(isValid) {
      return $('#submit-button').prop('disabled', !isValid);
    });
    $('#url-input').trigger('input');
    $('#submit-button').asEventStream('click').map(getUrl).onValue(function(url) {
      var src = "/doit?url=" + url;
      var img = $('<img>', {src: src}).error(function() {
          $(this).closest('li').html(errorHtml());
      });
      var url = 'http://arskafy.fi' + src;
      var tweetButton = $(tweetButtonHtml(url));
      // var fbButton = $(fbButtonHtml(url));
      var imageLink = $('<a>', {href: src}).text("Link");
      li = $('<li>').append(img, imageLink, tweetButton);
      $('#url-input').val('');
      $('#images').prepend(li);
      // FB.XFBML.parse();
      twttr.widgets.load();
    });
  };

  getUrl = function() {
    return $('#url-input').val();
  };

  isValidUrl = function(url) {
    return url.match(/(https?:\/\/[^\s]+)/) != null;
  };

  init();

}).call(this);
