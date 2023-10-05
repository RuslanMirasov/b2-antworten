import { refs } from '../js/refs';
import { kb } from '../json/kb';
import { ab } from '../json/ab';

const kbLections = Object.keys(kb);
const abLections = Object.keys(ab);

window.addEventListener('click', step);

function step(e) {
  if (e.target.dataset.step) {
    const number = e.target.dataset.step;
    const currentStep = document.querySelector(`.step${number}`);
    if (!currentStep.classList.contains('active')) {
      refs.steps.forEach(step => {
        if (step.classList.contains('active')) {
          step.classList.remove('active');
          setTimeout(() => {
            step.style.display = 'none';
          }, 300);
        }
        setTimeout(() => {
          currentStep.style.display = 'flex';
        }, 301);
        setTimeout(() => {
          currentStep.classList.add('active');
        }, 302);
      });
      if (number > 1) {
        refs.goBack.setAttribute('data-step', Number(number) - 1);
        console.log(refs.goBack.dataset.step);
      }
    }
  }
}

function renderLections(queriesArray) {
  let markup = '';
  queriesArray.forEach(item => {
    console.log(item);
    markup += `<button type="button" class="button button--white" data-step="3">${item}</button>`;
  });

  document.querySelector('.js--lectionsList').innerHTML = markup;
}

renderLections(kbLections);
