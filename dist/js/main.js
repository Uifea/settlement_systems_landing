let burgerMenu = document.querySelector('.hamburger__menu');
let burgerBtnOpen = document.querySelector('.hamburger__open');
let burgerBtnClose = document.querySelector('.hamburger__close');
let btnPopup = document.querySelector('.help__open');
let popup = document.querySelector('.help__popup');

burgerBtnOpen.addEventListener('click', () => {
    burgerMenu.classList.add('animation-burger-menu');
    burgerBtnOpen.classList.toggle('animation-burger-open');
    burgerBtnClose.classList.toggle('animation-burger-close');
});

burgerBtnClose.addEventListener('click',() => {
    burgerMenu.classList.remove('animation-burger-menu');
    burgerBtnClose.classList.toggle('animation-burger-close');
    burgerBtnOpen.classList.toggle('animation-burger-open');
} );

btnPopup.addEventListener('click', () => {
    popup.classList.toggle('hide');
})


document.addEventListener('click', (e) => {
    if (e.target !== popup && e.target !== btnPopup) {
        popup.classList.add('hide');
    }
})



let openModal = document.querySelector('.user-menu__login');
let closeModal = document.querySelector('.modal__close');
let submitModal = document.querySelector('.modal__submit');
let modal = document.querySelector('.modal');


let toggleModal = function () {
    modal.classList.toggle('hide');
}

openModal.addEventListener('click', () => {
    toggleModal();
})

closeModal.addEventListener('click', () => {
    toggleModal();
})

submitModal.addEventListener('click', ()=> {
    toggleModal();
})

//Закрыть попа через ескейп
document.addEventListener("keydown", (e) => {
    if (e.code === 'Escape' && !modal.classList.contains('hide')) {
        toggleModal();
    }
})
//Закрыть попап через мышку
document.addEventListener('click', (e) => {
    if (e.target === modal) {
        toggleModal();
    }
})
let arrayDropdown = document.querySelectorAll('.dropdown');
let btnsDropdown = document.querySelectorAll('.dropdown__title');

let sortDropdown = function() {
    arrayDropdown.forEach((item) => {
        const textDropdown = item.querySelector('.card__body');
        textDropdown.classList.add('hide');  
    });
}

sortDropdown();

btnsDropdown.forEach((item, i) => {
    item.addEventListener('click', () => {
        let textActive = arrayDropdown[i].querySelector('.card__body');
        slideToggle(textActive);
        if (textActive.style.display === 'none') {
            item.classList.toggle('dropdown--active');
        }
        if (textActive.style.display === 'grid') {
            item.classList.toggle('dropdown--active');
        }
        
        
    })
})

let slideUp = (target, duration=500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }
  
  let slideDown = (target, duration=500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
  
    if (display === 'none')
      display = 'block';
  
    target.style.display = 'grid';
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }
   let slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  }

let cardArray = document.querySelectorAll('.card');
let title = document.querySelector('.payment-services__title');
let copyright = document.querySelector('.page-footer__copyright');


window.addEventListener('resize', move);
window.addEventListener('DOMContentLoaded', move);

function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width >= 750) {
        cardArray.forEach((item) => {
            let bodyCard = item.querySelector('.card__body');
            let dropdownTitle = item.querySelector('.dropdown__title');
            dropdownTitle.classList.add('hide');
            bodyCard.classList.remove('hide');
            item.classList.remove('dropdown');
            
        });
        title.textContent = 'Здесь можно оплатить';
        copyright.innerHTML = `© 2012 – 2020<br> ООО «Название компании»`
	} else {
        cardArray.forEach((item) => {
            let bodyCard = item.querySelector('.card__body');
            let dropdownTitle = item.querySelector('.dropdown__title');
            dropdownTitle.classList.remove('hide');
            bodyCard.classList.add('hide');
            item.classList.add('dropdown');
        });
        title.textContent = 'Узнайте, как оплатить';
        copyright.innerHTML = `© 2012 – 2020 ООО «Название компании»`
	}
}