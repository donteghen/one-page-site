'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//***************************************************************************************************** */
// Modal window

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
//**************************************************************************************************************** */
// smooth scroll on learn more.
const section1 = document.querySelector('#section--1');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
buttonScrollTo.addEventListener('click', () => {
  // const s1oor = section1.getBoundingClientRect();
  // let myTop =  Number.parseInt(window.getComputedStyle(document.querySelector('header')).height)
  // console.log(e.target.getBoundingClientRect())
  // window.scrollTo({left: 0, top: myTop, behavior : 'smooth'})
  section1.scrollIntoView({behavior:'smooth'})
})
//*********************************************************************************************************** */
// Smooth scroll to sections (same event handled multiple times in different sibbling elememt is perfomance degrading for huge app code baese)
// document.querySelectorAll('.nav__link').forEach(ele => {
//   ele.addEventListener('click' , (e) =>{
//     e.preventDefault();
   
//    const id = e.target.getAttribute('href');
//    console.log(id)
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// })

// Smooth scroll to sections again  but ths time with event delegation 
document.querySelector('.nav__links').addEventListener('click', (e) =>{
  if(e.target.classList.contains('nav__link') ){
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }

});

//****************************************************************** */
// Implementing the tab components
const tabContainer = document.querySelector('.operations__tab-container');
const allButtons = document.querySelectorAll('.operations__tab');
const tabContentGroup = document.querySelectorAll('.operations__content');

 tabContainer.addEventListener('click', (e) => {
  const targetTab =  e.target.closest('.operations__tab'); // closest method use so we can handle click on span element as well
  if(!targetTab) return;
  allButtons.forEach(elm => elm.classList.remove('operations__tab--active'));
  tabContentGroup.forEach(ele => ele.classList.remove('operations__content--active'));
  targetTab.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${targetTab.dataset.tab}`).classList.add('operations__content--active');
 })

 //*************************************************************************************************** */
 // menu fade effect
 const navContainer = document.querySelector('.nav');
 const mouseOnNavCheck = function (eType, e){
  let opacityValue = 1;
  if(eType === 'mouseover'){opacityValue = 0.5}
  else if(eType === 'mouseout'){opacityValue = 1}
  if(e.target.classList.contains('nav__link')){
    
    const targetLink = e.target;
    const sibblings = targetLink.closest('.nav').querySelectorAll('.nav__link');
    const logSibbling = targetLink.closest('.nav').querySelector('.nav__logo');

   sibblings.forEach(sib => {
     if(sib !== targetLink){
       sib.style.opacity = opacityValue;
     }
   });
   logSibbling.style.opacity = opacityValue;
  }
  else if(e.target.classList.contains('nav__logo')){
   e.target.closest('.nav').querySelectorAll('.nav__link').forEach(elm => elm.style.opacity = opacityValue)
  }
  else {
    return
  }
 }
 navContainer.addEventListener('mouseover', (e) =>{
  
  mouseOnNavCheck('mouseover', e);
 })
 navContainer.addEventListener('mouseout', (e) =>{
  
  mouseOnNavCheck('mouseout', e)
})

/************************************************************************************************** */
// Skicky nav

// Very inefficient implementation
// const initialCoord = section1.getBoundingClientRect()
// window.addEventListener('scroll', (e)=>{
//   e.preventDefault()
//   console.log(window.scrollY, initialCoord.top)
// if(window.scrollY > initialCoord.top){
//   navContainer.classList.add('sticky')
// }
// else{
//   navContainer.classList.remove('sticky')
// }
// })
// Implementation using Intersection Observer Api
const header = document.querySelector('.header')
const headerPad = navContainer.getBoundingClientRect().height
const callback = function(entries){
  entries.forEach(entry =>{
    if(!entry.isIntersecting){
      navContainer.classList.add('sticky')
    }
    else{
      navContainer.classList.remove('sticky')
    }
  });
}
const intersectOptions = {
  root: null,
  threshold : 0,
  rootMargin :`${headerPad}px`
}
const observer = new IntersectionObserver(callback, intersectOptions);
observer.observe(header);

/************************************************************************ */
//Reveal Sections
const allASections = document.querySelectorAll('.section');
allASections.forEach(elm => elm.classList.add('section--hidden'))
const revealSections = function(entries, observer){
  entries.forEach(entry =>{
    if(entry.isIntersecting){
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target)
    }
        
  })
}

const observerOptions ={
  root: null,
  threshold : 0.02,
  
}
const revealObserver = new IntersectionObserver(revealSections, observerOptions);
allASections.forEach(ele => {
revealObserver.observe(ele)
})

/************************************************************ */
// Lazing Loading
const imgtargets = document.querySelectorAll('img[data-src]');

const imageLazyLoad = function (entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) {return};
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
  })
}
const imageObserverOptions ={
  root: null,
  threshold: 0.5
}
const imageObserver = new IntersectionObserver(imageLazyLoad, imageObserverOptions);
imgtargets.forEach(ele => imageObserver.observe(ele) );

/********************************************************** */
// Slider sections

const sliderImages = document.querySelectorAll('.slide')
const sliderLength = sliderImages.length;
let currentslide = 0;


document.querySelector('.slider__btn--left').addEventListener('click', () => {
  if (currentslide === 0) {
    currentslide = sliderLength-1;
  }
  else {
    currentslide--;
  }
  sliderImages.forEach((slide, index) => {
    slide.style.transform = `translate(${100 * (currentslide - index)}%)`
  })
    
});
document.querySelector('.slider__btn--right').addEventListener('click', () => {
  if (currentslide === sliderLength - 1) {
    currentslide = 0;
  }
  else {
    currentslide++;
  }
  sliderImages.forEach((slide, index) => {
    slide.style.transform = `translate(${100 * (currentslide - index)}%)`
  })
})