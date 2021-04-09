// fix passive event
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: false });
  },
};

var slider = {
  slideIds: ["slide-1", "slide-2", "slide-3", "slide-4", "slide-5"],
  index: 0,
  canScroll: true,
  lastTimestamp: 0, // timestamp of the last triggered event,
  lastWheelDelta: 0,
};

function slideTo(slideIndex) {
  slider.canScroll = false;
  jQuery([document.documentElement, document.body]).animate(
    {
      scrollTop: jQuery("#" + slider.slideIds[slider.index]).offset().top,
    },
    600,
    "swing",
    function () {
      slider.canScroll = true;
    }
  );
  jQuery("a[href^='#']").removeClass("active");
  jQuery('a[href="#' + slider.slideIds[slider.index] + '"]').addClass("active");
}

jQuery(window).on("wheel", function (event) {
  event.preventDefault();
  var domEvent = event.originalEvent;
  var delta = domEvent.deltaY;
  var wheelDelta = domEvent.wheelDeltaY;
  var timeDelta = Date.now() - slider.lastTimestamp;
  slider.lastTimestamp = Date.now();
  var wheelDeltaDelta = Math.abs(
    Math.abs(wheelDelta) - Math.abs(slider.lastWheelDelta)
  );
  // console.log(wheelDelta, timeDelta, wheelDeltaDelta)
  if (wheelDeltaDelta > 10) {
    slider.lastTimestamp = 0;
  }
  slider.lastWheelDelta = wheelDelta;

  if (slider.canScroll && timeDelta > 100) {
    if (delta > 1) {
      // scroll verso basso
      slider.index += 1;
      if (slider.index >= slider.slideIds.length - 1)
        slider.index = slider.slideIds.length - 1;
    } else if (delta < -1) {
      // scroll verso l'alto
      slider.index -= 1;
      if (slider.index <= 0) slider.index = 0;
    }

    slideTo(slider.index);
  }
});

jQuery.each(slider.slideIds, function (index, value) {
  jQuery("#" + value).attr("data-index", index);
});

jQuery("a[href^='#']").click(function (e) {
  e.preventDefault();
  var index = parseInt($($(this).attr("href")).attr("data-index"));
  slider.index = index;
  slideTo(slider.index);
});
