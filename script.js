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
const tabContainer = document.querySelector('.operations__tab-container');
const navHeight = navbar.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

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

//////////// TAB COMPONENT /////////////////
///// Almost 100% completed without help of videos or instructor
// clicked var borrowed from course
// Code can be different then in Jonas' course

const handleTogglingTab = e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  const activeBtn = document.querySelector('.operations__tab--active');

  if (activeBtn === clicked) return;

  //toggle buttons
  activeBtn.classList.remove('operations__tab--active');
  clicked.classList.add('operations__tab--active');

  //toggle content
  document
    .querySelector('.operations__content--active')
    .classList.remove('operations__content--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
};

tabContainer.addEventListener('click', handleTogglingTab);

//////////// MENU FADE ANIMATION /////////////////
//mouseon doesn't bubble!!!
const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if (el !== link) el.style.opacity = this;
  });
  logo.style.opacity = this;
};

navbar.addEventListener('mouseover', handleHover.bind(0.5));

navbar.addEventListener('mouseout', handleHover.bind(1));

//////////////// STICKY NAVBAR /////////////////

const stickyNav = ([entry]) => {
  !entry.isIntersecting
    ? navbar.classList.add('sticky')
    : navbar.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

//////////////// REVEAL SECTIONS /////////////////
const revealSection = ([entry], observer) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////// LAZY LOADING IMAGES /////////////////
const loadImg = ([entry], observer) => {
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////// SLIDER /////////////////
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  let maxSlide = slides.length - 1;

  const createDots = () => {
    slides.forEach((_, idx) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${idx}></button>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = slide => {
    slides.forEach(
      (s, idx) => (s.style.transform = `translateX(${(idx - slide) * 100}%)`)
    );
  };

  const nextSlide = () => {
    currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = () => {
    currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = () => {
    createDots();
    goToSlide(0);
    activateDot(currentSlide);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
