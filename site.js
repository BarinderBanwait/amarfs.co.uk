// Mobile menu toggle and home-page carousel. The pages work without this script.

(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var carousel = document.querySelector('.carousel');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('.slide');
  var dots = carousel.querySelectorAll('.carousel-controls button');
  var current = 0;
  var timer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i) {
    slides[current].classList.remove('active');
    dots[current].removeAttribute('aria-current');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].setAttribute('aria-current', 'true');
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(function () { show(current + 1); }, 7000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { stop(); show(i); });
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  start();
})();
