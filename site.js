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

// Contact form. It posts to the outside form service named in the form's action.
// With no action set, the form is disabled and a notice points visitors to email.

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var endpoint = form.getAttribute('action');
  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');

  if (!endpoint) {
    document.getElementById('form-notice').hidden = false;
    Array.prototype.forEach.call(form.elements, function (el) { el.disabled = true; });
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (form.elements.botcheck.checked) return; // spam trap ticked

    button.disabled = true;
    status.textContent = 'Sending…';

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error(response.status);
      form.reset();
      status.textContent = 'Thank you. Your message has been sent, and Lachhman will reply as soon as he can.';
    }).catch(function () {
      status.textContent = 'Sorry, your message could not be sent. Please email lsbanwait@amarfs.co.uk instead.';
    }).then(function () {
      button.disabled = false;
    });
  });
})();

// Contact page map: load the Google Maps embed only when the visitor asks for it.

(function () {
  var map = document.getElementById('map');
  var button = document.getElementById('map-load');
  if (!map || !button) return;

  button.addEventListener('click', function () {
    var frame = document.createElement('iframe');
    frame.src = map.getAttribute('data-src');
    frame.title = 'Map showing 16 Gledwood Avenue, Hayes';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    map.querySelector('.map-note').remove();
    button.replaceWith(frame);
  });
})();
