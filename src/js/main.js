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


