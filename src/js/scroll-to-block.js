import { refs } from '../js/refs';

// SCROLL TO BLOCK
refs.scrollLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    let distance = document.querySelector('.' + this.dataset.scrollto).offsetTop - refs.header.getBoundingClientRect().height;
    window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
  });
});
