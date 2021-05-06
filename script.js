'use strict';

///////////////////////////////////////
//ELEMENTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const message = document.createElement('div');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navbar = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/////////////////////// COOKIES MESSAGE //////////////////
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

/////////////////////// SMOOTH SCROLLING /////////////////
btnScrollTo.addEventListener('click', evt => {
  //////// OLD WAY, NEW WAY IS OKAY ONLY IN NEW BROWSERS ////
  //console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////// SMOOTH SCROLLING (Navigation) /////////////////
///// Completed without help of videos or instructor
// Code can be different then in Jonas' course

navbar.addEventListener('click', e => {
  if (!e.target.classList.contains('nav__link')) return;
  e.preventDefault();

  document
    .querySelector(e.target.getAttribute('href'))
    .scrollIntoView({ behavior: 'smooth' });
});
