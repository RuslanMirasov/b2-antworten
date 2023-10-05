window.addEventListener('load', function () {
  removePreloader();
});

function removePreloader() {
  document.querySelector('.preloader').classList.add('is-hidden');
}
