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