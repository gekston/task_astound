$(document).ready(function(){

  var widthDesktop = 835,
      widthTable = 720,
      widthMobile = 405,
      interval = null,
      widthViewport = $(window).width();

  $('.recomended__list-item:nth-child(3), .recomended__list-item:last-child').addClass('third');

  $(window).on('DOMContentLoaded resize', throttle(function (event) {
    widthViewport = $(window).width();
    if(widthViewport < widthDesktop) {
      $('.recomended__list-item, .container').addClass('tablet');
    } else {
      $('.recomended__list-item, .container').removeClass('tablet');
      $('.product__share-link').removeAttr('style');
    }
    if (widthViewport < widthTable) {
      $('.recomended__list-item, .container').addClass('mobile');
      $('#slider-js').slick({
        mobileFirst: true,
        infinite: true,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        adaptiveHeight: true,
        dots: false,
        prevArrow: '<button type="button" class="recomended__list-btn recomended__list-btn__prev"></button>',
        nextArrow: '<button type="button" class="recomended__list-btn recomended__list-btn__next"></button>'
      });
      
    } else {
      $('.recomended__list-item, .container').removeClass('mobile');
      $('#slider-js').slick('unslick');
    }
  }, 10));

  $('.product__size-label').on('click', function(event){
    $(this).addClass('product__size-label-checked');
  });
  $('.product__share-title, .product__share-close').on('click', function(event){
    $('.product__share-link').toggleClass('product__share-link-show');
  });

});

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
