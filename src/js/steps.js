import { refs } from './refs';
import { kb } from '../json/kb';
import { ab } from '../json/ab';

let BASE = kb;
let LECTION_ID = 1;
let TASKS = [];
let TASK_KEY = '';

window.addEventListener('click', step);

function step(e) {
  if (e.target.dataset.step) {
    //ШАГ 1 (Выбираем базу AB или KB)
    if (e.target.dataset.base) {
      const base = e.target.dataset.base;
      if (base === 'ab') {
        BASE = ab;
      } else {
        BASE = kb;
      }
      renderLections(BASE);
    }

    //ШАГ 2 (Выбираем номер раздела)
    if (e.target.dataset.lection) {
      LECTION_ID = e.target.dataset.lection - 1;
      renderAufgaben(LECTION_ID);
    }

    //ШАГ 3 (Выбираем номер задания)
    if (e.target.dataset.task) {
      TASK_KEY = e.target.dataset.task;
      renderAntworten(TASK_KEY);
    }

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
      }
    }
  }
}

function renderLections(queriesArray) {
  let lectionsButtons = '';
  queriesArray.forEach(item => {
    const { id, name } = item;
    lectionsButtons += `<button type="button" class="button button--white" data-step="3" data-lection="${id}"><span>${id}</span>${name}</button>`;
  });

  document.querySelector('.js--lectionsList').innerHTML = lectionsButtons;
}

function renderAufgaben(id) {
  let aufgabenButtons = '';
  const { name, tasks } = BASE[id];
  TASKS = Object.keys(tasks);
  TASKS.forEach(task => {
    aufgabenButtons += `<button type="button" class="button button--white icon" data-home data-step="4" data-task='${task}'><span>${task}</span></button>`;
  });

  refs.lectionTitle.innerHTML = name;
  document.querySelector('.js--aufgabeList').innerHTML = aufgabenButtons;
}

function renderAntworten(key) {
  let antwortenMarkup = '';
  refs.aufgabeKey.innerHTML = key;
  const antworten = BASE[LECTION_ID].tasks[TASK_KEY];
  antworten.forEach(antwort => {
    const { number, answer } = antwort;
    antwortenMarkup += `<div class="antwort"><span>${number}</span><p>${answer}</p></div>`;
  });

  document.querySelector('.js--antwortenList').innerHTML = antwortenMarkup;
}
