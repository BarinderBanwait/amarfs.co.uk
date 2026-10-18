// Mobile menu toggle and contact form. The pages work without this script, except the form.

(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
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
