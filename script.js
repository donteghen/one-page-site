'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden'); 
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

 Array.from(btnsOpenModal).forEach(btn => btn.addEventListener('click', openModal))
 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const section1 = document.querySelector('#section--1');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
buttonScrollTo.addEventListener('click', () => {
  // const s1oor = section1.getBoundingClientRect();
  // let myTop =  Number.parseInt(window.getComputedStyle(document.querySelector('header')).height)
  // console.log(e.target.getBoundingClientRect())
  // window.scrollTo({left: 0, top: myTop, behavior : 'smooth'})
  section1.scrollIntoView({behavior:'smooth'})
})
